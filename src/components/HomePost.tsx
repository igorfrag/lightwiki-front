import React from 'react';
import { Link } from '@tanstack/react-router';

interface HomePostProps {
    title: string;
    body: string;
    createdAt: string;
    id: number;
    imagePath: string;
    createdBy: string;
}

async function handleDelete(e: number) {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/delete/${e}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        if (response.ok) {
            const result = await response.json();
            console.log('Delete Sucessful', result);
            window.location.replace('/');
        } else {
            console.error('Delete Failed', response.statusText);
        }
    } catch (error) {
        console.error('Error on DELETE', error);
    }
}

const HomePost: React.FC<HomePostProps> = ({
    title,
    body,
    createdAt,
    id,
    imagePath,
    createdBy,
}) => {
    const localDate = new Date(createdAt).toLocaleString(undefined);
    function isUploaded() {
        if (imagePath.includes('null')) {
            return <></>;
        } else {
            return <img className='home-post-image' src={imagePath} />;
        }
    }

    return (
        <div className='home-post'>
            <div className='home-post-header'>
                <h2>
                    <Link to='/post/$postid' params={{ postid: `${id}` }}>
                        {title}
                    </Link>
                </h2>
                <button type='button' onClick={() => handleDelete(id)}>
                    X
                </button>
            </div>
            <div className='home-post-body'>
                {isUploaded()}
                <p className='home-post-text'>{body}</p>
                <time dateTime={localDate}>Posted at {localDate} </time>
                <p style={{ margin: '0' }}>By: {createdBy}</p>
            </div>
        </div>
    );
};

export default HomePost;
