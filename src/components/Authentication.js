import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/Auth';

function Authentication() {
  const { currentUser } = useContext(AuthContext);

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
      </div>
    </div>
  );
}

export default Authentication;
