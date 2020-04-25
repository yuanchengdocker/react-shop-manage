import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {adminRoutes} from './routes'
import Frame from './components/frame'
import { isLogin } from './utils/auth'

function App() {
  return (isLogin() ?
    <Frame className="App">
     <Switch>
      {adminRoutes.map(route => <Route key={route.path} path={route.path} exact={route.exact} render={
        renderProps => <route.component {...renderProps}/>
      }></Route>)}
      <Redirect to={adminRoutes[0].path} from="/admin"/>
      <Redirect to="/404"></Redirect>
     </Switch>
    </Frame> : <Redirect to="/login"/>
  );
}

export default App;
