import React, { Component, PropTypes } from 'react';
import PaginationCurrentWindow from './PaginationCurrentWindow';
import uri from 'urijs';
import { canUseDOM } from 'r/helpers/dom';

export const WINDOW_SIZE = 4;

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.getPageHref = this.getPageHref.bind(this);
  }
  getPageHref(page) {
    const href = canUseDOM()
      ? window.location.href
      : this.props.currentHref;

    return uri(href).setSearch('page', page);
  }
  render() {
    const {
      currentPage,
      totalPages,
    } = this.props;

    const showArrows = (totalPages >= WINDOW_SIZE)

    return (
      <nav className="pagination">
        {showArrows && (currentPage > 1) && (
          <span className="first">
            <a href={this.getPageHref(1)}>
              {'&laquo;'}
            </a>
          </span>
        )}
        {' '}
        {showArrows && (currentPage - 1 > 0) && (
          <span className="prev">
            <a href={this.getPageHref(currentPage - 1)}>
              {'‹'}
            </a>
          </span>
        )}
        {' '}
        {(currentPage > WINDOW_SIZE + 1) && (
          <span className="page gap">
            {'\u2026'}
          </span>
        )}
        {' '}
        <PaginationCurrentWindow
          currentPage={currentPage}
          getPageHref={this.getPageHref}
          totalPages={totalPages}
        />
        {' '}
        {(currentPage + WINDOW_SIZE < totalPages) && (
          <span className="page gap">
            {'\u2026'}
          </span>
        )}
        {' '}
        {showArrows && (currentPage + 1 <= totalPages) && (
          <span className="next">
            <a href={this.getPageHref(currentPage + 1)}>
              {'›'}
            </a>
          </span>
        )}
        {' '}
        {showArrows && (currentPage != totalPages) && (
          <span className="last">
            <a href={this.getPageHref(totalPages)}>
              {'&raquo;'}
            </a>
          </span>
        )}
      </nav>
    );
  }
}

Pagination.propTypes = {
  currentHref: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

Pagination.defaultProps = {
  currentHref: '',
};

export default Pagination;
