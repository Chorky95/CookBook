import React from 'react';
import {
  Route,
  Switch,
  useLocation,
  Redirect,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';

import Intro from './components/Intro';
import Authentication from './components/Authentication';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import View from './components/View';
import Edit from './components/Edit';

import './main.css';
import Add from './components/Add';

function App() {
  const location = useLocation();
  const nodeRef = React.useRef(null);

  return (
    <TransitionGroup>
      <CSSTransition
        nodeRef={nodeRef}
        timeout={300}
        classNames='fade'
        key={location.key}
      >
        <div className='App' ref={nodeRef}>
          <Switch location={location}>
            <Route exact path='/'>
              <Intro />
            </Route>
            <Route exact path='/auth'>
              <Authentication />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/register'>
              <Register />
            </Route>
            <PrivateRoute exact path='/home' comp={Home} />
            <PrivateRoute exact path='/add' comp={Add} />
            <PrivateRoute exact path='/:urlID' comp={View} />
            <PrivateRoute exact path='/:urlID/edit' comp={Edit} />
            <Route path='*'>
              <Redirect to='/home' />
            </Route>
          </Switch>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
