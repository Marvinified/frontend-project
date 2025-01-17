import './App.css';

import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import ErrorDisplay from './containers/ErrorDisplay';
import routes from './routes';
import ChatProvider from './state/chat/provider';

const App: React.FC = () => (
  <div className="app-container">
    <Router>
      <ChatProvider>
        <Navbar />
        <ErrorDisplay />
        <Switch>
          {routes.map(({ path, component: Component }) => (
            <Route key={path} exact path={path}>
              <Component />
            </Route>
          ))}
          <Redirect to="/chats" />
        </Switch>
      </ChatProvider>
    </Router>
  </div>
);

export default App;
