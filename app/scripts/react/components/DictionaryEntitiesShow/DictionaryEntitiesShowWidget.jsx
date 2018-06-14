import React, { Component } from 'react'; import PropTypes from 'prop-types';
import DictionaryEntitiesShow from './DictionaryEntitiesShow';
import props from 'test/fixtures/widget/entities.json';

class DictionaryEntitiesWidget extends Component {
  render() {
    return <DictionaryEntitiesShow {...props} />;
  }
}

DictionaryEntitiesWidget.propTypes = {

};

DictionaryEntitiesWidget.defaultProps = {

};

export default DictionaryEntitiesWidget;
