import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ links }) => {
    return (
        <aside>
            {links.map((link, index) => (
                <Link key={index} to={link.to}>
                    {link.text}
                </Link>
            ))}
        </aside>
    );
};

export default Sidebar;
