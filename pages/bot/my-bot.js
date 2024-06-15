import MyBotData from "../../components/content/my-bot-data";
import { NextSeo } from 'next-seo';

function MyBot() {
  return (
    <div>
        <NextSeo
          title='Footballee | My Martingale Bot Streaks'
          description='Footballee Martingale Bot Streaks | my own martingale bot tips and predictions, free analysis and statistics'
          canonical='https://www.footballee.com/bot/my-bot'
          openGraph={{
              type: 'website',
              title: 'Footballee | My Martingale Bot Streaks',
              url: 'https://www.footballee.com/bot/my-bot',
              siteName: 'Footballee | My Martingale Bot Streaks',
              description: 'Footballee My Martingale Bot Streaks | my own martingale bot tips and predictions, free analysis and statistics',
              images: [
                {
                  url: 'https://www.footballee.com/favicon.ico',
                  alt: 'Footballee logo',
                }
              ],
          }}
        />
        <MyBotData />
    </div>
  );
}

export default MyBot;