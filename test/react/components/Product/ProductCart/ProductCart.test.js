import React from 'react';
import { expect } from 'chai';
import { shallow, render } from 'enzyme';

import t from '../../../../mocks/t';

import ProductCart from '../../../../../app/scripts/react/components/Product/ProductCart';
import CSRFToken from '../../../../../app/scripts/react/components/common/CSRFToken';
import ProductCartNotAvailable from '../../../../../app/scripts/react/components/Product/ProductCart/ProductCartNotAvailable';
import ProductCartForProduct from '../../../../../app/scripts/react/components/Product/ProductCart/ProductCartForProduct';
import ProductCartForProductItems from '../../../../../app/scripts/react/components/Product/ProductCart/ProductCartForProductItems';

describe('[Component] ProductCart', () => {
  it('should render when product is empty object', () => {
    const props = {
      product: {},
      t,
      isAddingGood: false,
      onChangeAmount: () => {},
      onSubmit: () => {},
    };
    expect(() => render(
      <ProductCart {...props} />
      )
    ).to.not.throw()
  });

  it('should render CSRFToken when formAuthenticity prop is passed', () => {
    const field = 'authenticity_token';
    const token = 'HDbhKZ79CgJJszMyRb7FflQli7P63A0FUTItVMmU7+I=';
    const props = {
      formAuthenticity: { field, token },
      product: {},
      t,
      isAddingGood: false,
      onChangeAmount: () => {},
      onSubmit: () => {},
    };
    const wrapper = shallow(
      <ProductCart {...props} />
    );
    const csrfToken = wrapper.find(CSRFToken);

    expect(csrfToken.exists()).to.be.true;
    expect(csrfToken.prop('field')).to.equal(field);
    expect(csrfToken.prop('token')).to.equal(token);
  });

  describe('has_ordering_goods = false', () => {
    it('should render ProductCartNotAvailable', () => {
      const props = {
        product: { hasOrderingGoods: false },
        t,
        isAddingGood: false,
        onChangeAmount: () => {},
        onSubmit: () => {},
      };
      const wrapper = shallow(
        <ProductCart {...props} />
      );

      expect(wrapper.find(ProductCartNotAvailable).exists()).to.be.true;
    });
  });

  describe('has_ordering_goods = true and goods = 1', () => {
    it('should render ProductCartForProduct with correct good', () => {
      const globalID = 'Z2lkOi8vbWVyY2hhbnRseS9Qcm9kdWN0SXRlbS85ODA3';
      const good = {
        title: 'Размер: 13',
        article: null,
        globalId: globalID,
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
          id: 123,
          price: {
            cents: 120000,
            currencyIsoCode: 'RUB',
          }
        },
      };
      const props = {
        product: {
          hasOrderingGoods: true,
          goods: [good],
        },
        t,
        isAddingGood: false,
        onChangeAmount: () => {},
        onSubmit: () => {},
      };
      const wrapper = shallow(
        <ProductCart {...props} />
      );
      const productCartForProduct = wrapper.find(ProductCartForProduct);

      expect(productCartForProduct.exists()).to.be.true;
      expect(productCartForProduct.prop('good').globalId).to.equal(globalID);
    });

    it('should render ProductCartNotAvailable when good has no actualPrice', () => {
      const props = {
        product: {
          hasOrderingGoods: true,
          goods: [{
            globalId: 'test',
            // no actualPrice
          }],
        },
        t,
        isAddingGood: false,
        onChangeAmount: () => {},
        onSubmit: () => {},
      };
      const wrapper = shallow(
        <ProductCart {...props} />
      );

      expect(wrapper.find(ProductCartNotAvailable).exists()).to.be.true;
    });
  });

  describe('has_ordering_goods = true and goods > 1', () => {
    const firstGoodGlobalID = 'Z2lkOi8vbWVyY2hhbnRseS9Qcm9kdWN0SXRlbS85ODA3';
    const secondGoodGlobalID = 'Z2lkOi8vbWVyY2hhbnRseS9Qcm9kdWN0SXRlbS8xMDIzNw';
    const baseGoods = [
      {
        title: 'Размер: 13',
        article: null,
        globalId: firstGoodGlobalID,
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
          id: 123,
          price: {
            cents: 120000,
            currencyIsoCode: 'RUB',
          }
        },
      },
      {
        title: 'Размер: 14',
        article: null,
        globalId: secondGoodGlobalID,
        isOrdering: false,
        isRunOut: true,
        isSale: false,
        isPreorder: false,
        image: {
          title: 'Миникольцо Цепочка золоченая с цирконом б',
          url: 'http://assets.kiiiosk.ru/uploads/shop/5/uploads/product_image/image/5172/image.png',
          uid: '37560f3221732219f3c804d2498a7377d1878df200dc84fb66f0788f16aae1a7',
        },
        attributes: {
          94: '14',
        },
        quantity: 0,
        price: {
          cents: 120000,
          currencyIsoCode: 'RUB',
        },
        actualPrice: {
          id: 123,
          price: {
            cents: 120000,
            currencyIsoCode: 'RUB',
          }
        },
      }
    ];

    it('should render ProductCartForProductItems when multiple goods', () => {
      const props = {
        product: {
          hasOrderingGoods: true,
          goods: baseGoods,
          properties: [],
        },
        t,
        isAddingGood: false,
        onChangeAmount: () => {},
        onSubmit: () => {},
      };
      const wrapper = shallow(
        <ProductCart {...props} />
      );

      expect(wrapper.find(ProductCartForProductItems).exists()).to.be.true;
    });

    it('should pass correct product to ProductCartForProductItems', () => {
      const properties = [
        {
          id: 94,
          title: 'items',
          type: 'items',
          items: [
            { title: 'Желтый', value: '13' },
            { title: 'Каштановый', value: '14' },
          ],
        },
      ];
      const props = {
        product: {
          hasOrderingGoods: true,
          goods: baseGoods,
          properties,
        },
        t,
        isAddingGood: false,
        onChangeAmount: () => {},
        onSubmit: () => {},
      };
      const wrapper = shallow(
        <ProductCart {...props} />
      );
      const productCartForProductItems = wrapper.find(ProductCartForProductItems);

      expect(productCartForProductItems.exists()).to.be.true;
      expect(productCartForProductItems.prop('product').goods.length).to.equal(2);
      expect(productCartForProductItems.prop('product').properties).to.equal(properties);
    });

    it('should accept goods with matching attributes count to properties count', () => {
      const properties = [
        {
          id: 94,
          title: 'items',
          type: 'items',
          items: [
            { title: 'Желтый', value: '13' },
            { title: 'Каштановый', value: '14' },
          ],
        },
      ];
      const props = {
        product: {
          hasOrderingGoods: true,
          goods: baseGoods,
          properties,
        },
        t,
        isAddingGood: false,
        onChangeAmount: () => {},
        onSubmit: () => {},
      };
      const propertiesCount = props.product.properties.length;
      const hasDifferentCount = props.product.goods.some((el) =>
        Object.keys(el.attributes).length !== propertiesCount
      );

      expect(hasDifferentCount).to.be.false;
    });
  });
});
