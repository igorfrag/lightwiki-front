import { Link } from '@tanstack/react-router';
import React from 'react';

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
                    <p>Lightweight personal wiki for you!</p>
                    <Link to='/posts/new-post'>
                        <img
                            src='/new-page.svg'
                            alt='Create new post'
                            width={'24px'}
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
