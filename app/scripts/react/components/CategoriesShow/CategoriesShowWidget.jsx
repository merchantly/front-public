import React, { Component } from 'react'; import PropTypes from 'prop-types';
import WidgetLayout from 'rc/Widget/WidgetLayout';
import CategoriesShow from './CategoriesShow';
import props1 from 'test/fixtures/widget/category-1.json';
import props2 from 'test/fixtures/widget/category-2.json';
import props3 from 'test/fixtures/widget/category-3.json';

const props = {
  '1': props3,
  '2': props1,
  '3': props2,
};

class CategoriesShowWidget extends Component {
  render() {
    const {
      categoryId = 1,
    } = this.props.routeParams;

    return (
      <WidgetLayout>
        <CategoriesShow {...props[categoryId % 3 + 1]} />
      </WidgetLayout>
    );
  }
}

CategoriesShowWidget.propTypes = {
  routeParams: PropTypes.object.isRequired,
};

CategoriesShowWidget.defaultProps = {

};

export default CategoriesShowWidget;
