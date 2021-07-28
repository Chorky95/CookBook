import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/Auth';
import app from '../firebase';
import firebase from '@firebase/app';
import 'firebase/firestore';
import { withRouter, Link, useParams } from 'react-router-dom';

function View({ history }) {
  const [data, setData] = useState([]);
  const db = firebase.firestore(app);
  const user = useContext(AuthContext);

  const userName = user.currentUser.displayName;
  const userID = user.currentUser.uid;

  const { urlID } = useParams();

  const loadRecipe = () => {
    const docRef = db
      .collection('users')
      .doc(`${userID}`)
      .collection('recipes');

    docRef
      .where('id', '==', urlID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setData(doc.data());
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  };

  useEffect(() => {
    loadRecipe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(data);

  const deleteRecipe = () => {
    const docRef = db
      .collection('users')
      .doc(`${userID}`)
      .collection('recipes')
      .doc(`${data.name}`);
    const answer = window.confirm(
      'This recipe will be permanently deleted. Are you sure?'
    );
    if (answer) {
      docRef
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
          history.push('/home');
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    }
  };

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
      <div className='view'>
        <div className='view__container'>
          <div className='view__container__header'>
            <Link
              to={{
                pathname: '/home',
              }}
            >
              <button className='button back'>
                <svg
                  width='28'
                  height='41'
                  viewBox='0 0 28 41'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M27.77 35.9317L10.04 20.5L27.77 5.06837L23 0.916706L0.500019 20.5L23 40.0834L27.77 35.9317Z'
                    fill='black'
                  />
                </svg>
              </button>
            </Link>
            <Link
              to={{
                pathname: `/${urlID}/edit`,
              }}
            >
              <button className='button edit'>
                <svg
                  width='32'
                  height='38'
                  viewBox='0 0 32 38'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M18.1715 6.94162L26.1725 16.3066L8.79857 36.6421L1.66501 37.5638C0.710035 37.6875 -0.0968187 36.7423 0.00942853 35.6246L0.803158 27.2691L18.1715 6.94162ZM31.1211 5.54734L27.3643 1.15016C26.1925 -0.221441 24.2919 -0.221441 23.1201 1.15016L19.5858 5.28692L27.5868 14.6519L31.1211 10.5151C32.293 9.14276 32.293 6.91894 31.1211 5.54734Z'
                    fill='black'
                  />
                </svg>
              </button>
            </Link>
            <button
              className='button delete'
              onClick={() => deleteRecipe()}
            >
              <svg
                width='32'
                height='36'
                viewBox='0 0 32 36'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M2.28571 32.2642C2.28571 33.1422 2.64694 33.9843 3.28992 34.6052C3.9329 35.226 4.80497 35.5748 5.71429 35.5748H26.2857C27.195 35.5748 28.0671 35.226 28.7101 34.6052C29.3531 33.9843 29.7143 33.1422 29.7143 32.2642V9.09H2.28571V32.2642ZM21.7143 14.6077C21.7143 14.315 21.8347 14.0343 22.049 13.8274C22.2633 13.6204 22.554 13.5041 22.8571 13.5041C23.1602 13.5041 23.4509 13.6204 23.6653 13.8274C23.8796 14.0343 24 14.315 24 14.6077V30.0571C24 30.3498 23.8796 30.6305 23.6653 30.8375C23.4509 31.0444 23.1602 31.1607 22.8571 31.1607C22.554 31.1607 22.2633 31.0444 22.049 30.8375C21.8347 30.6305 21.7143 30.3498 21.7143 30.0571V14.6077ZM14.8571 14.6077C14.8571 14.315 14.9776 14.0343 15.1919 13.8274C15.4062 13.6204 15.6969 13.5041 16 13.5041C16.3031 13.5041 16.5938 13.6204 16.8081 13.8274C17.0224 14.0343 17.1429 14.315 17.1429 14.6077V30.0571C17.1429 30.3498 17.0224 30.6305 16.8081 30.8375C16.5938 31.0444 16.3031 31.1607 16 31.1607C15.6969 31.1607 15.4062 31.0444 15.1919 30.8375C14.9776 30.6305 14.8571 30.3498 14.8571 30.0571V14.6077ZM8 14.6077C8 14.315 8.12041 14.0343 8.33474 13.8274C8.54906 13.6204 8.83975 13.5041 9.14286 13.5041C9.44596 13.5041 9.73665 13.6204 9.95098 13.8274C10.1653 14.0343 10.2857 14.315 10.2857 14.6077V30.0571C10.2857 30.3498 10.1653 30.6305 9.95098 30.8375C9.73665 31.0444 9.44596 31.1607 9.14286 31.1607C8.83975 31.1607 8.54906 31.0444 8.33474 30.8375C8.12041 30.6305 8 30.3498 8 30.0571V14.6077ZM30.8571 2.4688H22.2857L21.6143 1.17904C21.4721 0.903307 21.253 0.671364 20.9817 0.509308C20.7104 0.347251 20.3976 0.26151 20.0786 0.261731H11.9143C11.596 0.260549 11.2838 0.34597 11.0134 0.508208C10.7431 0.670445 10.5255 0.902935 10.3857 1.17904L9.71429 2.4688H1.14286C0.839753 2.4688 0.549062 2.58506 0.334735 2.79202C0.120408 2.99897 0 3.27966 0 3.57233L0 5.7794C0 6.07207 0.120408 6.35276 0.334735 6.55971C0.549062 6.76667 0.839753 6.88293 1.14286 6.88293H30.8571C31.1602 6.88293 31.4509 6.76667 31.6653 6.55971C31.8796 6.35276 32 6.07207 32 5.7794V3.57233C32 3.27966 31.8796 2.99897 31.6653 2.79202C31.4509 2.58506 31.1602 2.4688 30.8571 2.4688Z'
                  fill='black'
                />
              </svg>
            </button>
          </div>
          <img
            className='view__container__img'
            alt={data.name}
            src={data.image}
          />
          <h1 className='view__container__title'>{data.name}</h1>
          <h4 className='view__container__shortDesc'>
            {data.shortDesc}
          </h4>
          <h3 className='view__container__label'>Ingredients</h3>
          <div className='view__container__ingredients'>
            {data.ingredients ? (
              Object.keys(data.ingredients).map((ingredient, i) => {
                return (
                  <div
                    className='view__container__ingredients__ingredient'
                    key={i}
                  >
                    <h3>
                      {ingredient} - {data.ingredients[ingredient]}
                    </h3>
                  </div>
                );
              })
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
          <p className='view__container__time'>
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
            {data.prepTime > 1
              ? `${data.prepTime} minutes`
              : '1 minute'}
          </p>
          <p className='view__container__people'>
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
            {data.servings > 1
              ? `${data.servings} people`
              : '1 person'}
          </p>
          <h3 className='view__container__label'>Instructions</h3>
          <div className='view__container__instructions'>
            <p>{data.instructions}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(View);
