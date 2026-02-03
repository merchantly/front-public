import React from 'react';
import { shallow, render } from 'enzyme';
import { expect } from 'chai';
import ProductCardDetails from '../../../../../app/scripts/react/components/Product/ProductCard/ProductCardDetails';

describe('[Component] ProductCardDetails', () => {
  it('should render when product is empty object', () => {
    const product = {};
    expect( ()=> render(
      <ProductCardDetails product={product} />
      )
   ).to.not.throw()
  });

  describe('Text blocks', () => {
    it('shouldn\'t render text blocks container when no text blocks to display', () => {
      const product = { textBlocks: [] };
      const wrapper = shallow(
        <ProductCardDetails product={product} />
      );

      // textBlocks are rendered inside a span wrapper, check for b-item-full__text inside it
      const textBlocksWrapper = wrapper.find('.b-item-full__text');
      expect(textBlocksWrapper.length).to.equal(0);
    });

    it('should render text blocks which count is equals product\'s text_blocks length', () => {
      const product = {
        textBlocks: [
          {
            title: 'Подробнее о продукте',
            content: '<ul><li>тип:\tбокс мод</li></ul>',
          },
          {
            title: 'Безупречное качество',
            content: '<ul><li>оценка:\t5</li></ul>',
          },
        ],
      };
      const wrapper = shallow(
        <ProductCardDetails product={product} />
      );
      const textBlocks = wrapper.find('.b-item-full__text');

      expect(textBlocks.length).to.equal(product.textBlocks.length);
    });
  });

  describe('Attributes', () => {
    it('shouldn\'t render attributes container when no attributes to display', () => {
      const product = { attributes: [] };
      const wrapper = shallow(
        <ProductCardDetails product={product} />
      );

      expect(wrapper.find('.b-characteristics').exists()).to.be.false;
    });

    it('should render AttributeDictionary attribute type', () => {
      const title = 'Цвет покрытия';
      const productsUrl = '/entities/46-chernenie';
      const value = 'чернение';
      const product = {
        attributes: [
          {
            productsUrl,
            title,
            value,
            propertyId: 89,
            type: 'AttributeDictionary',
          },
        ],
      };
      const wrapper = shallow(
        <ProductCardDetails product={product} />
      );
      const attributes = wrapper.find('.b-characteristics');
      const attribute = attributes.find('li').first();

      expect(attribute.exists()).to.be.true;
    });

    it('should render AttributeLink attribute type', () => {
      const product = {
        attributes: [
          {
            propertyId: 2378,
            type: 'AttributeLink',
            title: 'Ссылочка',
            value: 'http://google.ru',
            productsUrl: null,
          },
        ],
      };
      const wrapper = shallow(
        <ProductCardDetails product={product} />
      );
      const attributes = wrapper.find('.b-characteristics');
      const attribute = attributes.find('li').first();

      expect(attribute.exists()).to.be.true;
    });

    it('should render AttributeFile attribute type', () => {
      const title = 'Файлик';
      const url = 'http://assets.kiiiosk.ru/uploads/shop/5/uploads/af/2379/59eb28c9-fa4e-4062-b1d8-4582b9dc6c40.png';
      const product = {
        attributes: [
          {
            title,
            propertyId: 2379,
            type: "AttributeFile",
            value: {
              url,
              extension: '.png',
              filename: '59eb28c9-fa4e-4062-b1d8-4582b9dc6c40.png',
              size: 38144,
            },
            productsUrl: null,
          },
        ],
      };
      const wrapper = shallow(
        <ProductCardDetails product={product} />
      );
      const attributes = wrapper.find('.b-characteristics');
      const attribute = attributes.find('li').first();

      expect(attribute.exists()).to.be.true;
    });
  });

  describe('Description', () => {
    it('shouldn\'t render description container when description doesn\'t exist', () => {
      const product = { description: null };
      const wrapper = shallow(
        <ProductCardDetails product={product} />
      );

      expect(wrapper.find('.e-description').exists()).to.be.false;
    });

    it('should render product description with html', () => {
      const desc = 'Батарея увеличенной мощности с функцией проверки заряда.';
      const product = {
        description: `<p>${desc}</p>`,
      };
      const wrapper = shallow(
        <ProductCardDetails product={product} />
      );
      const description = wrapper.find('.e-description');

      expect(description.exists()).to.be.true;
    });
  });
});
