-- Setup Image Storage for all Skinlux Studios
-- This migration creates storage buckets and policies for centralized image management

-- Create storage bucket for studio images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
  'studio-images', 
  'studio-images', 
  true, 
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Create images table to track metadata
CREATE TABLE IF NOT EXISTS public.studio_images (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    studio_id UUID REFERENCES studios(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'team', 'gallery', 'treatments', 'logos', 'about'
    subcategory TEXT, -- optional: 'hero', 'interior', etc.
    storage_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    file_size INTEGER,
    mime_type TEXT,
    width INTEGER,
    height INTEGER,
    alt_text TEXT,
    caption TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add RLS policies for studio_images
ALTER TABLE public.studio_images ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated admins to manage images
CREATE POLICY "Admins can manage studio images" ON public.studio_images
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policy for public to view active images
CREATE POLICY "Public can view active images" ON public.studio_images
    FOR SELECT TO anon, authenticated
    USING (is_active = true);

-- Storage policies
CREATE POLICY "Authenticated users can upload images" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'studio-images');

CREATE POLICY "Authenticated users can update images" ON storage.objects
    FOR UPDATE TO authenticated
    USING (bucket_id = 'studio-images');

CREATE POLICY "Authenticated users can delete images" ON storage.objects
    FOR DELETE TO authenticated
    USING (bucket_id = 'studio-images');

CREATE POLICY "Public can view images" ON storage.objects
    FOR SELECT TO anon, authenticated
    USING (bucket_id = 'studio-images');

-- Create indexes for performance
CREATE INDEX idx_studio_images_studio_id ON public.studio_images(studio_id);
CREATE INDEX idx_studio_images_category ON public.studio_images(category);
CREATE INDEX idx_studio_images_active ON public.studio_images(is_active);
CREATE INDEX idx_studio_images_sort ON public.studio_images(studio_id, category, sort_order);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_studio_images_updated_at
    BEFORE UPDATE ON public.studio_images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 