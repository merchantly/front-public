import React from 'react';
import { scryRenderedComponentsWithType, renderIntoDocument } from 'react-dom/test-utils';
import { expect } from 'chai';

import { render } from 'enzyme';
import then from '../../../utils/then';
import t from '../../../mocks/t';

import Alert from '../../../../app/scripts/react/components/common/Alert';
import { CartCoupon } from '../../../../app/scripts/react/components/Cart/CartCoupon';

describe('[Component] CartCoupon', () => {
  it('should render without errors when there aren\'t any props', () => {
    const props = { t };
    expect( () => render(
      <CartCoupon {...props} />
      )
    ).to.not.throw()
  });

  it ('shouldn\'t display alert when code is empty', () => {
    const props = { t };
    const component = renderIntoDocument(
      <CartCoupon {...props} />
    );
    const alerts = scryRenderedComponentsWithType(component, Alert);

    expect(alerts.length).to.equals(0);
  });

  it ('should display alert when code isn\'t empty', (done) => {
    const code = 'code';
    const message = 'message';
    const props = { t };
    const component = renderIntoDocument(
      <CartCoupon {...props} />
    );

    component.setState({ code, message });

    then(() => {
      const alerts = scryRenderedComponentsWithType(component, Alert);

      expect(alerts.length).to.equals(1);
      done();
    });
  });

  it ('should display alert text in accordance to the state.message', (done) => {
    const code = 'code';
    const message = 'message';
    const props = { t };
    const component = renderIntoDocument(
      <CartCoupon {...props} />
    );

    component.setState({ code, message });

    then(() => {
      const alerts = scryRenderedComponentsWithType(component, Alert);

      expect(alerts[0].props.text).to.equals(message);
      done();
    });
  });
});
