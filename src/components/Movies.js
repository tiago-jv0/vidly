import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { Like } from './common/Like';

export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: getMovies(),
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
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };
    render() {
        const movies = this.state.movies;

        return (
            <React.Fragment>
                <h2 className="m-2">
                    {movies.length > 0
                        ? `Showing ${movies.length} movies in the database`
                        : 'There are no movies in the database'}
                </h2>

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
            </React.Fragment>
        );
    }
}
