import React from 'react'
import styles from "../../../styles/homepage/home.module.scss";
import CarouselHomePage from './Carousel';
import BestStreak from './BestStreak';

function HomePage() {
  return (
    <div className={styles["home-page"]}>
        <CarouselHomePage />
        <BestStreak />
    </div>
  )
}

export default HomePage