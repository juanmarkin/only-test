'use client';

import { ISlide } from '@/models/slides-data';
import styles from './styles.module.scss';
import { SlideDirection } from '@/app/page';
import { SliderButton, SliderButtonEnum } from '../slider-button';
import { useEffect, useState } from 'react';
import { CircleSlider } from '../circle-slider';

enum DirectionEnum {
    LEFT,
    RIGHT,
}

interface Props {
    onSlideChange: (direction: SlideDirection) => void;
    slides: ISlide[];
    activeSlideIndex: number;
    onSelect: (slideIndex: number) => void;
}

export function DateSlider({ onSlideChange, slides, activeSlideIndex, onSelect }: Props) {
    const [directionContext, setDirectionContext] = useState<DirectionEnum>(DirectionEnum.RIGHT);
    const activeSlide = slides[activeSlideIndex] || slides[0];
    const prevSlide =
        slides[activeSlideIndex - (directionContext === DirectionEnum.RIGHT ? 1 : -1)] ||
        activeSlide;
    const [yearStart, setYearStart] = useState<number>(activeSlide.yearStart);
    const [yearEnd, setYearEnd] = useState<number>(activeSlide.yearEnd);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsAnimating(true);

        const animateYearChange = (
            prev: number,
            target: number,
            setter: (value: number) => void,
        ) => {
            if (prev === target) {
                setter(0);
                setTimeout(() => setter(prev), 10);
            }

            let current = prev;
            const step = current < target ? 1 : -1;

            const interval = setInterval(() => {
                if (current !== target) {
                    current += step;
                    setter(current);
                } else {
                    clearInterval(interval);
                    setIsAnimating(false);
                }
            }, 25);

            return () => clearInterval(interval);
        };

        const clearStart = animateYearChange(
            prevSlide.yearStart,
            activeSlide.yearStart,
            setYearStart,
        );
        const clearEnd = animateYearChange(prevSlide.yearEnd, activeSlide.yearEnd, setYearEnd);

        return () => {
            clearStart();
            clearEnd();
        };
    }, [activeSlideIndex]);

    return (
        <div className={styles.slider}>
            <h1 className={styles.slider__title}>Исторические даты</h1>

            <div className={styles.slider__wrapper}>
                <div className={styles.slider__content}>
                    <span className={styles.slider__yearStart}>{yearStart}</span>
                    <span className={styles.slider__yearEnd}>{yearEnd}</span>
                </div>

                <div className={styles.slider__circleSlider}>
                    <CircleSlider
                        slides={slides}
                        activeSlideIndex={activeSlideIndex}
                        onSelect={onSelect}
                    />
                </div>
            </div>

            <div className={styles.slider__controls}>
                <span className={styles.slider__counter}>
                    {`0${activeSlideIndex + 1}/0${slides.length}`}
                </span>
                <div className={styles.slider__buttons}>
                    <SliderButton
                        onClick={() => {
                            activeSlideIndex > 0 && onSlideChange(SlideDirection.PREV);
                            setDirectionContext(DirectionEnum.LEFT);
                        }}
                        disabled={activeSlideIndex < 1 || isAnimating}
                        disabledStyle={activeSlideIndex < 1}
                    />
                    <SliderButton
                        onClick={() => {
                            onSlideChange(SlideDirection.NEXT);
                            setDirectionContext(DirectionEnum.RIGHT);
                        }}
                        disabled={activeSlideIndex >= slides.length - 1 || isAnimating}
                        disabledStyle={activeSlideIndex >= slides.length - 1}
                        direction={SliderButtonEnum.Next}
                    />
                </div>
            </div>
        </div>
    );
}
