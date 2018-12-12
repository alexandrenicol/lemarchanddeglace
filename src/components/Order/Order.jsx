import { connect } from 'react-redux';

// const Counter = ...
import Order from './OrderUI';

const mapStateToProps = state => ({
    order: state.order
});

// const mapDispatchToProps = dispatch => {
//     return {

//     };
// };

export default connect(
  mapStateToProps,
  null
)(Order);
