import React from 'react';

interface HomePostProps {
    title: string;
    body: string;
    createdAt: string;
}

const HomePost: React.FC<HomePostProps> = ({ title, body, createdAt }) => {
    const localDate = new Date(createdAt).toLocaleString(undefined);
    return (
        <div className='home-post'>
            <h1>{title}</h1>
            <p>{body}</p>
            <time dateTime={localDate}>Posted at {localDate}</time>
        </div>
    );
};

export default HomePost;
