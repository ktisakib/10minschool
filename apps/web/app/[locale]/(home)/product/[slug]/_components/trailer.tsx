"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Medium } from "@/lib/types/product"
import { Button } from "@enterprise/ui/components/button"
import { Dialog, DialogContent, DialogTrigger } from "@enterprise/ui/components/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@enterprise/ui/components/carousel"
import { cn } from "@enterprise/ui/lib/utils"
import { Play, Pause, Volume2, VolumeX, Maximize, X, ChevronLeft, ChevronRight } from "lucide-react"

interface TrailerProps {
    media: Medium[]
    className?: string
    autoPlay?: boolean
    showControls?: boolean
}

interface MediaPlayerProps {
    medium: Medium
    isActive: boolean
    onPlay?: () => void
    onPause?: () => void
    className?: string
    showOverlay?: boolean
}

interface MediaThumbnailProps {
    medium: Medium
    isActive: boolean
    onClick: () => void
    className?: string
    index: number
}

interface MediaModalProps {
    media: Medium[]
    initialIndex: number
    isOpen: boolean
    onClose: () => void
}

// Helper function to get YouTube embed URL
const getYouTubeEmbedUrl = (videoId: string, autoplay = false, muted = true) => {
    const params = new URLSearchParams({
        autoplay: autoplay ? '1' : '0',
        mute: muted ? '1' : '0',
        rel: '0',
        modestbranding: '1',
        controls: '1',
        iv_load_policy: '3'
    })
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
}

// Media Player Component
const MediaPlayer = ({ medium, isActive, onPlay, onPause, className, showOverlay = true }: MediaPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [showVideo, setShowVideo] = useState(false)
    const videoRef = useRef<HTMLIFrameElement>(null)

    const handlePlayPause = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation()
        if (medium.resource_type === 'video') {
            if (!showVideo) {
                setShowVideo(true)
                setIsPlaying(true)
                onPlay?.()
            } else if (isPlaying) {
                setIsPlaying(false)
                onPause?.()
            } else {
                setIsPlaying(true)
                onPlay?.()
            }
        }
    }, [isPlaying, medium.resource_type, onPlay, onPause, showVideo])

    const toggleMute = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        setIsMuted(!isMuted)
    }, [isMuted])

    if (medium.resource_type === 'image') {
        return (
            <div className={ cn("relative aspect-video w-full overflow-hidden ", className) }>
                <img
                    src={ medium.resource_value }
                    alt={ medium.name }
                    className="w-full h-full object-cover"
                />
            </div>
        )
    }

    // For videos, show thumbnail first, then iframe when playing
    const thumbnailUrl = medium.thumbnail_url || `https://img.youtube.com/vi/${medium.resource_value}/maxresdefault.jpg`

    return (
        <div className={ cn("relative aspect-video w-full overflow-hidden  bg-black", className) }>
            {/* Video Thumbnail or Iframe */ }
            { !showVideo ? (
                <img
                    src={ thumbnailUrl }
                    alt={ medium.name }
                    className="w-full h-full object-cover"
                />
            ) : (
                <iframe
                    ref={ videoRef }
                    src={ getYouTubeEmbedUrl(medium.resource_value, isPlaying, isMuted) }
                    className="w-full h-full"
                    allowFullScreen
                    title={ medium.name }
                />
            ) }

            {/* Play Button Overlay - Always visible for videos */ }
            { !showVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={ handlePlayPause }
                        className="bg-white/90 cursor-pointer hover:bg-white text-foreground shadow-lg w-16 h-16 rounded-full"
                    >
                        <Play className=" ml-1 size-8 rounded-2xl  fill-primary stroke-0 " />
                    </Button>
                </div>
            ) }

            {/* Video Controls Overlay - Show on hover when video is playing */ }
            { showVideo && showOverlay && (
                <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={ handlePlayPause }
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                        >
                            { isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" /> }
                        </Button>
                    </div>

                    <div className="absolute bottom-4 right-4 flex gap-2">
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={ toggleMute }
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 w-8 h-8"
                        >
                            { isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" /> }
                        </Button>
                    </div>
                </div>
            ) }
        </div>
    )
}

// Media Thumbnail Component
const MediaThumbnail = ({ medium, isActive, onClick, className, index }: MediaThumbnailProps) => {
    const thumbnailUrl = medium.resource_type === 'video'
        ? medium.thumbnail_url || `https://img.youtube.com/vi/${medium.resource_value}/maxresdefault.jpg`
        : medium.resource_value

    return (
        <button
            onClick={ onClick }
            className={ cn(
                "relative aspect-video w-20 h-14 rounded-md overflow-hidden transition-all duration-200 border-2 flex-shrink-0",
                isActive ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-gray-300",
                className
            ) }
        >
            <img
                src={ thumbnailUrl }
                alt={ `${medium.name} thumbnail` }
                className="w-full h-full object-cover"
            />

            { medium.resource_type === 'video' && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                </div>
            ) }

            <div className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1 rounded">
                { index + 1 }
            </div>
        </button>
    )
}

// Media Modal Component
const MediaModal = ({ media, initialIndex, isOpen, onClose }: MediaModalProps) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex)
    const currentMedium = media[currentIndex]

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : media.length - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev < media.length - 1 ? prev + 1 : 0))
    }

    useEffect(() => {
        setCurrentIndex(initialIndex)
    }, [initialIndex])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') goToPrevious()
            if (e.key === 'ArrowRight') goToNext()
            if (e.key === 'Escape') onClose()
        }

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
            return () => document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    if (!isOpen || !currentMedium) return null

    return (
        <Dialog open={ isOpen } onOpenChange={ onClose }>
            <DialogContent className="max-w-6xl w-full h-[90vh] p-0">
                <div className="relative w-full h-full bg-black">
                    {/* Close Button */ }
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={ onClose }
                        className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
                    >
                        <X className="w-4 h-4" />
                    </Button>

                    {/* Navigation Buttons */ }
                    { media.length > 1 && (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={ goToPrevious }
                                className="absolute left-4 top-1/2 cursor-pointer  -translate-y-1/2 z-10 bg-background/70 hover:bg-background/90 text-foreground w-12 h-12 rounded-full shadow-lg"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={ goToNext }
                                className="absolute right-4 top-1/2 cursor-pointer  -translate-y-1/2 z-10 bg-background/70 hover:bg-background/90 text-foreground w-12 h-12 rounded-full shadow-lg"
                            >
                                <ChevronRight className="w-8 h-8" />
                            </Button>
                        </>
                    ) }

                    {/* Main Media */ }
                    <div className="w-full h-full flex items-center justify-center p-8">
                        <MediaPlayer
                            medium={ currentMedium }
                            isActive={ true }
                            className="max-w-full max-h-full"
                            showOverlay={ false }
                        />
                    </div>

                    {/* Thumbnail Navigation */ }
                    { media.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                            <div className="flex gap-2 bg-black/50 p-2 rounded-lg max-w-md overflow-x-auto scrollbar-hide">
                                { media.map((medium, index) => (
                                    <MediaThumbnail
                                        key={ `${medium.name}-${index}` }
                                        medium={ medium }
                                        isActive={ index === currentIndex }
                                        onClick={ () => setCurrentIndex(index) }
                                        index={ index }
                                        className="w-16 h-12"
                                    />
                                )) }
                            </div>
                        </div>
                    ) }

                    {/* Media Info */ }
                    <div className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded">
                        <p className="text-sm font-medium">{ currentMedium.name.replace(/_/g, ' ') }</p>
                        <p className="text-xs opacity-70">
                            { currentIndex + 1 } of { media.length } • { currentMedium.resource_type }
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

// Main Trailer Component
const Trailer = ({ media, className, autoPlay = false, showControls = true }: TrailerProps) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalIndex, setModalIndex] = useState(0)

    // Filter media for preview gallery (main display)
    const previewGalleryMedia = media.filter(m => m.name === 'preview_gallery')
    const displayMedia = previewGalleryMedia.length > 0 ? previewGalleryMedia : media.slice(0, 5)

    const goToPrevious = () => {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : displayMedia.length - 1))
    }

    const goToNext = () => {
        setActiveIndex((prev) => (prev < displayMedia.length - 1 ? prev + 1 : 0))
    }

    const handleThumbnailClick = (index: number) => {
        setActiveIndex(index)
    }

    const handleFullscreen = () => {
        setModalIndex(activeIndex)
        setModalOpen(true)
    }

    const handleMediaClick = () => {
        handleFullscreen()
    }

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (displayMedia.length > 1) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault()
                    goToPrevious()
                }
                if (e.key === 'ArrowRight') {
                    e.preventDefault()
                    goToNext()
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [displayMedia.length])

    if (!media || media.length === 0) {
        return (
            <div className={ cn("aspect-video w-full bg-gray-100 rounded-lg flex items-center justify-center", className) }>
                <p className="text-gray-500">No media available</p>
            </div>
        )
    }

    const activeMedium = displayMedia[activeIndex]

    if (!activeMedium) {
        return (
            <div className={ cn("aspect-video w-full bg-gray-100 rounded-lg flex items-center justify-center", className) }>
                <p className="text-gray-500">No media available</p>
            </div>
        )
    }

    return (
        <div className={ cn("w-full space-y-4", className) }>
            {/* Main Media Display */ }
            <div className="relative group cursor-pointer" onClick={ handleMediaClick }>
                <MediaPlayer
                    medium={ activeMedium }
                    isActive={ true }
                    className="w-full"
                />

                {/* Navigation Arrows - Only show if multiple media */ }
                { displayMedia.length > 1 && (
                    <>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={ (e) => {
                                e.stopPropagation()
                                goToPrevious()
                            } }
                            className="absolute left-4 top-1/2 cursor-pointer -translate-y-1/2  transition-opacity bg-background/70 hover:bg-background/90 text-foreground w-10 h-10 rounded-full shadow-lg"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={ (e) => {
                                e.stopPropagation()
                                goToNext()
                            } }
                            className="absolute right-4 top-1/2 cursor-pointer -translate-y-1/2  transition-opacity bg-background/70 hover:bg-background/90 text-foreground w-10 h-10 rounded-full shadow-lg"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </Button>
                    </>
                ) }

                {/* Fullscreen Button */ }
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={ (e) => {
                        e.stopPropagation()
                        handleFullscreen()
                    } }
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm hover:bg-white/30"
                >
                    <Maximize className="w-4 h-4" />
                </Button>
            </div>

            {/* Thumbnail Navigation */ }
            { displayMedia.length > 1 && showControls && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    { displayMedia.map((medium, index) => (
                        <MediaThumbnail
                            key={ `${medium.name}-${index}` }
                            medium={ medium }
                            isActive={ index === activeIndex }
                            onClick={ () => handleThumbnailClick(index) }
                            index={ index }
                            className="flex-shrink-0"
                        />
                    )) }
                </div>
            ) }

            {/* Alternative: Carousel for many thumbnails */ }
            { displayMedia.length > 6 && showControls && (
                <Carousel className="w-full">
                    <CarouselContent className="-ml-2">
                        { displayMedia.map((medium, index) => (
                            <CarouselItem key={ `${medium.name}-${index}` } className="pl-2 basis-auto">
                                <MediaThumbnail
                                    medium={ medium }
                                    isActive={ index === activeIndex }
                                    onClick={ () => handleThumbnailClick(index) }
                                    index={ index }
                                />
                            </CarouselItem>
                        )) }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            ) }

            {/* Media Modal */ }
            <MediaModal
                media={ displayMedia }
                initialIndex={ modalIndex }
                isOpen={ modalOpen }
                onClose={ () => setModalOpen(false) }
            />
        </div>
    )
}

export default Trailer

// Export sub-components for reusability
export { MediaPlayer, MediaThumbnail, MediaModal }
