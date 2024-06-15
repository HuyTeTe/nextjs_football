import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import styles from "../../../styles/homepage/home.module.scss";

function CarouselHomePage() {
  return (
    <Carousel className={styles["carousel-homepage"]} fade>
      <Carousel.Item className={styles["carousel-homepage-item"]} alt="automatically generate everyday" interval={1700}>
        <img height="200" src="/images/banner/banner_8.webp" />
      </Carousel.Item>
      <Carousel.Item className={styles["carousel-homepage-item"]} alt="find your winning streak" interval={1700}>
        <img height="200" src="/images/banner/banner_6.webp" />
      </Carousel.Item>
      <Carousel.Item className={styles["carousel-homepage-item"]} alt="livescore all matches in the world" interval={1700}>
        <img height="200" src="/images/banner/banner_7.webp" />
      </Carousel.Item>
    </Carousel>
  )
}

export default CarouselHomePage