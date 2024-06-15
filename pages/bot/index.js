import AllBot from '../../components/content/all-bot';
import { NextSeo } from 'next-seo';

function Bot() {
  return (
    <div>
        <NextSeo
          title='Footballee | Martingale Bot Streaks'
          description='Footballee Martingale Bot Streaks | free football martingale bot tips and predictions, free analysis and statistics'
          canonical="https://www.footballee.com/bot"
          openGraph={{
              type: 'website',
              title: 'Footballee | Martingale Bot Streaks',
              url: 'https://www.footballee.com/bot',
              siteName: 'Footballee | Martingale Bot Streaks',
              description: 'Footballee Martingale Bot Streaks | free football martingale bot tips and predictions, free analysis and statistics',
              images: [
                {
                  url: 'https://www.footballee.com/favicon.ico',
                  alt: 'Footballee logo',
                }
              ],
          }}
        />
        <AllBot />
    </div>
  );
}

export default Bot;