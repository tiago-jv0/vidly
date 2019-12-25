import React from 'react'
import PropTypes from 'prop-types'
import TableHeader from './TableHeader';
import TableBody from './TableBody';
const Table = props => {

    const {data , columns , sortColumn , onSort} = props;

    return (
        <div>
            <table className="table">
                    <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort}></TableHeader>
                    <TableBody data={data} columns={columns}></TableBody>
                </table>
        </div>
    )
}

Table.propTypes = {

}

export default Table
