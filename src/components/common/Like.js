import React from 'react';

export const Like = (props) => {
    let classes = 'fa fa-heart';

    classes += props.liked ? '' : '-o';

    return <i style={{ cursor: 'pointer' }} onClick={props.onClick} className={classes} aria-hidden="true"></i>;
};
