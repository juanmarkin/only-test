'use client';

import { useState } from 'react';
import styles from './page.module.scss';
import { DateSlider } from '@/components/date-slider';
import { slides } from '@/models/slides-data';
import { EventsSlider } from '@/components/events-slider';

export enum SlideDirection {
    PREV,
    NEXT,
}

export default function Home() {
    const [activeSlide, setActiveSlide] = useState<number>(0);

    const changeSlide = (direction: SlideDirection) => {
        if (direction === SlideDirection.PREV) {
            setActiveSlide((prev) => prev - 1);
            return;
        }
        setActiveSlide((prev) => prev + 1);
    };

    return (
        <div className={styles.page}>
            <div className={styles.wrapper}>
                <DateSlider
                    onSlideChange={changeSlide}
                    slides={slides}
                    activeSlideIndex={activeSlide}
                    onSelect={(slideIndex) => setActiveSlide(slideIndex)}
                />
                <EventsSlider slides={slides} activeSlideIndex={activeSlide} />
            </div>
        </div>
    );
}
