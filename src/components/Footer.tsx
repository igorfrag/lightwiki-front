import React from 'react';
import GithubImg from './svg-icons/GithubImg';

const Footer: React.FC = () => {
    return (
        <footer className='footer'>
            <div>
                <p>{new Date().getFullYear()} Igor Fragoso</p>
                <a
                    href='https://github.com/igorfrag'
                    target='_blank'
                    style={{
                        height: '32px',
                        width: '32px',
                        paddingTop: '10px',
                        paddingLeft: '30px',
                        paddingBottom: '10px',
                    }}
                >
                    <GithubImg stroke='#dfd0b8' />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
