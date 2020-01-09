
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Admin from './pages/admin/admin'
import Login from './pages/login/login'
import { hot } from 'react-hot-loader';
import './assets/css/reset.css'
import Project from './pages/project/project'
import Version from './pages/version/version'
import ErrorDetail from './pages/error/error'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/product/project/version/:versionId" component={ErrorDetail} />
          <Route path="/product/project/:projectId" component={Version} />
          <Route path="/product/:productId" component={Project} />
          <Route path="/" component={Admin} />
        </Switch>
      </BrowserRouter>
    )
  }
}
export default hot(module)(App);