import React from 'react';

const MovieForm = ({ match, history }) => {
    return (
        <div>
            <h3>Movie Form {match.params.id}</h3>
            <button className='btn btn-primary' onClick={() => history.push('/movies')}>Save</button>
        </div>
    );
};

export default MovieForm;
