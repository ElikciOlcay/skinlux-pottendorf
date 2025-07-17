"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload,
    Image as ImageIcon,
    Trash2,
    Edit3,
    Eye,
    Search,
    Grid,
    List,
    Plus,
    X,
    Save,
    ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface StudioImage {
    id: string;
    studio_id: string;
    filename: string;
    original_name: string;
    category: string;
    subcategory?: string;
    storage_path: string;
    public_url: string;
    file_size: number;
    mime_type: string;
    width?: number;
    height?: number;
    alt_text?: string;
    caption?: string;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

interface Studio {
    id: string;
    name: string;
    subdomain: string;
}

const CATEGORIES = [
    { value: 'team', label: 'Team', subcategories: ['portraits', 'group'] },
    { value: 'gallery', label: 'Gallery', subcategories: ['treatments', 'studio', 'equipment'] },
    { value: 'treatments', label: 'Behandlungen', subcategories: ['laser', 'hydrafacial', 'skincare'] },
    { value: 'logos', label: 'Logos', subcategories: ['primary', 'variations'] },
    { value: 'about', label: 'Über uns', subcategories: ['interior', 'exterior', 'atmosphere'] },
    { value: 'hero', label: 'Hero Images', subcategories: ['main', 'background'] },
];

export default function MediaManagement() {
    const [images, setImages] = useState<StudioImage[]>([]);
    const [studios, setStudios] = useState<Studio[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Filters
    const [selectedStudio, setSelectedStudio] = useState<string>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Upload form
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [uploadForm, setUploadForm] = useState({
        studio_id: '',
        category: '',
        subcategory: '',
        alt_text: '',
        caption: '',
        sort_order: 0,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    // Edit modal
    const [editingImage, setEditingImage] = useState<StudioImage | null>(null);

    const loadStudios = async () => {
        try {
            const response = await fetch('/api/bank-details');
            if (response.ok) {
                // We'll get studios from bank details for now
                // In a real implementation, you'd have a dedicated studios endpoint
                setStudios([
                    { id: 'pinzgau', name: 'Skinlux Pinzgau', subdomain: 'pinzgau' },
                    { id: 'pottendorf', name: 'Skinlux Pottendorf', subdomain: 'pottendorf' },
                    { id: 'redesign', name: 'Skinlux Bischofshofen', subdomain: 'bischofshofen' },
                ]);
            }
        } catch (error) {
            console.error('Error loading studios:', error);
        }
    };

    const loadImages = useCallback(async () => {
        try {
            setLoading(true);
            let url = '/api/media?';

            if (selectedStudio !== 'all') {
                url += `studio_id=${selectedStudio}&`;
            }

            if (selectedCategory !== 'all') {
                url += `category=${selectedCategory}&`;
            }

            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setImages(data.images || []);
            }
        } catch (error) {
            console.error('Error loading images:', error);
        } finally {
            setLoading(false);
        }
    }, [selectedStudio, selectedCategory]);

    useEffect(() => {
        loadStudios();
    }, []);

    useEffect(() => {
        loadImages();
    }, [loadImages]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        setSelectedFiles(files);
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0 || !uploadForm.studio_id || !uploadForm.category) {
            alert('Bitte wählen Sie Dateien, Studio und Kategorie aus.');
            return;
        }

        setUploading(true);

        try {
            for (const file of selectedFiles) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('studio_id', uploadForm.studio_id);
                formData.append('category', uploadForm.category);
                if (uploadForm.subcategory) formData.append('subcategory', uploadForm.subcategory);
                if (uploadForm.alt_text) formData.append('alt_text', uploadForm.alt_text);
                if (uploadForm.caption) formData.append('caption', uploadForm.caption);
                formData.append('sort_order', uploadForm.sort_order.toString());

                const response = await fetch('/api/media', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Upload failed');
                }
            }

            // Reset form and reload images
            setSelectedFiles([]);
            setUploadForm({
                studio_id: '',
                category: '',
                subcategory: '',
                alt_text: '',
                caption: '',
                sort_order: 0,
            });
            setShowUploadForm(false);
            loadImages();

            alert('Bilder erfolgreich hochgeladen!');
        } catch (error) {
            console.error('Upload error:', error);
            alert(`Fehler beim Upload: ${error}`);
        } finally {
            setUploading(false);
        }
    };

    const filteredImages = images.filter(image => {
        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            return (
                image.original_name.toLowerCase().includes(search) ||
                image.alt_text?.toLowerCase().includes(search) ||
                image.caption?.toLowerCase().includes(search)
            );
        }
        return true;
    });

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Link href="/admin" className="text-gray-500 hover:text-gray-700">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <h1 className="text-xl font-semibold text-gray-900">Bildverwaltung</h1>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setShowUploadForm(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Bilder hochladen
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Studio Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Studio
                            </label>
                            <select
                                value={selectedStudio}
                                onChange={(e) => setSelectedStudio(e.target.value)}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="all">Alle Studios</option>
                                {studios.map(studio => (
                                    <option key={studio.id} value={studio.id}>
                                        {studio.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Kategorie
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="all">Alle Kategorien</option>
                                {CATEGORIES.map(category => (
                                    <option key={category.value} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Suche
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Dateiname, Alt-Text..."
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
                                />
                                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                            </div>
                        </div>

                        {/* View Mode */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ansicht
                            </label>
                            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`flex-1 p-2 text-sm font-medium ${viewMode === 'grid'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <Grid className="w-4 h-4 mx-auto" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`flex-1 p-2 text-sm font-medium ${viewMode === 'list'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <List className="w-4 h-4 mx-auto" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Images Grid/List */}
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className={
                        viewMode === 'grid'
                            ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'
                            : 'space-y-2'
                    }>
                        {filteredImages.map(image => (
                            <motion.div
                                key={image.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={
                                    viewMode === 'grid'
                                        ? 'bg-white rounded-lg shadow-sm overflow-hidden group'
                                        : 'bg-white rounded-lg shadow-sm p-4 flex items-center gap-4'
                                }
                            >
                                {viewMode === 'grid' ? (
                                    <>
                                        <div className="aspect-square relative bg-gray-100">
                                            <Image
                                                src={image.public_url}
                                                alt={image.alt_text || image.original_name}
                                                fill
                                                className="object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button className="p-2 bg-white/20 rounded-lg text-white hover:bg-white/30">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setEditingImage(image)}
                                                    className="p-2 bg-white/20 rounded-lg text-white hover:bg-white/30"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 bg-white/20 rounded-lg text-white hover:bg-white/30">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <p className="text-xs font-medium text-gray-900 truncate">
                                                {image.original_name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {image.category}
                                                {image.subcategory && ` / ${image.subcategory}`}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {formatFileSize(image.file_size)}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={image.public_url}
                                                alt={image.alt_text || image.original_name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <h3 className="text-sm font-medium text-gray-900 truncate">
                                                {image.original_name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {studios.find(s => s.id === image.studio_id)?.name} • {image.category}
                                                {image.subcategory && ` / ${image.subcategory}`}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {formatFileSize(image.file_size)} • {new Date(image.created_at).toLocaleDateString('de-DE')}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setEditingImage(image)}
                                                className="p-2 text-gray-400 hover:text-gray-600"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}

                {filteredImages.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Keine Bilder gefunden</h3>
                        <p className="text-gray-500 mb-4">
                            {searchTerm ? 'Keine Bilder entsprechen Ihrer Suche.' : 'Laden Sie Bilder hoch, um zu beginnen.'}
                        </p>
                        <button
                            onClick={() => setShowUploadForm(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            <Plus className="w-4 h-4" />
                            Erstes Bild hochladen
                        </button>
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            <AnimatePresence>
                {showUploadForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900">Bilder hochladen</h2>
                                    <button
                                        onClick={() => setShowUploadForm(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {/* File Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Dateien auswählen
                                        </label>
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                                        >
                                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                            <p className="text-gray-600">
                                                Klicken Sie hier oder ziehen Sie Dateien hierher
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                PNG, JPG, WebP, GIF bis zu 50MB
                                            </p>
                                        </div>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleFileSelect}
                                            className="hidden"
                                        />

                                        {selectedFiles.length > 0 && (
                                            <div className="mt-4">
                                                <p className="text-sm font-medium text-gray-700 mb-2">
                                                    Ausgewählte Dateien ({selectedFiles.length}):
                                                </p>
                                                <div className="space-y-2">
                                                    {selectedFiles.map((file, index) => (
                                                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                                            <span className="text-sm text-gray-700 truncate">{file.name}</span>
                                                            <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Form Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Studio *
                                            </label>
                                            <select
                                                value={uploadForm.studio_id}
                                                onChange={(e) => setUploadForm(prev => ({ ...prev, studio_id: e.target.value }))}
                                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                required
                                            >
                                                <option value="">Studio auswählen</option>
                                                {studios.map(studio => (
                                                    <option key={studio.id} value={studio.id}>
                                                        {studio.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Kategorie *
                                            </label>
                                            <select
                                                value={uploadForm.category}
                                                onChange={(e) => {
                                                    setUploadForm(prev => ({ ...prev, category: e.target.value, subcategory: '' }));
                                                }}
                                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                required
                                            >
                                                <option value="">Kategorie auswählen</option>
                                                {CATEGORIES.map(category => (
                                                    <option key={category.value} value={category.value}>
                                                        {category.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {uploadForm.category && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Unterkategorie
                                                </label>
                                                <select
                                                    value={uploadForm.subcategory}
                                                    onChange={(e) => setUploadForm(prev => ({ ...prev, subcategory: e.target.value }))}
                                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                >
                                                    <option value="">Unterkategorie auswählen</option>
                                                    {CATEGORIES.find(c => c.value === uploadForm.category)?.subcategories.map(sub => (
                                                        <option key={sub} value={sub}>
                                                            {sub}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Sortierreihenfolge
                                            </label>
                                            <input
                                                type="number"
                                                value={uploadForm.sort_order}
                                                onChange={(e) => setUploadForm(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                min="0"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Alt-Text
                                        </label>
                                        <input
                                            type="text"
                                            value={uploadForm.alt_text}
                                            onChange={(e) => setUploadForm(prev => ({ ...prev, alt_text: e.target.value }))}
                                            placeholder="Beschreibung für Barrierefreiheit"
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Bildunterschrift
                                        </label>
                                        <textarea
                                            value={uploadForm.caption}
                                            onChange={(e) => setUploadForm(prev => ({ ...prev, caption: e.target.value }))}
                                            placeholder="Optionale Bildunterschrift"
                                            rows={3}
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t">
                                    <button
                                        onClick={() => setShowUploadForm(false)}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        Abbrechen
                                    </button>
                                    <button
                                        onClick={handleUpload}
                                        disabled={uploading || selectedFiles.length === 0 || !uploadForm.studio_id || !uploadForm.category}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                                    >
                                        {uploading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Hochladen...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-4 h-4" />
                                                Hochladen
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Edit Modal */}
            <AnimatePresence>
                {editingImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900">Bild bearbeiten</h2>
                                    <button
                                        onClick={() => setEditingImage(null)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Image Preview */}
                                    <div>
                                        <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
                                            <Image
                                                src={editingImage.public_url}
                                                alt={editingImage.alt_text || editingImage.original_name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="mt-4 text-sm text-gray-500">
                                            <p><strong>Dateiname:</strong> {editingImage.filename}</p>
                                            <p><strong>Größe:</strong> {formatFileSize(editingImage.file_size)}</p>
                                            <p><strong>Typ:</strong> {editingImage.mime_type}</p>
                                            {editingImage.width && editingImage.height && (
                                                <p><strong>Abmessungen:</strong> {editingImage.width} × {editingImage.height}px</p>
                                            )}
                                            <p><strong>Hochgeladen:</strong> {new Date(editingImage.created_at).toLocaleDateString('de-DE')}</p>
                                        </div>
                                    </div>

                                    {/* Edit Form */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Alt-Text
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={editingImage.alt_text || ''}
                                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Bildunterschrift
                                            </label>
                                            <textarea
                                                defaultValue={editingImage.caption || ''}
                                                rows={3}
                                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Kategorie
                                            </label>
                                            <select
                                                defaultValue={editingImage.category}
                                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            >
                                                {CATEGORIES.map(category => (
                                                    <option key={category.value} value={category.value}>
                                                        {category.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Unterkategorie
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={editingImage.subcategory || ''}
                                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Sortierreihenfolge
                                            </label>
                                            <input
                                                type="number"
                                                defaultValue={editingImage.sort_order}
                                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                min="0"
                                            />
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="is_active"
                                                defaultChecked={editingImage.is_active}
                                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                            <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">
                                                Bild ist aktiv
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-8 pt-6 border-t">
                                    <button className="px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2">
                                        <Trash2 className="w-4 h-4" />
                                        Bild löschen
                                    </button>

                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setEditingImage(null)}
                                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                        >
                                            Abbrechen
                                        </button>
                                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                                            <Save className="w-4 h-4" />
                                            Speichern
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 