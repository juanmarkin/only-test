import styles from './styles.module.scss';
import cn from 'classnames';

export enum SliderButtonEnum {
    Prev,
    Next,
}

export enum SizeEnum {
    Regular,
    Small,
}

interface Props {
    direction?: SliderButtonEnum;
    size?: SizeEnum;
    onClick?: () => void;
    disabled?: boolean;
    disabledStyle?: boolean;
}

export function SliderButton({
    direction = SliderButtonEnum.Prev,
    size = SizeEnum.Regular,
    onClick,
    disabled,
    disabledStyle,
}: Props) {
    return (
        <button
            className={cn(styles.button, {
                [styles.button_next]: direction === SliderButtonEnum.Next,
                [styles.button_small]: size === SizeEnum.Small,
                [styles.button_regular]: size === SizeEnum.Regular,
                [styles.button_disabled]: disabledStyle,
            })}
            onClick={onClick}
            disabled={disabled}
        >
            <span className={styles.button__arrow}>
                {size === SizeEnum.Regular ? <ArrowIcon /> : <ArrowSmallIcon />}
            </span>
        </button>
    );
}

const ArrowIcon = () => {
    return (
        <svg
            width='10'
            height='14'
            viewBox='0 0 10 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M3.66409 6.99999L9.20698 12.5429L7.79277 13.9571L0.835663 6.99999L7.79277 0.0428797L9.20698 1.45709L3.66409 6.99999Z'
                fill='#42567A'
            />
        </svg>
    );
};

const ArrowSmallIcon = () => {
    return (
        <svg
            width='8'
            height='12'
            viewBox='0 0 8 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M3.12127 5.99999L7.41417 10.2929L5.99995 11.7071L0.292847 5.99999L5.99995 0.29288L7.41417 1.70709L3.12127 5.99999Z'
                fill='#3877EE'
            />
        </svg>
    );
};
