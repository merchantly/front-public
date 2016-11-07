/*global describe, it */
import React from 'react';
import { render, mount } from 'enzyme';
import { spy } from 'sinon';
import { expect } from 'chai';

import then from 'test/utils/then';
import t from 'test/mocks/t';

import { PHOTO_CHANGE } from 'r/constants/globalEventKeys';
import ProductProperties from 'rc/Product/ProductProperties';

describe('[Component] ProductProperties', () => {
  it('should render without properties', () => {
    expect(() => render(<ProductProperties t={t} />)).not.to.throw();
  });

  it('should trigger "photo change" event when good has been changed', (done) => {
    const nextGood = {
      title: 'Размер: 13',
      article: null,
      globalId: 'Z2lkOi8vbWVyY2hhbnRseS9Qcm9kdWN0SXRlbS85ODA3',
      isOrdering: true,
      isRunOut: false,
      isSale: false,
      isPreorder: false,
      image: {
        title: 'Миникольцо Цепочка золоченая с цирконом б',
        url: 'http://assets.kiiiosk.ru/uploads/shop/5/uploads/product_image/image/5172/image.png',
        uid: '37560f3221732219f3c804d2498a7377d1878df200dc84fb66f0788f16aae1a7',
      },
      attributes: {
        94: '13',
      },
      quantity: 1,
      price: {
        cents: 120000,
        currencyIsoCode: 'RUB',
      },
      actualPrice: {
        cents: 120000,
        currencyIsoCode: 'RUB',
      },
    };
    const props = { t };
    const component = mount(
      <ProductProperties {...props} />
    );
    const changeSpy = spy($.prototype, 'trigger');

    component.setState({ good: nextGood });

    then(() => {
      expect(changeSpy.calledWith(PHOTO_CHANGE, nextGood.image)).to.be.true;
      changeSpy.restore();
      done();
    });
  });
});
