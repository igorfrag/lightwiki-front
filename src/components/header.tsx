import { Link } from '@tanstack/react-router';
import React from 'react';
import NewPostImg from './NewPostImg.js';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <header>
            <div className='header'>
                <div className='header-content'>
                    <Link to='/'>
                        <h2>{title}</h2>
                    </Link>
                    <Link to='/posts/new-post'>
                        <NewPostImg fill='#dfd0b8' />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
