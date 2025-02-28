import { ISlide } from '@/models/slides-data';
import styles from './styles.module.scss';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
    slides: ISlide[];
    activeSlideIndex: number;
    onSelect: (slideIndex: number) => void;
}

export function CircleSlider({ slides, activeSlideIndex, onSelect }: Props) {
    const activeAngle = 0.083;

    const setRotation = (slideIndex: number) => {
        const step = slideIndex - activeSlideIndex;
        const pointsGap = 1 / slides.length;
        return activeAngle + step * pointsGap;
    };

    return (
        <div className={styles.slider}>
            {slides.map((slide, index) => {
                const isActive = index === activeSlideIndex;

                return (
                    <div
                        className={cn(styles.slider__item, {
                            [styles.slider__item_active]: isActive,
                        })}
                        style={{
                            transform: isActive
                                ? `rotate(${activeAngle}turn)`
                                : `rotate(${setRotation(index)}turn)`,
                        }}
                        key={index}
                    >
                        <div className={styles.slider__itemContent} onClick={() => onSelect(index)}>
                            <span
                                className={styles.slider__itemNumber}
                                style={
                                    !isActive
                                        ? { transform: `rotate(${setRotation(index) * -1}turn)` }
                                        : undefined
                                }
                            >
                                {index + 1}

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5, delay: 0.6 }}
                                            className={styles.slider__itemName}
                                        >
                                            {slide.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
