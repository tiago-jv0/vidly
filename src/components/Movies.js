import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { Like } from './common/Like';
import Pagination from './common/Pagination';
import { paginate } from '../utils/Paginate';
import ListGroup from './common/ListGroup';
import { getGenres } from '../services/fakeGenreService';

export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            pageSize: 4,
            currentPage: 1,
            selectedGenre: undefined,
            genres: [],
        };
    }

    componentDidMount() {
        const genres = [{ name: 'All Genres' }, ...getGenres()];

        this.setState({
            movies: getMovies(),
            genres,
        });
    }

    handleDelete = (movieToDelete) => {
        this.setState({
            movies: this.state.movies.filter((movie) => movie._id !== movieToDelete._id),
        });
    };

    handleSelect = (genre) => {
        this.setState({
            selectedGenre: genre,
            currentPage : 1
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
        const { currentPage, pageSize, selectedGenre, movies: allMovies } = this.state;

        if (count === 0) return null;

        const filtered =
            selectedGenre && selectedGenre._id
                ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
                : allMovies;
        const movies = paginate(filtered, currentPage, pageSize);

        return (
            <div className="row">
                <div className="col-2">
                    {' '}
                    <ListGroup
                        selectedItem={this.state.selectedGenre}
                        items={this.state.genres}
                        onItemSelect={this.handleSelect}
                    ></ListGroup>
                </div>
                <div className="col">
                    <p className="m-2">Showing {filtered.length} movies in the database</p>

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
                        itemsCount={filtered.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    ></Pagination>
                </div>
            </div>
        );
    }
}
