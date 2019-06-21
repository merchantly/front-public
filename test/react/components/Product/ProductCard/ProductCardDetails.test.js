import React from 'react';
import { render } from 'enzyme';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-dom/test-utils';
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
      const component = renderIntoDocument(
        <ProductCardDetails product={product} />
      );

      expect(component.refs.textBlocks).to.be.undefined;
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
      const component = renderIntoDocument(
        <ProductCardDetails product={product} />
      );
      const textBlocks = component.refs.textBlocks;

      expect(textBlocks).to.not.be.undefined;
      expect(product.textBlocks.length).to.equal(textBlocks.childNodes.length);
    });
  });

  describe('Attributes', () => {
    it('shouldn\'t render attributes container when no attributes to display', () => {
      const product = { attributes: [] };
      const component = renderIntoDocument(
        <ProductCardDetails product={product} />
      );

      expect(component.refs.attributes).to.be.undefined;
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
      const component = renderIntoDocument(
        <ProductCardDetails product={product} />
      );
      const attributes = findDOMNode(component.refs.attributes);
      const attribute = attributes.firstChild;

      expect(attribute).to.be.instanceof(HTMLLIElement);

      const attributeTitle = attribute.querySelector('.attribute__title');
      const attributeValue = attribute.querySelector('a');

      expect(attributeTitle.textContent).contain(title);
      expect(attributeValue.textContent).to.equal(value);
      expect(attributeValue).to.have.property('href').that.contain(productsUrl);
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
      const component = renderIntoDocument(
        <ProductCardDetails product={product} />
      );
      const attributes = findDOMNode(component.refs.attributes);
      const attribute = attributes.firstChild;

      expect(attribute).to.be.instanceof(HTMLLIElement);

      const attributeValue = attribute.querySelector('a');

      expect(attributeValue).to.have.property('href').that.contain('http://google.ru');
      expect(attributeValue).to.have.property('className').that.is.equals('link link--external');
      expect(attributeValue).to.have.property('textContent').that.is.equals('Ссылочка');
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
      const component = renderIntoDocument(
        <ProductCardDetails product={product} />
      );
      const attributes = findDOMNode(component.refs.attributes);
      const attribute = attributes.firstChild;

      expect(attribute).to.be.instanceof(HTMLLIElement);

      const attributeValue = attribute.querySelector('a');

      expect(attributeValue).to.have.property('href').that.contain(url);
      expect(attributeValue).to.have.property('className').that.is.equals('link link--file');
      expect(attributeValue).to.have.property('textContent').that.contain(title);
    });
  });

  describe('Description', () => {
    it('shouldn\'t render description container when description doesn\'t exist', () => {
      const product = { description: null };
      const component = renderIntoDocument(
        <ProductCardDetails product={product} />
      );

      expect(component.refs.description).to.be.undefined;
    });

    it('should render product description with html', () => {
      const desc = 'Батарея увеличенной мощности с функцией проверки заряда.';
      const product = {
        description: `<p>${desc}</p>`,
      };
      const component = renderIntoDocument(
        <ProductCardDetails product={product} />
      );
      const description = findDOMNode(component.refs.description);

      expect(description.querySelector('p')).property('textContent').that.is.equals(desc);
    });
  });
});
