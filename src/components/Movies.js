import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { Like } from './common/Like';
import Pagination from './common/Pagination';
import { paginate } from '../utils/Paginate';

export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: getMovies(),
            pageSize: 4,
            currentPage: 1,
        };
    }

    handleDelete = (movieToDelete) => {
        this.setState({
            movies: this.state.movies.filter((movie) => movie._id !== movieToDelete._id),
        });
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handlePageChange = (page) => {
        this.setState({
            currentPage: page,
        });
    };
    render() {
        const { length: count } = this.state.movies;
        const { currentPage, pageSize, movies: allMovies } = this.state;

        if (count === 0) return null;

        const movies = paginate(allMovies, currentPage, pageSize);

        return (
            <React.Fragment>
                <p className="m-2">Showing {count} movies in the database</p>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie) => {
                            return (
                                <tr key={movie._id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td>
                                        <Like liked={movie.liked} onClick={() => this.handleLike(movie)}></Like>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => this.handleDelete(movie)}
                                            className="btn btn-danger btn-small"
                                        >
                                            {' '}
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                ></Pagination>
            </React.Fragment>
        );
    }
}
