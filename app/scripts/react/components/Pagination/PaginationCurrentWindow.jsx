import React from 'react';
import PropTypes from 'prop-types';
import { WINDOW_SIZE } from '././Pagination.jsx';
import { range } from 'lodash';
import classNames from 'classnames';

function PaginationCurrentWindow(props) {
  const {
    currentPage,
    totalPages,
    getPageHref,
  } = props;
  const startPage = Math.max(currentPage - WINDOW_SIZE, 1);
  const endPage = Math.min(currentPage + WINDOW_SIZE, totalPages) + 1;

  return (
    <span>
      {range(startPage, endPage).map((page) => {
        const isCurrent = currentPage == page;
        const classes = classNames({
          'page': true,
          'current': isCurrent,
        });

        return (
          <span className={classes} key={`page-${page}`}>
            {isCurrent
              ? page
              : (
                <a href={getPageHref(page)}>
                  {page}
                </a>
              )
            }
            {' '}
          </span>
        );
      })}
    </span>
  );
}

PaginationCurrentWindow.propTypes = {
  currentPage: PropTypes.number.isRequired,
  getPageHref: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default PaginationCurrentWindow;
