import HomePage from "../components/content/homepage/HomePage"
import { NextSeo } from 'next-seo';

export default function Home() {
  return (
      <>
        <NextSeo
          title='Footballee Homepage | Football Betting with great predictions'
          description='Footballee provides Football streak martingale strategy, weird match odds, best predictions provider for free, betting, and football live scores for all leagues in the world'
          canonical="https://www.footballee.com"
          openGraph={{
              type: 'website',
              title: 'Home | Footballee',
              url: 'https://www.footballee.com',
              siteName: 'Footballee Homepage | Football Betting with great predictions',
              description: 'Footballee provides Football streak martingale strategy, weird match odds, best predictions provider for free, betting, and football live scores for all leagues in the world',
              images: [
                {
                  url: 'https://www.footballee.com/favicon.ico',
                  alt: 'Footballee logo',
                }
              ],
          }}
        />
        <HomePage />
      </>
  )
}