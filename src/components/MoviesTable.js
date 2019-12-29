import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Like } from './common/Like';
import Table from './common/Table';

class MoviesTable extends Component {
    constructor(props) {
        super(props);
    }

    columns = [
        {
            path: 'title',
            label: 'Title',
            content: (movie) => {
                return <Link to={`/movies/${movie._id}`}>{movie.title}</Link>;
            },
        },
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
                <Table data={movies} sortColumn={sortColumn} onSort={onSort} columns={this.columns}></Table>
            </div>
        );
    }
}

export default MoviesTable;
