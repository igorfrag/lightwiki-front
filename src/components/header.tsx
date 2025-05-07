import { Link } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';
import NewPostImg from './svg-icons/NewPostImg.js';
import LoginImg from './svg-icons/LoginImg.js';
import LogoutImg from './svg-icons/LogoutImg.js';
import { isLogged } from '../routes/index.js';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        isLogged().then(setUser);
    }, []);

    return (
        <header>
            <div className='header'>
                <div className='header-content'>
                    <Link to='/'>
                        <h2>{title}</h2>
                    </Link>
                    <div className='header-buttons-div'>
                        <div>
                            <Link to='/posts/new-post'>
                                <NewPostImg fill='#dfd0b8' />
                            </Link>
                        </div>
                        <div>
                            {user ? (
                                <Link to='/'>
                                    <LogoutImg
                                        stroke='#dfd0b8'
                                        fill='#dfd0b8'
                                    />
                                </Link>
                            ) : (
                                <Link to='/account/login'>
                                    <LoginImg stroke='#dfd0b8' />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
