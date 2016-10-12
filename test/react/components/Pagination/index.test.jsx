/*global describe, it */
import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';
import Pagination from 'rc/Pagination';
import {
  WINDOW_SIZE,
} from 'rc/Pagination/Pagination';

const gapSelector = '.gap';
const rawPageSelector = `span.page:not(${gapSelector})`;
const firstPageSelector = 'span.first';
const lastPageSelector = 'span.last';
const prevPageSelector = 'span.prev';
const nextPageSelector = 'span.next';
const currentPageSelector = `${rawPageSelector}.current`;

describe('[Component] Pagination', () => {
  it('should render without errors', () => {
    expect(() => render(<Pagination currentPage={1} totalPages={1} />)).not.to.throw();
  });

  it('should render only two links with 2 pages', () => {
    expect(
      render(<Pagination currentPage={1} totalPages={2} />)
      .find(rawPageSelector)
    ).to.have.length(2);
  });

  it('shold not render neither `prev` nor `first` links when on the first page', () => {
    expect(
      render(<Pagination currentPage={1} totalPages={10} />)
      .find(`${prevPageSelector}, ${firstPageSelector}`)
    ).to.have.length(0);
  });

  it('should render `prev` and `first` links when not on the first page and totalPages >= WINDOW_SIZE', () => {
    expect(
      render(<Pagination currentPage={2} totalPages={10} />)
      .find(`${prevPageSelector}, ${firstPageSelector}`)
    ).to.have.length(2);
  });

  it('should not render neither `last` nor `next` links when on the last page', () => {
    expect(
      render(<Pagination currentPage={2} totalPages={2} />)
      .find(`${nextPageSelector}, ${lastPageSelector}`)
    ).to.have.length(0);
  });

  it('should render `last` and `next` links when not on the last page and totalPages >= WINDOW_SIZE', () => {
    expect(
      render(<Pagination currentPage={1} totalPages={10} />)
      .find(`${nextPageSelector}, ${lastPageSelector}`)
    ).to.have.length(2);
  });

  it('should render exact double WINDOW_SIZE number of pages plus current one when we have enough pages before and after the current page', () => {
    expect(
      render(<Pagination currentPage={1 + WINDOW_SIZE} totalPages={1 + WINDOW_SIZE + WINDOW_SIZE + 1} />)
      .find(rawPageSelector)
    ).to.have.length(WINDOW_SIZE + 1 + WINDOW_SIZE); // double WINDOW_SIZE + current page
  });

  it(`should render strip some 'before' pages when currentPage is less than WINDOW_SIZE:${WINDOW_SIZE}`, () => {
    expect(
      render(<Pagination currentPage={3} totalPages={3 + WINDOW_SIZE} />)
      .find(rawPageSelector)
    ).to.have.length(3 + WINDOW_SIZE);
  });

  it(`should render strip some 'after' pages when currentPage is closer to the totatPages than WINDOW_SIZE:${WINDOW_SIZE}`, () => {
    expect(
      render(<Pagination currentPage={1 + WINDOW_SIZE} totalPages={1 + WINDOW_SIZE + (WINDOW_SIZE - 2)} />)
      .find(rawPageSelector)
    ).to.have.length(WINDOW_SIZE + 1 + (WINDOW_SIZE - 2));
  });

  it('should not render wrapping <a> tag on the current page', () => {
    expect(
      render(<Pagination currentPage={3} totalPages={10} />)
      .find(currentPageSelector)
      .children('a')
    ).to.have.length(0);
  });

  it('should render wrapping <a> tag on other pages', () => {
    expect(
      render(<Pagination currentPage={1 + WINDOW_SIZE} totalPages={1 + WINDOW_SIZE + WINDOW_SIZE + 1} />)
      .find(`${rawPageSelector} > a`)
    ).to.have.length(2 * WINDOW_SIZE);
  });

  it('should render both `gaps` when there is enought space from the currentPage to both ends', () => {
    expect(
      render(<Pagination currentPage={2 + WINDOW_SIZE} totalPages={2 + WINDOW_SIZE + WINDOW_SIZE + 2} />)
      .find(gapSelector)
    ).to.have.length(2);
  });

  it('should render only the left `gap` when currentPage is farther from the begining than WINDOW_SIZE', () => {
    expect(
      render(<Pagination currentPage={2 + WINDOW_SIZE} totalPages={2 + WINDOW_SIZE} />)
      .find(gapSelector)
    ).to.have.length(1);
  });

  it('should render only the right `gap` when currentPage is farther from the end than WINDOW_SIZE', () => {
    expect(
      render(<Pagination currentPage={1} totalPages={1 + WINDOW_SIZE + 1} />)
      .find(gapSelector)
    ).to.have.length(1);
  });
});
