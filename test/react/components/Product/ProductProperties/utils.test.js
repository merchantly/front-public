/*global describe, it */
import { expect } from 'chai';
import { getUpdatedValues } from 'rc/Product/ProductProperties/utils';

describe('ProductProperties changing one property leaves other ones intact', () => {
  it('should ', () => {
      const values = getUpdatedValues(
      { // property
        id: 7080,
        title: 'Color',
        type: 'colors',
        items: [
          { value: 39975 },
          { value: 39974 },
        ],
      },
      [ // properties
        {
          id: 7080,
          type: 'colors',
          items: [
            { value: 39975 },
            { value: 39974 },
          ],
        },
        {
          id: 7082,
          title: 'sex',
          type: 'items',
          items: [
            { value: 39973 },
            { value: 39972 },
          ],
        },
      ],
      [ // goods
        {
          attributes: {
            '7080': 39974,
            '7082': 39973,
          },
        },
        {
          attributes: {
            '7080': 39974,
            '7082': 39972,
          },
        },
        {
          attributes: {
            '7080': 39975,
            '7082': 39972,
          },
        },
        {
          attributes: {
            '7080': 39975,
            '7082': 39973,
          },
        },
      ],
      { // values
        '7080': 39975,
        '7082': 39972,
      },
      { // data
        '7080': 39974,
      }
      );
      expect(values).to.deep.equal({
      '7080': 39974,
      '7082': 39972,
      });
  });
});
