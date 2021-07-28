import React from 'react';
import { Link } from 'react-router-dom';

function Intro() {
  return (
    <div className='intro'>
      <h1 className='title'>CookBook</h1>
      <h2 className='subtitle'>Store all your recipes</h2>
      <h3 className='quote'>Cooking made easy</h3>
      <Link
        to={{
          pathname: '/auth',
        }}
      >
        <button className='button'>
          <span>Let's start</span>
        </button>
      </Link>
    </div>
  );
}

export default Intro;
