import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

const NewPost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate({ from: '/posts/new-post' });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const postData = {
            title: title,
            body: content,
        };

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/new`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postData),
                }
            );
            if (response.ok) {
                const result = await response.json();
                console.log('Post Sucessful', result);
                navigate({ to: `/posts/${result.id}` });
            } else {
                console.error('Post Failed', response.statusText);
            }
        } catch (error) {
            console.error('Error on POST', error);
        }
    }

    return (
        <div>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit} className='new-post-form'>
                <p>Title</p>
                <input
                    type='text'
                    name='title'
                    required
                    placeholder='Title'
                    onChange={(e) => setTitle(e.target.value)}
                />
                <p>Content</p>
                <textarea
                    name='content'
                    rows={10}
                    cols={60}
                    required
                    placeholder='Lorem ipsum dolor sit amet'
                    style={{ resize: 'none' }}
                    onChange={(e) => setContent(e.target.value)}
                />
                <br />
                <button type='submit' name='button' value='submit'>
                    Publish
                </button>
            </form>
        </div>
    );
};

export default NewPost;
