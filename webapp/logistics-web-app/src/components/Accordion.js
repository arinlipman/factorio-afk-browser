import React from 'react';

const Accordion = ({ title, children, isOpen, onToggle }) => {
    return (
        <div className="accordion">
            <div className="accordion-header" onClick={onToggle}>
                <h2>{title}</h2>
                <span>{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && <div className="accordion-content">{children}</div>}
        </div>
    );
};

export default Accordion;