import React, { Component } from 'react';
import _ from 'lodash';

import {
  List,
  ListItem,
  Card,
  CardContent
} from '@brandwatch/axiom-components';

class ItemList extends Component {
  constructor(props) {
    super(props);
    console.log('constructor');
    this.state = { items: this.props.icecream[this.props.category] };
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps', props, state);
    if (state.items.length !== props.icecream[props.category]) {
      return { items: props.icecream[props.category] };
    }
    return null;
  }

  static numberOfScoopInOrderByName(order, scoopName) {
    // console.log(order, scoopName, _.countBy(order.scoops, scoopName));
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
    console.log('inside render item list', this.state.items);

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
                className="btn is-primary"
                onClick={() =>
                  this.props.addItemToOrder(this.props.category, item)
                }
              >
                +
              </button>
              <button
                type="button"
                className="btn is-warning"
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
            <button type="button" className="btn">
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
            <p>{item.name}</p>
            <p>{`£${item.price}`}</p>
            {interactives(item)}
          </CardContent>
        </Card>
      </ListItem>
    ));

    return (
      <section className="container with-title">
        <h2 className="title">{this.props.category}</h2>
        <List style="inline" className="Items">
          {listItems}
        </List>
        <hr />
      </section>
    );
  }
}

export default ItemList;
