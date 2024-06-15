import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../styles/globals.css";
import { NextUIProvider } from '@nextui-org/react';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Navigationbar from "../components/header/Navigationbar";
import { wrapper } from '../app/store';
import { Provider } from 'react-redux';
import App from '../components/App';
import Footer from "../components/content/Footer";
import {DefaultSeo} from 'next-seo';

// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <App {...pageProps} />
      <Navigationbar/>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
      <Footer/>
    </Provider>
  );
}

export default MyApp;