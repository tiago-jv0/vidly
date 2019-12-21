import React, { Component } from 'react';
import { Like } from './common/Like';
import TableHeader from './common/TableHeader';

class MoviesTable extends Component {
    constructor(props) {
        super(props);
    }

    columns = [
        { path: 'title', label: 'Title' },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' },
        {key: 'like'},
        {key : 'delete'},
    ];

    render() {
        const { movies, sortColumn, onDelete, onLike, onSort } = this.props;
        return (
            <div>
                <table className="table">
                    <TableHeader columns={this.columns} sortColumn={sortColumn} onSort={onSort}></TableHeader>
                    <tbody>
                        {movies.map((movie) => {
                            return (
                                <tr key={movie._id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td>
                                        <Like liked={movie.liked} onClick={() => onLike(movie)}></Like>
                                    </td>
                                    <td>
                                        <button onClick={() => onDelete(movie)} className="btn btn-danger btn-small">
                                            {' '}
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MoviesTable;
