import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/Pagination';
import { paginate } from '../utils/Paginate';
import ListGroup from './common/ListGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './MoviesTable';
import _ from 'lodash';

export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            pageSize: 4,
            currentPage: 1,
            selectedGenre: { _id: '', name: 'All Genres' },
            sortColumn: { path: 'title', order: 'asc' },
            genres: [],
        };
    }

    componentDidMount() {
        const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];

        this.setState({
            movies: getMovies(),
            genres,
        });
    }

    getPagedData = () => {

        const { currentPage, pageSize, selectedGenre, sortColumn, movies: allMovies } = this.state;


        const filtered =
            selectedGenre && selectedGenre._id
                ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
                : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        return {totalCount : filtered.length, data : movies}
    }

    handleDelete = (movieToDelete) => {
        this.setState({
            movies: this.state.movies.filter((movie) => movie._id !== movieToDelete._id),
        });
    };

    handleSelect = (genre) => {
        this.setState({
            selectedGenre: genre,
            currentPage: 1,
        });
    };

    handleSort = (sortColumn) => {
        this.setState({
            sortColumn,
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

        const { currentPage, pageSize, sortColumn } = this.state;


        if (count === 0) return <p>There are no movies in </p>;

        const {totalCount , data: movies} = this.getPagedData()

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
                    <p className="m-2">Showing {totalCount} movies in the database</p>

                    <MoviesTable
                        sortColumn={sortColumn}
                        movies={movies}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    ></MoviesTable>

                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    ></Pagination>
                </div>
            </div>
        );
    }
}
