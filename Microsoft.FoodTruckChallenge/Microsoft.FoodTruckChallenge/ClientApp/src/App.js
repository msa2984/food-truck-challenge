import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import './custom.css'
import SearchFoodTrucks from './components/SearchFoodTrucks';
import Development from './components/Development';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/search-food-trucks' component={SearchFoodTrucks} />
        <Route path='/development' component={Development} />
      </Layout>
    );
  }
}
