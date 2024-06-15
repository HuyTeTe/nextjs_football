import React from 'react'
import styles from "../../styles/footer.module.scss";
import { NextSeo } from 'next-seo';

function aboutus() {
  return (
    <div className={styles["about-us-content"]}>
        <NextSeo
          title='About us | Footballee'
          description='Footballee about us.'
          canonical='https://www.footballee.com/policy/aboutus'
          openGraph={{
              type: 'website',
              title: 'About us | Footballee',
              url: 'https://www.footballee.com/policy/aboutus',
              siteName: 'Livescore | Footballee',
              description: 'Footballee about us.',
              images: [
                {
                  url: 'https://www.footballee.com/favicon.ico',
                  alt: 'Footballee logo',
                }
              ],
          }}
        />
        <h2 className='text-center m-5'>About us</h2>
        <p className={styles["text-indent"]}>1. We are an independent professional website providing live scores and martingale match analysis football. <br/></p>
        <p className={styles["text-indent"]}>2. We use martingale as a strategy for prediction based on match attributes.<br/></p>
        <p className={styles["text-indent"]}>3. We have become the most popular and best prediction football website in the world with a professional and creative spirit.</p>
    </div>
  )
}

export default aboutus