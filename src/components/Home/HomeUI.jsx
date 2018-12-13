import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, GridCell } from '@brandwatch/axiom-components';

import './Home.scss';

import ItemList from '../ItemList/ItemList';
import Order from '../Order/Order';

class Home extends Component {
  componentDidMount() {
    this.props.loadData();
  }

  render() {
    // console.log('inside render', this.props.icecream);
    return (
      <div className="App">
        <Grid>
          <GridCell>
            <ItemList category="containers" />
            <ItemList category="scoops" />
            <ItemList category="toppings" />
            <Order />
          </GridCell>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  loadData: PropTypes.func.isRequired
}

export default Home;
