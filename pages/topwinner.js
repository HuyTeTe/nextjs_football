import React from 'react'
import { NextSeo } from 'next-seo';

function topwinner() {
  return (
    <div style={{marginTop:'120px',marginBottom:'320px',textAlign:'center',fontSize:'1.5rem'}}>
        <NextSeo
          title='Top Winner | Footballee'
          description='Footballee | View Top Winner and their history games, streaks'
          canonical='https://www.footballee.com/topwinner'
          openGraph={{
              type: 'website',
              title: 'Top Winner | Footballee',
              url: 'https://www.footballee.com/topwinner',
              siteName: 'Top Winner | Footballee',
              description: 'Footballee | View Top Winner and their history games, streaks',
              images: [
                {
                  url: 'https://www.footballee.com/favicon.ico',
                  alt: 'Footballee logo',
                }
              ],
          }}
        />
        This feature is in the develop process and will be released as soon as possible!
    </div>
  )
}

export default topwinner