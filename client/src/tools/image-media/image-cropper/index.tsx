import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Download, RotateCcw, RotateCw, ZoomIn, ZoomOut, RefreshCw, Square, Crop, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/lib/ThemeProvider';

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageState {
  file: File;
  url: string;
  width: number;
  height: number;
  rotation: number;
  zoom: number;
}

const ASPECT_RATIOS = [
  { label: 'Freeform', value: 'free', ratio: null },
  { label: 'Square (1:1)', value: '1:1', ratio: 1 },
  { label: '4:3', value: '4:3', ratio: 4/3 },
  { label: '16:9', value: '16:9', ratio: 16/9 },
  { label: '3:2', value: '3:2', ratio: 3/2 },
  { label: '9:16 (Portrait)', value: '9:16', ratio: 9/16 },
];

const OUTPUT_FORMATS = [
  { label: 'JPEG', value: 'jpeg', mime: 'image/jpeg' },
  { label: 'PNG', value: 'png', mime: 'image/png' },
  { label: 'WebP', value: 'webp', mime: 'image/webp' },
];

export default function ImageCropper() {
  const { theme } = useTheme();
  const [originalImage, setOriginalImage] = useState<ImageState | null>(null);
  const [cropArea, setCropArea] = useState<CropArea>({ x: 50, y: 50, width: 200, height: 200 });
  const [aspectRatio, setAspectRatio] = useState('free');
  const [outputFormat, setOutputFormat] = useState('jpeg');
  const [quality, setQuality] = useState([90]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [resizing, setResizing] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Handle file upload
  const handleFileUpload = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setError(null);
    const url = URL.createObjectURL(file);
    
    const img = document.createElement('img');
    img.onload = () => {
      setOriginalImage({
        file,
        url,
        width: img.width,
        height: img.height,
        rotation: 0,
        zoom: 1
      });
      
      // Set initial crop area (center 50% of image)
      const cropWidth = Math.min(img.width * 0.5, 300);
      const cropHeight = Math.min(img.height * 0.5, 300);
      setCropArea({
        x: (img.width - cropWidth) / 2,
        y: (img.height - cropHeight) / 2,
        width: cropWidth,
        height: cropHeight
      });
    };
    img.src = url;
  }, []);

  // Handle drag and drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  // Handle rotation
  const handleRotate = useCallback((direction: 'cw' | 'ccw') => {
    if (!originalImage) return;
    
    const rotation = direction === 'cw' ? 90 : -90;
    setOriginalImage(prev => prev ? {
      ...prev,
      rotation: (prev.rotation + rotation) % 360
    } : null);
  }, [originalImage]);

  // Handle zoom
  const handleZoom = useCallback((direction: 'in' | 'out') => {
    if (!originalImage) return;
    
    const zoomFactor = direction === 'in' ? 1.1 : 0.9;
    setOriginalImage(prev => prev ? {
      ...prev,
      zoom: Math.max(0.1, Math.min(3, prev.zoom * zoomFactor))
    } : null);
  }, [originalImage]);

  // Handle reset
  const handleReset = useCallback(() => {
    if (!originalImage) return;
    
    setOriginalImage(prev => prev ? {
      ...prev,
      rotation: 0,
      zoom: 1
    } : null);
    
    // Reset crop area
    const cropWidth = Math.min(originalImage.width * 0.5, 300);
    const cropHeight = Math.min(originalImage.height * 0.5, 300);
    setCropArea({
      x: (originalImage.width - cropWidth) / 2,
      y: (originalImage.height - cropHeight) / 2,
      width: cropWidth,
      height: cropHeight
    });
  }, [originalImage]);

  // Handle aspect ratio change
  const handleAspectRatioChange = useCallback((value: string) => {
    setAspectRatio(value);
    
    const selectedRatio = ASPECT_RATIOS.find(r => r.value === value);
    if (selectedRatio?.ratio && originalImage) {
      const currentArea = cropArea;
      let newWidth = currentArea.width;
      let newHeight = currentArea.height;
      
      if (selectedRatio.ratio > 1) {
        // Landscape
        newHeight = newWidth / selectedRatio.ratio;
      } else {
        // Portrait or square
        newWidth = newHeight * selectedRatio.ratio;
      }
      
      // Ensure crop area fits within image bounds
      const maxX = originalImage.width - newWidth;
      const maxY = originalImage.height - newHeight;
      
      setCropArea({
        x: Math.max(0, Math.min(maxX, currentArea.x)),
        y: Math.max(0, Math.min(maxY, currentArea.y)),
        width: newWidth,
        height: newHeight
      });
    }
  }, [cropArea, originalImage]);

  // Handle mouse events for cropping
  const handleMouseDown = useCallback((e: React.MouseEvent, type: 'move' | 'resize') => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    if (type === 'move') {
      setIsDragging(true);
    } else {
      setResizing(type);
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragStart || !originalImage) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    const deltaX = currentX - dragStart.x;
    const deltaY = currentY - dragStart.y;

    if (isDragging) {
      // Move crop area
      const newX = Math.max(0, Math.min(originalImage.width - cropArea.width, cropArea.x + deltaX));
      const newY = Math.max(0, Math.min(originalImage.height - cropArea.height, cropArea.y + deltaY));
      
      setCropArea(prev => ({
        ...prev,
        x: newX,
        y: newY
      }));
      
      setDragStart({ x: currentX, y: currentY });
    }
  }, [dragStart, isDragging, cropArea, originalImage]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setResizing(null);
    setDragStart(null);
  }, []);

  // Process and download cropped image
  const handleDownload = useCallback(async () => {
    if (!originalImage || !canvasRef.current) return;

    setIsProcessing(true);
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      canvas.width = cropArea.width;
      canvas.height = cropArea.height;

      const img = document.createElement('img');
      img.onload = () => {
        // Apply transformations
        ctx.save();
        
        // Rotate if needed
        if (originalImage.rotation !== 0) {
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((originalImage.rotation * Math.PI) / 180);
          ctx.translate(-canvas.width / 2, -canvas.height / 2);
        }

        // Draw cropped area
        ctx.drawImage(
          img,
          cropArea.x, cropArea.y, cropArea.width, cropArea.height,
          0, 0, canvas.width, canvas.height
        );
        
        ctx.restore();

        // Create download
        const format = OUTPUT_FORMATS.find(f => f.value === outputFormat);
        const qualityValue = outputFormat === 'jpeg' ? quality[0] / 100 : 1;
        
        canvas.toBlob((blob) => {
          if (!blob) return;
          
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `cropped-image.${outputFormat}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          setIsProcessing(false);
        }, format?.mime, qualityValue);
      };
      img.src = originalImage.url;
    } catch (error) {
      setError('Failed to process image');
      setIsProcessing(false);
    }
  }, [originalImage, cropArea, outputFormat, quality]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
              <Crop className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Image Cropper
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Professional image cropping tool with custom ratios, zoom, rotation, and high-quality output
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Image
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!originalImage ? (
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                      theme === 'dark' 
                        ? 'border-gray-600 hover:border-purple-400 bg-gray-700/50' 
                        : 'border-gray-300 hover:border-purple-400 bg-gray-50'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      Drag and drop an image here, or click to select
                    </p>
                    <p className="text-sm text-gray-400">
                      Supports JPG, PNG, WebP, GIF up to 10MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={originalImage.url}
                        alt="Original"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Badge className="absolute top-2 right-2 bg-green-500">
                        {originalImage.width} × {originalImage.height}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                    >
                      Choose Different Image
                    </Button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  className="hidden"
                />

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-600 rounded-lg text-red-700 dark:text-red-300 text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Controls */}
            {originalImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Controls</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Transform Controls */}
                    <div>
                      <label className="block text-sm font-medium mb-3">Transform</label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRotate('ccw')}
                          className="flex items-center gap-1"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleReset}
                          className="flex items-center gap-1"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRotate('cw')}
                          className="flex items-center gap-1"
                        >
                          <RotateCw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Zoom Controls */}
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Zoom: {Math.round(originalImage.zoom * 100)}%
                      </label>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleZoom('out')}
                        >
                          <ZoomOut className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleZoom('in')}
                        >
                          <ZoomIn className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Aspect Ratio */}
                    <div>
                      <label className="block text-sm font-medium mb-3">Aspect Ratio</label>
                      <Select value={aspectRatio} onValueChange={handleAspectRatioChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ASPECT_RATIOS.map((ratio) => (
                            <SelectItem key={ratio.value} value={ratio.value}>
                              {ratio.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Crop Size Display */}
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="text-sm font-medium mb-1">Crop Size</div>
                      <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                        {Math.round(cropArea.width)} × {Math.round(cropArea.height)} px
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>

          {/* Main Cropping Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm h-full">
              <CardContent className="p-6 h-full">
                {originalImage ? (
                  <div 
                    ref={containerRef}
                    className="relative w-full h-full min-h-[500px] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden cursor-crosshair"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    {/* Background Image */}
                    <img
                      ref={imageRef}
                      src={originalImage.url}
                      alt="Crop"
                      className="w-full h-full object-contain"
                      style={{
                        transform: `rotate(${originalImage.rotation}deg) scale(${originalImage.zoom})`,
                        transformOrigin: 'center'
                      }}
                    />

                    {/* Crop Overlay */}
                    <div className="absolute inset-0 bg-black/50">
                      {/* Crop Window */}
                      <div
                        className="absolute bg-transparent border-2 border-white shadow-lg cursor-move"
                        style={{
                          left: `${(cropArea.x / originalImage.width) * 100}%`,
                          top: `${(cropArea.y / originalImage.height) * 100}%`,
                          width: `${(cropArea.width / originalImage.width) * 100}%`,
                          height: `${(cropArea.height / originalImage.height) * 100}%`,
                        }}
                        onMouseDown={(e) => handleMouseDown(e, 'move')}
                      >
                        {/* Clear the crop area */}
                        <div className="absolute inset-0 bg-transparent backdrop-blur-0" 
                             style={{ backdropFilter: 'none' }}>
                        </div>

                        {/* Corner Handles */}
                        <div className="absolute -top-1 -left-1 w-3 h-3 bg-white border border-gray-300 cursor-nw-resize"></div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white border border-gray-300 cursor-ne-resize"></div>
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white border border-gray-300 cursor-sw-resize"></div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white border border-gray-300 cursor-se-resize"></div>

                        {/* Edge Handles */}
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border border-gray-300 cursor-n-resize"></div>
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border border-gray-300 cursor-s-resize"></div>
                        <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border border-gray-300 cursor-w-resize"></div>
                        <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border border-gray-300 cursor-e-resize"></div>

                        {/* Move Icon */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <Move className="w-6 h-6 text-white drop-shadow-lg" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[500px] bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <div className="text-center">
                      <Crop className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-500 dark:text-gray-400">
                        Upload an image to start cropping
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Output Settings & Download */}
        {originalImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Output Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Output Format */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Output Format</label>
                    <Select value={outputFormat} onValueChange={setOutputFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {OUTPUT_FORMATS.map((format) => (
                          <SelectItem key={format.value} value={format.value}>
                            {format.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quality Slider */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Quality: {quality[0]}%
                    </label>
                    <Slider
                      value={quality}
                      onValueChange={setQuality}
                      max={100}
                      min={1}
                      step={1}
                      className="mt-2"
                      disabled={outputFormat === 'png'}
                    />
                  </div>

                  {/* Download Button */}
                  <div className="flex items-end">
                    <Button
                      onClick={handleDownload}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Download Cropped Image
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Hidden Canvas for Processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}