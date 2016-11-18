import React, { Component, PropTypes } from 'react';
import WidgetLayout from 'rc/Widget/WidgetLayout';
import CategoriesShow from './CategoriesShow';
import props1 from 'test/fixtures/widget/category-1.json';
import props2 from 'test/fixtures/widget/category-2.json';
import props3 from 'test/fixtures/widget/category-3.json';

const props = {
  '1': props1,
  '2': props2,
  '3': props3,
};

class CategoriesShowWidget extends Component {
  render() {
    const {
      categoryId = 1,
    } = this.props.routeParams;

    return (
      <WidgetLayout>
        <CategoriesShow {...props[categoryId]} />
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
