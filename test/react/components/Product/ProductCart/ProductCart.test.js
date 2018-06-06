import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-dom/test-utils';
import { expect } from 'chai';

import t from '../../../../mocks/t';

import ProductCart from '../../../../../app/scripts/react/components/Product/ProductCart';

describe('[Component] ProductCart', () => {
  it('should render when product is empty object', () => {
    const props = {
      product: {},
      t,
    };
    const component = renderIntoDocument(
      <ProductCart {...props} />
    );

    expect(component).to.be.an('object');
  });

  it('should render CSRF token when it\'s passed in formAuthenticity prop', () => {
    const field = 'authenticity_token';
    const token = 'HDbhKZ79CgJJszMyRb7FflQli7P63A0FUTItVMmU7+I=';
    const props = {
      formAuthenticity: { field, token },
      product: {},
      t,
    };
    const component = renderIntoDocument(
      <ProductCart {...props} />
    );
    const CSRFToken = findDOMNode(component).querySelector(`input[name="${field}"]`);

    expect(CSRFToken).to.have.property('value').that.equals(token);
  });

  describe('has_ordering_goods = true and goods = 1', () => {
    it('should render unavailable status', () => {
      const props = {
        product: { hasOrderingGoods: false },
        t,
      };
      const component = renderIntoDocument(
        <ProductCart {...props} />
      );
      const button = findDOMNode(component).querySelector('.b-btn_trans');
      expect(button.textContent).is.equals('vendor.product.not_available');
    });
  });

  describe('has_ordering_goods = true and goods = 1', () => {
    it('should render single hidden input', () => {
      const globalID = 'Z2lkOi8vbWVyY2hhbnRseS9Qcm9kdWN0SXRlbS85ODA3';
      const props = {
        product: {
          hasOrderingGoods: true,
          goods: [
            {
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
                cents: 120000,
                currencyIsoCode: 'RUB',
              },
            },
          ],
        },
        t,
      };
      const component = renderIntoDocument(
        <ProductCart {...props} />
      );
      const cartItemInput = findDOMNode(component).querySelector(`input[name="cart_item[good_id]"]`);

      expect(cartItemInput).to.have.property('value').that.equals(globalID);
    });
  });

  describe('has_ordering_goods = true and goods > 1', () => {
    const firstGoodGlobalID = 'Z2lkOi8vbWVyY2hhbnRseS9Qcm9kdWN0SXRlbS85ODA3';
    const secondGoodGlobalID = 'Z2lkOi8vbWVyY2hhbnRseS9Qcm9kdWN0SXRlbS8xMDIzNw';
    const disabledOptionValue = 740;
    const baseProps = {
      product: {
        hasOrderingGoods: true,
        goods: [
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
              cents: 120000,
              currencyIsoCode: 'RUB',
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
              cents: 120000,
              currencyIsoCode: 'RUB',
            },
          }
        ],
      },
      t,
    };

    it('should render single select when properties = 0', () => {
      const props = {
        ...baseProps,
        product: {
          ...baseProps.product,
          properties: [],
        },
        t,
      };
      const component = renderIntoDocument(
        <ProductCart {...props} />
      );
      const cartItemSelect = findDOMNode(component).querySelector(`select[name="cart_item[good_id]"]`);
      const cartItemSelectOptions = cartItemSelect.children;

      expect(cartItemSelectOptions.length).to.equal(2);
      expect(cartItemSelectOptions[0]).to.have.property('value').that.equals(firstGoodGlobalID);
      expect(cartItemSelectOptions[1]).to.have.property('value').that.equals(secondGoodGlobalID);
    });

    it('should render option with disabled attribute when good.is_ordering = false and properties = 0', () => {
      const props = {
        ...baseProps,
        product: {
          ...baseProps.product,
          properties: [],
        },
        t,
      };
      const component = renderIntoDocument(
        <ProductCart {...props} />
      );
      const cartItemSelect = findDOMNode(component).querySelector(`select[name="cart_item[good_id]"]`);
      const cartItemSelectOptions = cartItemSelect.children;

      expect(cartItemSelectOptions[1]).to.have.property('disabled').that.equals(true);
    });

    it('should render selects where their count is equals properties count', () => {
      const props = {
        ...baseProps,
        product: {
          ...baseProps.product,
          properties: [
            {
              id: 94,
              title: 'items',
              type: 'items',
              items: [
                {
                  title: 'Желтый',
                  value: '13',
                },
                {
                  title: 'Каштановый',
                  value: '14',
                },
              ],
            },
            {
              id: 663,
              title: 'gender',
              type: 'items',
              items: [
                {
                  title: 'жен.',
                  value: disabledOptionValue,
                },
              ]
            }
          ],
        },
        t,
      };
      const component = renderIntoDocument(
        <ProductCart {...props} />
      );
      const cartItemSelects = findDOMNode(component).querySelectorAll(`select`);

      expect(cartItemSelects.length).to.equal(props.product.properties.length);
    });

    it('should render property with type colors', () => {
      const colorTitle = 'color2';
      const props = {
        ...baseProps,
        product: {
          ...baseProps.product,
          properties: [
            {
              "id": 94,
              "title": colorTitle,
              "type": "colors",
              "items": [
                {
                  "title": "Желтый",
                  "value": '13',
                },
                {
                  "title": "Каштановый",
                  "value": '14',
                },
              ],
            },
            {
              id: 663,
              title: 'gender',
              type: 'items',
              items: [
                {
                  title: 'жен.',
                  value: disabledOptionValue,
                },
              ]
            }
          ]
        },
        t,
      };
      const component = renderIntoDocument(
        <ProductCart {...props} />
      );
      const colorOption = findDOMNode(component).querySelector('.b-item-full__form__option');
      const labels = colorOption.querySelectorAll('label.radiobtn.radiobtn--color');
      const firstLabelInput = labels[0].querySelector('input');

      expect(colorOption.querySelector('.b-item-full__form__title').textContent).contains(colorTitle);
      expect(labels.length).equals(props.product.properties[0].items.length);
      expect(firstLabelInput.value).equals(props.product.properties[0].items[0].value);
    });

    it('should render disabled option if there are no matched good attributes', () => {
      const props = {
        ...baseProps,
        product: {
          ...baseProps.product,
          properties: [
            {
              id: 94,
              title: 'items',
              type: 'items',
              items: [
                {
                  title: 'Желтый',
                  value: '13',
                },
                {
                  title: 'Каштановый',
                  value: '14',
                },
              ],
            },
            {
              id: 663,
              title: 'gender',
              type: 'items',
              items: [
                {
                  title: 'жен.',
                  value: disabledOptionValue,
                },
              ]
            }
          ],
        },
        t,
      };
      const component = renderIntoDocument(
        <ProductCart {...props} />
      );
      const cartItemSelects = findDOMNode(component).querySelectorAll(`select`);
      const disabledOption = cartItemSelects[1].querySelector('option[disabled]');

      expect(disabledOption).to.have.property('value').that.equals(String(disabledOptionValue));
    });

    it('should accept equal count of goods and properties', () => {
      const props = {
        ...baseProps,
        product: {
          ...baseProps.product,
          properties: [
            {
              id: 94,
              title: 'items',
              type: 'items',
              items: [
                {
                  title: 'Желтый',
                  value: '13',
                },
                {
                  title: 'Каштановый',
                  value: '14',
                },
              ],
            },
          ],
        },
        t,
      };
      const component = renderIntoDocument(
        <ProductCart {...props} />
      );
      const propertiesCount = props.product.properties.length;
      const hasDifferentCount = props.product.goods.some((el) =>
        Object.keys(el.attributes).length !== propertiesCount
      );

      expect(hasDifferentCount).to.be.false;
    });
  });
});
