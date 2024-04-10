"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ImageData {
    src: string;
    alt: string;
}

export default function ImageSlideshow({ images }: { images: ImageData[] }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleImageTransition = (direction: "next" | "previous") => {
        const newIndex = currentImageIndex + (direction === "next" ? 1 : -1);
        if (newIndex < 0) {
            setCurrentImageIndex(images.length - 1);
        } else if (newIndex >= images.length) {
            setCurrentImageIndex(0);
        } else {
            setCurrentImageIndex(newIndex);
        }
    };

    // Effect to handle automatic image transition (optional)
    useEffect(() => {
        const intervalId = setInterval(() => handleImageTransition("next"), 5000); // Adjust interval as needed
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [images, currentImageIndex]); // Re-run effect when images or current index changes

    const renderNavigationControls = () => (
        <div className="absolute flex justify-between items-center bottom-4 w-full">
            <button
                type="button"
                onClick={() => handleImageTransition("previous")}
                aria-label="Previous Image"
                disabled={currentImageIndex === 0} // Disable when at first image
            >
                <svg className="h-6 w-6 text-white fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </button>
            <div className="flex items-center">
                {images.map((imageData, index) => (
                    <button
                        key={imageData.src}
                        type="button"
                        className={`px-2 py-1 rounded-full mr-2 ${currentImageIndex === index ? "bg-white text-black" : "bg-gray-200 text-gray-400"}`}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Go to image ${index + 1}`}
                    />
                ))}
            </div>
            <button
                type="button"
                onClick={() => handleImageTransition("next")}
                aria-label="Next Image"
                disabled={currentImageIndex === images.length - 1} // Disable when at last image
            >
                <svg className="h-6 w-6 text-white fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );

    return (
        <div className="relative overflow-hidden rounded-3xl" style={{ height: "400px" }}>
            <div className="absolute top-0 left-0 w-full h-full rounded-3xl" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
                    <p className="text-lg font-semibold">"Empowering Minds, Unlocking Futures: Explore Boundless Knowledge with SUST Open Course Ware \- Where Excellence Meets Accessible Education."
                    </p>
                </div>
            </div>

            <Image
                alt={images[currentImageIndex].alt}
                src={images[currentImageIndex].src}
                layout="fill"
                objectFit="cover"
                className="absolute w-full h-full rounded-3xl filter brightness-50 blur-sm"
            />
            {renderNavigationControls()} {/* Render navigation controls */}
        </div>
    );
}
