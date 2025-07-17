import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - List images by studio and category
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const studioId = searchParams.get('studio_id');
        const category = searchParams.get('category');
        const subcategory = searchParams.get('subcategory');

        let query = supabase
            .from('studio_images')
            .select('*')
            .eq('is_active', true)
            .order('sort_order', { ascending: true })
            .order('created_at', { ascending: false });

        if (studioId) {
            query = query.eq('studio_id', studioId);
        }

        if (category) {
            query = query.eq('category', category);
        }

        if (subcategory) {
            query = query.eq('subcategory', subcategory);
        }

        const { data: images, error } = await query;

        if (error) {
            console.error('Error fetching images:', error);
            return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
        }

        return NextResponse.json({ images });
    } catch (error) {
        console.error('Error in GET /api/media:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST - Upload new image
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const studioId = formData.get('studio_id') as string;
        const category = formData.get('category') as string;
        const subcategory = formData.get('subcategory') as string | null;
        const altText = formData.get('alt_text') as string | null;
        const caption = formData.get('caption') as string | null;
        const sortOrder = parseInt(formData.get('sort_order') as string) || 0;

        if (!file || !studioId || !category) {
            return NextResponse.json(
                { error: 'File, studio_id, and category are required' },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
                { status: 400 }
            );
        }

        // Validate file size (50MB)
        if (file.size > 52428800) {
            return NextResponse.json(
                { error: 'File too large. Maximum size is 50MB.' },
                { status: 400 }
            );
        }

        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${studioId}/${category}${subcategory ? `/${subcategory}` : ''}/${fileName}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
            .from('studio-images')
            .upload(filePath, file, {
                upsert: false,
                contentType: file.type,
            });

        if (uploadError) {
            console.error('Storage upload error:', uploadError);
            return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('studio-images')
            .getPublicUrl(filePath);

        // Get image dimensions (basic implementation)
        let width = null;
        let height = null;
        try {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Simple JPEG/PNG dimension detection (simplified)
            if (file.type === 'image/jpeg' && buffer.length > 10) {
                // JPEG basic dimension extraction would go here
                // For now, we'll set defaults
                width = 1200; // Default dimensions
                height = 800;
            } else if (file.type === 'image/png' && buffer.length > 24) {
                // PNG basic dimension extraction would go here
                width = 1200;
                height = 800;
            }
        } catch (dimError) {
            console.warn('Could not extract image dimensions:', dimError);
        }

        // Save metadata to database
        const { data: imageData, error: dbError } = await supabase
            .from('studio_images')
            .insert({
                studio_id: studioId,
                filename: fileName,
                original_name: file.name,
                category,
                subcategory,
                storage_path: filePath,
                public_url: publicUrl,
                file_size: file.size,
                mime_type: file.type,
                width,
                height,
                alt_text: altText,
                caption,
                sort_order: sortOrder,
            })
            .select()
            .single();

        if (dbError) {
            console.error('Database error:', dbError);
            // Clean up uploaded file
            await supabase.storage.from('studio-images').remove([filePath]);
            return NextResponse.json({ error: 'Failed to save image metadata' }, { status: 500 });
        }

        return NextResponse.json({
            message: 'Image uploaded successfully',
            image: imageData
        });

    } catch (error) {
        console.error('Error in POST /api/media:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 