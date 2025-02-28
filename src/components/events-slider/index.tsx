import { ISlide } from '@/models/slides-data';
import styles from './styles.module.scss';
import { motion } from 'framer-motion';
import cn from 'classnames';

import { Navigation, Pagination, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { useEffect, useRef, useState } from 'react';
import { SizeEnum, SliderButton, SliderButtonEnum } from '../slider-button';

interface Props {
    slides: ISlide[];
    activeSlideIndex: number;
}

export function EventsSlider({ slides, activeSlideIndex }: Props) {
    const activeSlide = slides[activeSlideIndex];
    const [windowWidth, setWindowWidth] = useState(0);
    const swiperRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <motion.div
            key={activeSlideIndex}
            className={cn(styles.slider, 'swiper-container')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: 'spring', duration: 0.8, delay: 0.3 }}
        >
            <div
                className={cn(
                    styles.slider__button,
                    styles.slider__button_prev,
                    'swiper-button-prev',
                )}
            >
                <SliderButton size={SizeEnum.Small} direction={SliderButtonEnum.Prev} />
            </div>
            <div
                className={cn(
                    styles.slider__button,
                    styles.slider__button_next,
                    'swiper-button-next',
                )}
            >
                <SliderButton size={SizeEnum.Small} direction={SliderButtonEnum.Next} />
            </div>

            <Swiper
                key={windowWidth}
                ref={swiperRef}
                modules={[Pagination, FreeMode, Navigation]}
                slidesPerView={'auto'}
                freeMode
                spaceBetween={20}
                pagination={{
                    el: '.swiper-pagination',
                    clickable: true,
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    enabled: false,
                }}
                breakpoints={{
                    769: {
                        slidesPerView: 2,
                        freeMode: false,
                        navigation: {
                            enabled: true,
                        },
                        pagination: false,
                    },
                    1368: {
                        slidesPerView: 3,
                        navigation: {
                            enabled: true,
                        },
                    },
                    1920: {
                        spaceBetween: 80,
                        slidesPerView: 3,
                        navigation: {
                            enabled: true,
                        },
                    },
                }}
            >
                {activeSlide.events.map((event, index) => (
                    <SwiperSlide key={index} className={styles.slider__slide}>
                        <div className={styles.slider__event}>
                            <div className={styles.slider__year}>{event.year}</div>
                            <div className={styles.slider__description}>{event.description}</div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={cn(styles.slider__pagination, 'swiper-pagination')}></div>
        </motion.div>
    );
}
