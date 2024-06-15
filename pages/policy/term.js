import React from 'react'
import styles from "../../styles/footer.module.scss";
import { NextSeo } from 'next-seo';

function term() {
  return (
    <div className={styles["term-content"]}>
        <NextSeo
          title='Terms of Service | Footballee'
          description='Footballee terms of service.'
          canonical='https://www.footballee.com/policy/term'
          openGraph={{
              type: 'website',
              title: 'Terms of Service | Footballee',
              url: 'https://www.footballee.com/policy/term',
              siteName: 'Terms of Service | Footballee',
              description: 'Footballee terms of service.',
              images: [
                {
                  url: 'https://www.footballee.com/favicon.ico',
                  alt: 'Footballee logo',
                }
              ],
          }}
        />
        <h2 className='text-center m-5'>Terms of Service</h2>
        <p className={styles["text-indent"]}>1. By using or accessing Footballee, you agree that you have read, 
        understand and are bound by these Terms of Service. We reserve the right, at our sole discretion, 
        to change or delete portions of these Terms at any time without further notice.
        Your continued use of Footballee after any such changes constitutes your acceptance of the new Terms. <br/></p>

        <p className={styles["text-indent"]}>2. Footballee was founded with the following rules:<br/></p>

        <p className={styles["text-indent"]}>- Analyze data for martingale streak data<br/></p>

        <p className={styles["text-indent"]}>- Livescore<br/></p>

        <p className={styles["text-indent"]}>- Serve customer for creating their own data<br/></p>

        <p className={styles["text-indent"]}>3. Footballee.com is a website specializing in providing information and streaks bot for prediction 
        (hereinafter referred to as “Information”) to users from hundreds of countries. Users are required to comply with the laws 
        and regulations in their countries and regions.<br/></p>
        <p className={styles["text-indent"]}>4. Here, we would like to clearly state: Footballee.com is not a gambling or gaming website.<br/></p>

        <p className={styles["text-indent"]}>5. All information we provide is for reference only, any individual or organization 
        cannot use or promote Footballee website information in countries and areas where online gambling and gaming is prohibited.<br/></p>

        <p className={styles["text-indent"]}>6. You can seek advice and consultation from legal experts if you have any questions about 
        the calculation of the content of the Footballee website in your region or country.<br/></p>

        <p className={styles["text-indent"]}>7. We will not accept any responsibility due to your illegal use of Footballee website information in your country or region. 
        We will not accept complaints or complaints from individuals or organizations that access or use Footballee web information.<br/></p>

        <p className={styles["text-indent"]}>8. We will try our best to update all information provided at Footballee.com to be truthful, 
        accurate and accurate, but still cannot guarantee 100% accuracy. 
        We will not accept any comments or complaints from individuals or organizations for the purpose of taking advantage of and using the information provided.<br/></p>

        <p className={styles["text-indent"]}>9. Hong Kong and China:
        Here, we officially inform all the public in Hong Kong and China: Except for cases where business is permitted by the government, 
        all remaining online gambling activities are illegal. We prohibit everyone from Hong Kong and China from accessing Footballee.com.<br/></p>

        <p className={styles["text-indent"]}>10. Advertising and Hyperlinks Our Clients
    We accept customers from around the world to post ads on the Footballee website in accordance with the law. To ensure reasonableness, we have carried out a serious 
    settlement verification for customers. However, we cannot guarantee fair advertising targeting or users equally across all edges.<br/></p>

        <p className={styles["text-indent"]}>11. We believe it is a parents responsibility to ensure that their minor children do not obtain access to any adult content on this site.
         The creator and moderators of Footballee do not take legal responsibility for anything that happens on or off Footballee.<br/></p>
    </div>
  )
}

export default term