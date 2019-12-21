import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = ({ items, selectedItem, textProperty, valueProperty, onItemSelect }) => {
    return (
        <ul className="list-group">
            {items.map((item) => {
                return (
                    <li
                        key={item[valueProperty]}
                        onClick={() => onItemSelect(item)}
                        className={item === selectedItem ? 'list-group-item active' : 'list-group-item'}
                    >
                        {item[textProperty]}
                    </li>
                );
            })}
        </ul>
    );
};

ListGroup.defaultProps = {
    textProperty : 'name',
    valueProperty : '_id'
}

ListGroup.propTypes = {
    items: PropTypes.array.isRequired,
    selectedItem: PropTypes.object.isRequired,
    textProperty: PropTypes.string,
    valueProperty: PropTypes.string,
    onItemSelect: PropTypes.func.isRequired,
};

export default ListGroup;
