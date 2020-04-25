import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './index.css';
import { mainRoutes } from './routes'
import {Provider} from 'react-redux'
import store from './store'
import App from './App'
import './App.css'
import 'antd/dist/antd.css'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/admin" render={routeProps => <App {...routeProps} />} />
          {mainRoutes.map(route => <Route key={route.path} {...route}/>)}
          <Redirect to="/admin" from="/"/>
          <Redirect to="/404"/>
        </Switch>
      </Suspense>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
