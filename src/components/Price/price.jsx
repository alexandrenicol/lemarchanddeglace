import React from 'react';
import PropTypes from 'prop-types';

const Price = ({ price, showZero }) => <span>{(price === 0 && !showZero ? 'Free' : `£${(price/100).toFixed(2)}`)}</span>;

Price.propTypes = {
  price: PropTypes.number.isRequired,
  showZero: PropTypes.bool
};

Price.defaultProps = {
  showZero: false
};

export default Price;
