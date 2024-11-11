import React from 'react';

const Header = ({ title, onLogout, name }) => {
    return (
        <header>
            <div>
                {title}
            </div>
            <div>
                {name} &nbsp; &nbsp;
                <button onClick={onLogout} className="btn-logout">Logout</button>
            </div>
        </header>
    );
};

export default Header;
