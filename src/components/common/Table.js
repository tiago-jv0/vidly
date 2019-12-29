import React from 'react'
import PropTypes from 'prop-types'
import TableHeader from './TableHeader';
import TableBody from './TableBody';
const Table = ({data , columns , sortColumn , onSort}) => {
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
    data : PropTypes.array.isRequired,
    columns : PropTypes.array.isRequired,
    sortColumn : PropTypes.object.isRequired,
    onSort : PropTypes.func.isRequired
}

export default Table
