import React, { Component, PropTypes } from 'react';
import CategoriesShow from './CategoriesShow';
import props from 'test/fixtures/categoriesShow/sample.json';

class CategoriesShowWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }
  componentWillMount() {
    this.setState({ data: props });
  }
  render() {
    const {
      categoryId,
    } = this.props.routeParams;

    return (
      <CategoriesShow {...this.state.data} />
    );
  }
}

CategoriesShowWidget.propTypes = {
  routeParams: PropTypes.object.isRequired,
};

CategoriesShowWidget.defaultProps = {

};

export default CategoriesShowWidget;
