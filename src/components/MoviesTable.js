import React, { Component } from 'react';
import { Like } from './common/Like';
import TableHeader from './common/TableHeader';
import TableBody from './common/TableBody';

class MoviesTable extends Component {
    constructor(props) {
        super(props);
    }

    columns = [
        { path: 'title', label: 'Title' },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' },
        { key: 'like', content: (movie) => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)}></Like> },
        {
            key: 'delete',
            content: (movie) => (
                <button onClick={() => this.props.onDelete(movie)} className="btn btn-danger btn-sm">
                    Delete
                </button>
            ),
        },
    ];

    render() {
        const { movies, sortColumn, onSort } = this.props;
        return (
            <div>
                <table className="table">
                    <TableHeader columns={this.columns} sortColumn={sortColumn} onSort={onSort}></TableHeader>
                    <TableBody data={movies} columns={this.columns}></TableBody>
                </table>
            </div>
        );
    }
}

export default MoviesTable;
