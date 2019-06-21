import React from 'react';
import { render } from 'enzyme';
import { expect } from 'chai';
import Logo from '../../../../app/scripts/react/components/Logo';

describe('[Component] Logo', function() {
  it('renders without errors', function() {
    expect(() =>  render(
      <Logo
        logoUrl="http://assets.kiiiosk.ru/uploads/vendor/logo/5/logo.svg"
        linkUrl="http://google.ru"
        logoText="Test"
        imageAlt="Test2"
      />
    )
  ).to.not.throw()
  });
});
