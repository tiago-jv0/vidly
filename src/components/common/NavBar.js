import React from 'react';
import { NavLink, Link } from 'react-router-dom';
const Navigation = ({ items }) => {
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light p-2 mt-0 mb-5'>
            <Link className='navbar-brand' to='/'> Vidly </Link>
            <ul className="navbar-nav">
                {items.map((item, index) => {
                    return (
                        <li className="nav-item" key={index}>
                            <NavLink className="nav-link" to={`/${item}`}>
                                {item}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navigation;
