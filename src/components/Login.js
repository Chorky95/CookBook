import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import app from '../firebase';
import { AuthContext } from '../context/Auth';

function Login({ history }) {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push('/home');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='login'>
      <h1 className='title'>CookBook</h1>
      <h2 className='subtitle'>Store all your recipes</h2>
      <h3 className='quote'>Cooking made easy</h3>
      <h3 className='login__text'>Log in</h3>
      <form onSubmit={handleLogin} className='form'>
        <label>
          Email:
          <input name='email' type='email' required={true} />
        </label>
        <label>
          Password:
          <input name='password' type='password' required={true} />
        </label>
        <button className='button' type='submit'>
          <span>Log in</span>
        </button>
      </form>
    </div>
  );
}

export default withRouter(Login);
