import React from 'react';

function Header() {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button onClick={onClose}>Close</button>
            <ul>
                <li>About</li>
                <li>Forum</li>
                <li>Login</li>
            </ul>
        </div>
    )
}

export default Header;