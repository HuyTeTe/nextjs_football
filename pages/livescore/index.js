import LiveScoreContent from '../../components/content/live-score';
import { NextSeo } from 'next-seo';

function LiveScore() {
  return (
    <div>
        <NextSeo
          title='Livescore | Footballee'
          description='Get Live Football Scores and Real-Time Football Results with Footballee! We cover all Countries, Leagues and Competitions in unbeatable detail. Click Now!'
          canonical='https://www.footballee.com/livescore'
          openGraph={{
              type: 'website',
              title: 'Livescore | Footballee',
              url: 'https://www.footballee.com/livescore',
              siteName: 'Livescore | Footballee',
              images: [
                {
                  url: 'https://www.footballee.com/favicon.ico',
                  alt: 'Footballee logo',
                }
              ],
              description: 'Get Live Football Scores and Real-Time Football Results with Footballee! We cover all Countries, Leagues and Competitions in unbeatable detail. Click Now!',
          }}
        />
        <LiveScoreContent />
    </div>
  );
}

export default LiveScore;