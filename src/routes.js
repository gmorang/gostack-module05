import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Repository from './pages/repository';
import Main from './pages/main';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route exact path="/repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
