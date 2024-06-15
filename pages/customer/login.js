import { connect } from 'react-redux';
import {signInAPI} from '../../actions';
import styles from "../../styles/customer/login.module.scss";
import { useRouter } from 'next/router';
import { NOT_LOGIN } from "../../actions/actionType";
import { NextSeo } from 'next-seo';

const Login = (props) => {
  const user = props.user;
  const router = useRouter();

  if (user == NOT_LOGIN) {
    return (
      <>
        <NextSeo
          title='Footballee | Sign-In'
          description='Footballee | sign in'
          canonical="https://www.footballee.com/customer/login"
          openGraph={{
              type: 'website',
              title: 'Footballee | sign in',
              url: 'https://www.footballee.com/customer/login',
              siteName: 'Footballee | Sign-In',
              description: 'Footballee | sign in',
              images: [
                {
                  url: 'https://www.footballee.com/favicon.ico',
                  alt: 'Footballee logo',
                }
              ],
          }}
        />
        <div className={styles["login-form"]}>
          <h1>Login with</h1>
          <div className={styles["img-login"]} onClick={() => props.signIn()} >
            <img src="/images/google.svg" />
          </div>
        </div>
      </>
    )
  } else if (user != NOT_LOGIN && user != null) {
    router.push("/");
  } else {
    return (
      <>
        <NextSeo
          title='Footballee | Sign-In'
          description='Footballee | sign in'
          canonical="https://www.footballee.com/customer/login"
          openGraph={{
              type: 'website',
              title: 'Footballee | sign in',
              url: 'https://www.footballee.com/customer/login',
              siteName: 'Footballee | Sign-In',
              description: 'Footballee | sign in',
              images: [
                {
                  url: 'https://www.footballee.com/favicon.ico',
                  alt: 'Footballee logo',
                }
              ],
          }}
        />
        <div className={styles["login-form"]}>
          <h1>Login with</h1>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.userState.user };
}

const mapDispatchToProps = (dispatch) => ({
  signIn: () => dispatch(signInAPI()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);