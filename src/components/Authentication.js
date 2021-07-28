import React, { useContext } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/Auth';

import firebase from '@firebase/app';

function Authentication({ history }) {
  const { currentUser } = useContext(AuthContext);

  const handleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        history.push('/home');
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (currentUser) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='auth'>
      <h1 className='title'>CookBook</h1>
      <h2 className='subtitle'>Store all your recipes</h2>
      <h3 className='quote'>Cooking made easy</h3>
      <div className='buttons'>
        <Link
          to={{
            pathname: '/login',
          }}
        >
          <button className='button'>
            <span>Log in</span>
          </button>
        </Link>
        <p>or</p>
        <Link
          to={{
            pathname: '/register',
          }}
        >
          <button className='button'>
            <span>Register</span>
          </button>
        </Link>
        <p>or</p>
        <button className='button' onClick={() => handleLogin()}>
          <span>
            <svg
              width='24'
              height='25'
              viewBox='0 0 24 25'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M23.8281 12.3926C23.8281 19.3018 19.0967 24.2188 12.1094 24.2188C5.41016 24.2188 0 18.8086 0 12.1094C0 5.41016 5.41016 0 12.1094 0C15.3711 0 18.1152 1.19629 20.2295 3.16895L16.9336 6.33789C12.6221 2.17773 4.60449 5.30273 4.60449 12.1094C4.60449 16.333 7.97852 19.7559 12.1094 19.7559C16.9043 19.7559 18.7012 16.3184 18.9844 14.5361H12.1094V10.3711H23.6377C23.75 10.9912 23.8281 11.5869 23.8281 12.3926Z'
                fill='white'
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

export default withRouter(Authentication);
