import React from 'react';

function Tab({ label, isActive, onClick }) {
    return (
        <div className={`tab ${isActive ? 'active' : ''}`} onClick={onClick}>
            {label}
        </div>
    );
}

export default Tab;