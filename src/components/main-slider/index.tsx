'use client';

import { useState } from 'react';
import { DateSlider } from '../date-slider';
import { EventsSlider } from '../events-slider';
import { slides } from '@/models/slides-data';

export enum SlideDirection {
    PREV,
    NEXT,
}

export function MainSlider() {
    const [activeSlide, setActiveSlide] = useState<number>(0);

    const changeSlide = (direction: SlideDirection) => {
        if (direction === SlideDirection.PREV) {
            setActiveSlide((prev) => prev - 1);
            return;
        }
        setActiveSlide((prev) => prev + 1);
    };

    return (
        <>
            <DateSlider
                onSlideChange={changeSlide}
                slides={slides}
                activeSlideIndex={activeSlide}
                onSelect={(slideIndex) => setActiveSlide(slideIndex)}
            />
            <EventsSlider slides={slides} activeSlideIndex={activeSlide} />
        </>
    );
}
