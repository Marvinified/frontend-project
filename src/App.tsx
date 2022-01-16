import './App.css';

import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import routes from './routes';

const App: React.FC = () => (
  <div className="app">
    <Navbar />
    <Router>
      <Switch>
        {routes.map(({ path, component: Component }) => (
          <Route key={path} exact path={path}>
            <Component />
          </Route>
        ))}
        <Redirect to="/chats" />
      </Switch>
    </Router>
  </div>
);

export default App;
