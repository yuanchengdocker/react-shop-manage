import React, {useState} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {adminRoutes} from './routes'
import Frame from './components/frame'
import { isLogin } from './utils/auth'
import GlobleContext from './GlobleContext'

const { Provider } = GlobleContext

function App() {
  const [theme, setTheme] = useState('black')
  
  const changeTheme = () => {
    // 测试git stash
    setTheme(theme === 'black' ? 'white' : 'black')
  }

  return (isLogin() ?
    <Frame className="App" changeTheme={changeTheme}>
      <Provider value={theme}>
        <Switch>
          {adminRoutes.map(route => <Route key={route.path} path={route.path} exact={route.exact} render={
            renderProps => <route.component {...renderProps}/>
          }></Route>)}
          <Redirect to={adminRoutes[0].path} from="/admin"/>
          <Redirect to="/404"></Redirect>
        </Switch>
     </Provider>
    </Frame> : <Redirect to="/login"/>
  );
}

export default App;
