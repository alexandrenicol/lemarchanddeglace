import React from 'react';
import PropTypes from 'prop-types';

function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

const Name = ({ name }) => <span>{capitalize(name.replace(/-/g, ' '))}</span>;

Name.propTypes = {
  name: PropTypes.string.isRequired
};

export default Name;
