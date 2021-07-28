import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/Auth';
import app from '../firebase';
import firebase from '@firebase/app';
import 'firebase/firestore';
import { withRouter, Link } from 'react-router-dom';

function Add({ history }) {
  const db = firebase.firestore(app);
  const user = useContext(AuthContext);
  const userName = user.currentUser.displayName;
  const userID = user.currentUser.uid;
  const docRef = db
    .collection('users')
    .doc(`${userID}`)
    .collection('recipes');
  let [ingredientCounter, setIngredientCounter] = useState(1);

  const addIngredient = () => {
    const container = document.getElementById('ingredients');
    container.insertAdjacentHTML(
      'beforeend',
      `<div class='ingredients__form'>
      <label class='ingredients__form__ingredient'>
                Ingredient:
                <input 
                  class='ingredient'
                  name='ingredient'
                  type='text'
                  required
                  id='ingredient${ingredientCounter}'
                />
              </label>
              <label class='ingredients__form__amount'>
                Quantity:
                <input
                  class='amountIngredient'
                  name='amount'
                  type='number'
                  required
                  id='amountIngredient${ingredientCounter}'
                />
              </label>
              </div>`
    );
    setIngredientCounter(ingredientCounter + 1);
  };

  const removeIngredient = () => {
    const container = document.getElementById('ingredients');
    if (ingredientCounter > 1) {
      container.removeChild(container.lastElementChild);
      setIngredientCounter(ingredientCounter - 1);
    }
  };

  const addRecipe = () => {
    const foodName = document.getElementById('foodName').value;
    const shortDesc = document.getElementById('shortDesc').value;
    const prepTime = parseFloat(
      document.getElementById('prepTime').value
    );
    const servings = parseFloat(
      document.getElementById('servings').value
    );

    //ingredients
    const ingredientsForm =
      document.getElementsByClassName(`ingredient`);
    const arrName = Array.from(ingredientsForm);
    const ingredientNames = [];
    arrName.forEach((element) => ingredientNames.push(element.value));
    const amountsForm = document.getElementsByClassName(
      'amountIngredient'
    );
    const arrAmount = Array.from(amountsForm);
    const amounts = [];
    arrAmount.forEach((element) => amounts.push(element.value));
    const ingredients = {};
    for (var i = 0; i < ingredientNames.length; i++) {
      ingredients[ingredientNames[i]] = parseFloat(amounts[i]);
    }

    const instructions =
      document.getElementById('instructions').value;
    const image = document.getElementById('image').value;
    const id = new Date().getTime().toString();

    docRef
      .doc(`${foodName}`)
      .set({
        id: id,
        name: foodName,
        shortDesc: shortDesc,
        prepTime: prepTime,
        servings: servings,
        ingredients: ingredients,
        instructions: instructions,
        image: image,
      })
      .then(() => {
        console.log('Document successfully written!');
        history.push('/home');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
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
      <div className='add'>
        <h1 className='add__title'>Add a new recipe</h1>
        <p>or</p>
        <Link
          to={{
            pathname: '/home',
          }}
        >
          <button className='button' type='button'>
            <span>Go back</span>
          </button>
        </Link>
        <h2 className='add__subtitle'>
          Enter data below, and click the button to save your recipe
        </h2>
        <div className='add__recipe'>
          <form className='add__recipe__form'>
            <label className='name'>
              Food name:
              <input
                name='foodName'
                type='text'
                id='foodName'
                required={true}
              />
            </label>
            <label className='shortDesc'>
              Short description:
              <input
                name='shortDesc'
                type='text'
                id='shortDesc'
                required={true}
              />
            </label>
            <label className='prepTime'>
              Preparation time (in minutes):
              <input
                name='prepTime'
                type='number'
                id='prepTime'
                required={true}
              />
            </label>
            <label className='servings'>
              Number of servings:
              <input
                name='servings'
                type='number'
                id='servings'
                required={true}
              />
            </label>
            <div className='ingredients' id='ingredients'>
              <div className='ingredients__form'>
                <label className='ingredients__form__ingredient'>
                  Ingredient:
                  <input
                    className='ingredient'
                    name='ingredient'
                    type='text'
                    id='ingredient0'
                    required={true}
                  />
                </label>
                <label className='ingredients__form__amount'>
                  Quantity:
                  <input
                    className='amountIngredient'
                    name='amount'
                    type='number'
                    id='amountIngredient0'
                    required={true}
                  />
                </label>
              </div>
            </div>
            <div className='ingredientButtons'>
              <button
                className='button ingredientButton'
                type='button'
                onClick={() => removeIngredient()}
              >
                -
              </button>
              <button
                className='button ingredientButton'
                type='button'
                onClick={() => addIngredient()}
              >
                +
              </button>
            </div>
            <div>
              <label className='instructions'>
                Instructions:
                <textarea
                  name='instructions'
                  type='text'
                  id='instructions'
                  required={true}
                  rows={50}
                  cols={50}
                ></textarea>
              </label>
            </div>
            <label className='image'>
              Display it with a picture (paste an image url here):
              <input
                name='image'
                type='text'
                id='image'
                required={true}
              />
            </label>

            <button
              className='button'
              type='button'
              onClick={() => addRecipe()}
            >
              <span>Save</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default withRouter(Add);
