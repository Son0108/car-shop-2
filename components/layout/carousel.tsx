'use client'

import { useState, useRef, useEffect } from 'react'
import { Image } from "@nextui-org/react"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselProps {
    imageInfo : {
        src: string;
        alt: string;
    }[]
}

export default function Carousel({imageInfo}: CarouselProps) {

    const [currentIndex, setCurrentIndex] = useState(1);
    const preSlide = () => {
        const isFirstSlide = currentIndex === 1;
        const newIndex = isFirstSlide ? imageInfo.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const nextSlide = () => {
        const isLastSlide = currentIndex === imageInfo.length - 1;
        const newIndex = isLastSlide ? 1 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    return (
       <div className='lg:max-w-[500px] lg:h-[500px] md:max-w-[600px] mx-16 py-16 relative group'>
            <div className='z-0 '>
                <Image className='w-full h-full rounded-2xl bg-center bg-cover duration-500' width="100%" src={imageInfo[currentIndex].src} alt={imageInfo[currentIndex].alt}/>
            </div>
            <div className='hidden z-40 group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <ChevronLeft onClick={preSlide} size={30}/>
            </div>
            <div className='hidden z-40 group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <ChevronRight onClick={nextSlide} size={30}/>
            </div>
       </div>
    )
}