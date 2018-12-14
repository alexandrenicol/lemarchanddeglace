import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  List,
  ListItem,
  Card,
  CardContent
} from '@brandwatch/axiom-components';

import Price from '../Price/price';
import Name from '../SweetName/name';

import cone from './images/cone.png';
import chocolateCone from './images/chocolate-cone.png';
import cookies from './images/cookies-and-cream.png';
import doubleChocolate from './images/double-chocolate.png';
import strawberry from './images/strawberry.png';
import saltedCaramel from './images/salted-caramel.png';
import vanilla from './images/vanilla.png';
import mint from './images/mint-chocolate-chip.png';
import tub from './images/tub.png';
import sprinkles from './images/sprinkles.png';
import strawberrySauce from './images/strawberry-sauce.png';
import cherry from './images/cherry.png';
import './ItemList.scss';

const IMAGES = {
  sprinkles,
  cherry,
  cone,
  tub,
  'chocolate-cone': chocolateCone,
  strawberry,
  vanilla,
  'cookies-and-cream': cookies,
  'double-chocolate': doubleChocolate,
  'salted-caramel': saltedCaramel,
  'mint-chocolate-chip': mint,
  'strawberry-sauce': strawberrySauce
};

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = { items: this.props.icecream[this.props.category] };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.items.length !== props.icecream[props.category]) {
      return { items: props.icecream[props.category] };
    }
    return null;
  }

  static numberOfScoopInOrderByName(order, scoopName) {
    return _.filter(order.scoops, { name: scoopName }).length;
  }

  static toppingIsInOrder(order, toppingName) {
    return _.filter(order.toppings, { name: toppingName }).length >= 1;
  }

  static isChoosenContainer(order, containerName) {
    if (order.container && order.container.name === containerName) {
      return true;
    }
    return false;
  }

  render() {
    const maxReached =
      this.props.order.scoops.length >= this.props.order.maxScoops;

    const interactives = item => {
      switch (this.props.category) {
        case 'scoops':
          return (
            <div>
              <span>
                {ItemList.numberOfScoopInOrderByName(
                  this.props.order,
                  item.name
                )}
              </span>
              <button
                type="button"
                className={maxReached ? 'btn no-action' : 'btn is-primary'}
                onClick={() =>
                  this.props.addItemToOrder(this.props.category, item)
                }
              >
                +
              </button>
              <button
                type="button"
                className={
                  ItemList.numberOfScoopInOrderByName(
                    this.props.order,
                    item.name
                  ) > 0
                    ? 'btn is-warning'
                    : 'btn no-action'
                }
                onClick={() =>
                  this.props.removeItemFromOrder(this.props.category, item)
                }
              >
                -
              </button>
            </div>
          );
        case 'containers':
          return ItemList.isChoosenContainer(this.props.order, item.name) ? (
            <button type="button" className="btn no-action">
              Selected
            </button>
          ) : (
            <button
              type="button"
              className="btn is-primary"
              onClick={() =>
                this.props.addItemToOrder(this.props.category, item)
              }
            >
              Choose
            </button>
          );
        case 'toppings':
          return ItemList.toppingIsInOrder(this.props.order, item.name) ? (
            <button
              type="button"
              className="btn is-warning"
              onClick={() =>
                this.props.removeItemFromOrder(this.props.category, item)
              }
            >
              Remove from order
            </button>
          ) : (
            <button
              type="button"
              className="btn is-primary"
              onClick={() =>
                this.props.addItemToOrder(this.props.category, item)
              }
            >
              Add to order
            </button>
          );
        default:
          return false;
      }
    };

    const listItems = this.state.items.map(item => (
      <ListItem key={item.name}>
        <Card border space="x4">
          <CardContent>
            <img className="" src={IMAGES[item.name]} alt={item.name} />
            <p>
              <Name name={item.name} />
            </p>
            <p>
              <Price price={item.price} />
            </p>
            {interactives(item)}
          </CardContent>
        </Card>
      </ListItem>
    ));

    // style="inline"? 
    /* eslint-disable */
    return (
      <section className="container with-title ItemList">
        <h2 className="title">{this.props.category}</h2>
        <List style="inline" className="Items">
          {listItems}
        </List>
        <hr />
      </section>
    );
    /* eslint-enable */
  }
}

ItemList.propTypes = {
  order: PropTypes.shape({
    scoops: PropTypes.array.isRequired,
    container: PropTypes.shape({
      name: PropTypes.string
    }),
    toppings: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    maxScoops: PropTypes.number.isRequired
  }).isRequired,
  category: PropTypes.string.isRequired,
  addItemToOrder: PropTypes.func.isRequired,
  removeItemFromOrder: PropTypes.func.isRequired,
  icecream: PropTypes.shape({
    containers: PropTypes.array.isRequired,
    scoops: PropTypes.array.isRequired,
    toppings: PropTypes.array.isRequired
  }).isRequired
};

export default ItemList;
