import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Middleware from './middleware';
import { Spinner } from 'components';

const Dashboard = React.lazy(() => import('./pages/notes'));
const Archives = React.lazy(() => import('./pages/archives'));

const routes = [
  {
    path: '/',
    component: Dashboard,
    isExact: false,
  },
  {
    path: 'archives',
    component: Archives,
    isExact: false,
  },
];

const Routes = () => (
  <Router>
    <Suspense fallback={<Spinner size={40} />}>
      <Switch>
        <Middleware>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={route.isExact}
              path={`/${route.path}`}
              component={route.component}
            />
          ))}
        </Middleware>
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
