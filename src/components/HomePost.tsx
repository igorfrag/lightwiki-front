import React from 'react';

interface HomePostProps {
    title: string;
    body: string;
    createdAt: string;
    id: number;
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

const HomePost: React.FC<HomePostProps> = ({ title, body, createdAt, id }) => {
    const localDate = new Date(createdAt).toLocaleString(undefined);
    return (
        <div className='home-post'>
            <div className='home-post-header'>
                <h2>{title}</h2>
                <button type='button' onClick={() => handleDelete(id)}>
                    X
                </button>
            </div>
            <div className='home-post-body'>
                <img
                    className='home-post-image'
                    src='/picapau.jpeg'
                    alt='Pica Pau'
                />

                <p className='home-post-text'>{body}</p>
                <time dateTime={localDate}>Posted at {localDate}</time>
            </div>
        </div>
    );
};

export default HomePost;
