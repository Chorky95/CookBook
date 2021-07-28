import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/Auth';
import app from '../firebase';
import firebase from '@firebase/app';
import 'firebase/firestore';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  const db = firebase.firestore(app);
  const user = useContext(AuthContext);

  const userName = user.currentUser.displayName;
  const userID = user.currentUser.uid;

  const getData = () => {
    const docRef = db
      .collection('users')
      .doc(`${userID}`)
      .collection('recipes');
    docRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const add = [];
        add.push(doc.data());
        setData((data) => [...data, add]);
      });
    });
  };

  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <header className='header'>
        <h1 className='logo'>CookBook</h1>
        <h1 className='greeting'>Hi, {userName}</h1>
        <button
          className='button logoutButton'
          onClick={() => app.auth().signOut()}
        >
          <span>Log out</span>
        </button>
      </header>
      <div className='home'>
        <h1 className='home__title'>Browse your recipes</h1>
        <h2 className='home__subtitle'>
          Click on one to view or edit
        </h2>
        <Link
          to={{
            pathname: '/add',
          }}
        >
          <button className='button'>
            <span>Add new</span>
          </button>
        </Link>

        <div className='recipes'>
          {data ? (
            data.map((recipe) => {
              return (
                <div className='recipes__item' key={recipe[0].id}>
                  <Link
                    to={{
                      pathname: recipe[0].id,
                    }}
                  >
                    <img
                      alt={recipe[0].name}
                      className='recipes__item__img'
                      src={recipe[0].image}
                    ></img>
                    <h3 className='recipes__item__name'>
                      {recipe[0].name}
                    </h3>
                    <h5 className='recipes__item__description'>
                      {recipe[0].shortDesc}
                    </h5>
                    <p className='recipes__item__time'>
                      <svg
                        width='15'
                        height='15'
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M10 0C4.48918 0 0 4.48918 0 10C0 15.5108 4.48918 20 10 20C15.5108 20 20 15.5108 20 10C20 4.48918 15.5108 0 10 0ZM10 1.53846C14.6815 1.53846 18.4615 5.31851 18.4615 10C18.4615 14.6815 14.6815 18.4615 10 18.4615C5.31851 18.4615 1.53846 14.6815 1.53846 10C1.53846 5.31851 5.31851 1.53846 10 1.53846ZM9.23077 3.07692V10.7692H13.8462V9.23077H10.7692V3.07692H9.23077Z'
                          fill='#1C0F13'
                        />
                      </svg>{' '}
                      {recipe[0].prepTime > 1
                        ? `${recipe[0].prepTime} minutes`
                        : '1 minute'}
                    </p>
                    <p className='recipes__item__people'>
                      <svg
                        width='18'
                        height='18'
                        viewBox='0 0 25 25'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M10.7143 0C8.34202 0 6.1428 0.902316 4.36663 2.4292H4.36314C1.71695 4.70543 0 8.37559 0 12.5C0 19.3919 4.8069 25 10.7143 25C14.4372 25 17.7218 22.7693 19.6429 19.397V25H21.4286V12.443C23.4717 11.9434 25 9.759 25 7.19401C25 5.7313 24.5569 4.09843 23.8246 2.70589C23.0924 1.31336 22.007 0.0528971 20.5392 0.0528971C19.0966 0.0528971 18.0245 1.27302 17.2921 2.63672C15.4753 0.985632 13.1895 0 10.7143 0ZM10.7143 2.08333C12.9303 2.08333 14.9297 3.04673 16.49 4.60205C16.2292 5.47141 16.0721 6.35934 16.0714 7.19401C16.0695 9.75858 17.6019 11.9395 19.6429 12.443V12.5C19.6429 18.2664 15.6569 22.9167 10.7143 22.9167C5.77167 22.9167 1.78571 18.2664 1.78571 12.5C1.78571 9.04941 3.21603 6.0044 5.42341 4.10563C6.90438 2.83252 8.72941 2.08333 10.7143 2.08333ZM20.5392 2.13623C21.0464 2.13623 21.7417 2.73371 22.3005 3.79639C22.8593 4.85906 23.2143 6.27338 23.2143 7.19401C23.2143 9.03405 22.0086 10.4711 20.5357 10.4696C19.0609 10.468 17.8558 9.03702 17.8571 7.19808C17.8578 6.27728 18.2115 4.85922 18.7709 3.79639C19.3304 2.73355 20.032 2.13623 20.5392 2.13623ZM9.84584 4.23584C9.79555 4.23633 9.74538 4.24177 9.69587 4.25212C8.50499 4.45196 7.40486 4.99074 6.48019 5.78613C4.71632 7.30395 3.57143 9.75286 3.57143 12.5C3.57143 17.09 6.77997 20.8333 10.7143 20.8333C12.7069 20.8333 14.5214 19.8755 15.8168 18.3309C15.9012 18.2337 15.968 18.1179 16.0136 17.9902C16.0592 17.8625 16.0825 17.7255 16.0822 17.5872C16.0819 17.4489 16.058 17.3121 16.0119 17.1846C15.9658 17.0572 15.8984 16.9418 15.8136 16.8451C15.7289 16.7484 15.6285 16.6723 15.5183 16.6214C15.4081 16.5704 15.2903 16.5456 15.1717 16.5483C15.0532 16.551 14.9363 16.5812 14.8279 16.6371C14.7195 16.6931 14.6218 16.7737 14.5403 16.8742C13.5678 18.0338 12.2181 18.75 10.7143 18.75C7.74503 18.75 5.35714 15.9641 5.35714 12.5C5.35714 10.4263 6.21504 8.60309 7.54046 7.46256C8.23364 6.86629 9.05215 6.46119 9.94699 6.31103C10.1713 6.27787 10.3765 6.14664 10.5211 5.94384C10.6658 5.74104 10.7391 5.48178 10.7262 5.21839C10.7134 4.955 10.6154 4.7071 10.452 4.52473C10.2886 4.34237 10.072 4.23912 9.84584 4.23584Z'
                          fill='#1C0F13'
                        />
                      </svg>{' '}
                      {recipe[0].servings > 1
                        ? `${recipe[0].servings} people`
                        : '1 person'}
                    </p>{' '}
                  </Link>
                </div>
              );
            })
          ) : (
            <h2 className='home__subtitle'>
              You currently don't have any saved recipes.
            </h2>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
