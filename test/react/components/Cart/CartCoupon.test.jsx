import React from 'react';
import { expect } from 'chai';
import { shallow, render } from 'enzyme';

import t from '../../../mocks/t';

import CartAlert from '../../../../app/scripts/react/components/Cart/CartAlert';
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
    const wrapper = shallow(
      <CartCoupon {...props} />
    );
    const alerts = wrapper.find(CartAlert);

    expect(alerts.length).to.equal(0);
  });

  it ('should display alert when code isn\'t empty', () => {
    const code = 'code';
    const message = 'message';
    const props = { t };
    const wrapper = shallow(
      <CartCoupon {...props} />
    );

    wrapper.setState({ code, message });
    wrapper.update();
    const alerts = wrapper.find(CartAlert);

    expect(alerts.length).to.equal(1);
  });

  it ('should display alert text in accordance to the state.message', () => {
    const code = 'code';
    const message = 'message';
    const props = { t };
    const wrapper = shallow(
      <CartCoupon {...props} />
    );

    wrapper.setState({ code, message });
    wrapper.update();
    const alerts = wrapper.find(CartAlert);

    expect(alerts.first().prop('text')).to.equal(message);
  });
});
