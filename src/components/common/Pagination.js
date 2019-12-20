/* eslint-disable react/no-typos */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);

    if (pagesCount === 1) {
        return null;
    }

    const pages = _.range(1, pagesCount + 1);

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                {pages.map((page) => {
                    return (
                        <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
                            <a href="#" className="page-link" onClick={() => onPageChange(page)}>
                                {page}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

Pagination.PropTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};
 
export default Pagination;
