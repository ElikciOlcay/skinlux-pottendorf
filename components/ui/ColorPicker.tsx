"use client";

import { useState, useEffect } from "react";
import { Palette, X, RotateCcw } from "lucide-react";

const ColorPicker = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentColor, setCurrentColor] = useState("#F0A3BC");
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 20, y: 20 });

    // Preset colors for quick selection
    const presetColors = [
        "#F0A3BC", // Original Pink
        "#E91E63", // Material Pink
        "#FF6B9D", // Hot Pink
        "#FFB6C1", // Light Pink
        "#FF1493", // Deep Pink
        "#FF69B4", // Hot Pink 2
        "#FFC0CB", // Pink
        "#00A9D9", // SkinLux Blue
        "#FF5722", // Deep Orange
        "#9C27B0", // Purple
        "#673AB7", // Deep Purple
        "#3F51B5", // Indigo
        "#009688", // Teal
        "#4CAF50", // Green
        "#FF9800", // Orange
        "#795548", // Brown
    ];

    // Update CSS custom property when color changes
    useEffect(() => {
        document.documentElement.style.setProperty('--color-secondary', currentColor);
    }, [currentColor]);

    // Reset to original color
    const resetColor = () => {
        setCurrentColor("#F0A3BC");
    };

    // Handle dragging
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        const rect = e.currentTarget.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;

            setPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]);

    return (
        <div
            className="fixed z-50 select-none"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? 'grabbing' : 'grab'
            }}
        >
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    onMouseDown={handleMouseDown}
                    className="bg-white border-2 border-gray-300 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                    title="Farben testen"
                >
                    <Palette className="w-6 h-6" style={{ color: currentColor }} />
                </button>
            )}

            {/* Color Picker Panel */}
            {isOpen && (
                <div
                    className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-xl min-w-[280px]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div
                        className="flex items-center justify-between mb-4 cursor-grab active:cursor-grabbing"
                        onMouseDown={handleMouseDown}
                    >
                        <h3 className="font-medium text-gray-800">Farben testen</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Current Color Display */}
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div
                                className="w-8 h-8 rounded border-2 border-gray-300"
                                style={{ backgroundColor: currentColor }}
                            />
                            <span className="text-sm font-mono text-gray-600">{currentColor}</span>
                        </div>

                        {/* Color Input */}
                        <input
                            type="color"
                            value={currentColor}
                            onChange={(e) => setCurrentColor(e.target.value)}
                            className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                        />
                    </div>

                    {/* Preset Colors */}
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Vordefinierte Farben:</p>
                        <div className="grid grid-cols-8 gap-1">
                            {presetColors.map((color, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentColor(color)}
                                    className={`w-8 h-8 rounded border-2 transition-all duration-200 hover:scale-110 ${currentColor === color ? 'border-gray-800' : 'border-gray-300'
                                        }`}
                                    style={{ backgroundColor: color }}
                                    title={color}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <button
                            onClick={resetColor}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Original
                        </button>
                        <p className="text-xs text-gray-500">
                            Live-Vorschau aktiv
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColorPicker; 