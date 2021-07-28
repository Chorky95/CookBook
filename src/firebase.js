import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyDww-ssxOXePUH1U3otZIOhCduTKwGuqK4',
  authDomain: 'cookbook-ad08e.firebaseapp.com',
  projectId: 'cookbook-ad08e',
  storageBucket: 'cookbook-ad08e.appspot.com',
  messagingSenderId: '174416153307',
  appId: '1:174416153307:web:b7d51a39a604fa09851afe',
  measurementId: 'G-K7X1WXT3L1',
});
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default app;
