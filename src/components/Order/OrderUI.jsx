import React, { Component } from 'react';

class Order extends Component {
  render() {
    console.log('inside render order', this.props.order);

    const listScoops = this.props.order.scoops.map(item => (
      <li key={item.name}>{item.name}</li>
    ));
    const listToppings = this.props.order.toppings.map(item => (
      <li key={item.name}>{item.name}</li>
    ));

    return (
      <section className="container with-title">
        <h2 className="title">{this.props.category}</h2>
        <div className="items">
          {this.props.order.container
            ? `Container: ${this.props.order.container.name}`
            : ''}
          <br />
          <ul>{listScoops}</ul>
          <ul>{listToppings}</ul>
          {`Total: £${this.props.order.total}`}
          <button type="button" className="btn is-success" onClick={() => {}}>
            Submit your order
          </button>
        </div>
      </section>
    );
  }
}

export default Order;
