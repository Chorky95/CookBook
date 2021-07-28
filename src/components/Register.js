import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import app from '../firebase';
import { AuthContext } from '../context/Auth';

function Register({ history }) {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then(function (result) {
            return result.user.updateProfile({
              displayName: document.getElementById('name').value,
            });
          });
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
    <div className='register'>
      <h1 className='title'>CookBook</h1>
      <h2 className='subtitle'>Store all your recipes</h2>
      <h3 className='quote'>Cooking made easy</h3>
      <h3 className='register__text'>Register</h3>
      <form onSubmit={handleSignUp} className='form'>
        <label>
          First name:
          <input name='Name' type='name' id='name' required={true} />
        </label>
        <label>
          Email:
          <input name='email' type='email' required={true} />
        </label>
        <label>
          Password:
          <input name='password' type='password' required={true} />
        </label>
        <button className='button' type='submit'>
          <span>Register</span>
        </button>
      </form>
    </div>
  );
}

export default withRouter(Register);
