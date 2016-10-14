/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render, mount, shallow } from 'enzyme';
import DictionaryEntitiesShowPage from 'rc/DictionaryEntitiesShow/DictionaryEntitiesShowPage';
import props from 'test/fixtures/dictionaryEntitiesShow/page-sample.json';

describe('[Component] DictionaryEntitiesShowPage', () => {
  it('should render without errors', () => {
    expect(() => render(<DictionaryEntitiesShowPage {...props} />)).not.to.throw();
  });
});
