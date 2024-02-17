import React from 'react';
import './navitem.css'

const NavItem = ({ isSelected, OnClick, Icon, iconText }) => {
    return (
        <div className={`nav-container${isSelected ? ' highlight' : ''}`} onClick={OnClick}>
            <div className='icon'>
                {Icon}
            </div>
            <div className='nav-item-text'><span>{iconText}</span></div>
        </div>
    )
}

export default NavItem