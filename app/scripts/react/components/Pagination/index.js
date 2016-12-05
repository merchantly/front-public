import React from 'react';
import * as schemas from 'r/schemas';
import { camelizeKeys } from 'humps';
import Pagination from './Pagination';

function PaginationContainer(props) {
  return <Pagination {...camelizeKeys(props)} />;
}

PaginationContainer.propTypes = schemas.pagination.isRequired;

export default PaginationContainer;
