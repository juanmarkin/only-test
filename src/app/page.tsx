import styles from './page.module.scss';
import { MainSlider } from '@/components/main-slider';

export default function Home() {
    return (
        <div className={styles.page}>
            <div className={styles.wrapper}>
                <MainSlider />
            </div>
        </div>
    );
}
