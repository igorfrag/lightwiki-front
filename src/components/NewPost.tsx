import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { isLogged } from '../routes';

const NewPost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const navigate = useNavigate({ from: '/post/new-post' });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const userData = await isLogged();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', content);
        if (image) {
            formData.append('image', image);
        }
        if (userData) {
            formData.append('uuid', userData.id);
        }
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/new`,
                {
                    method: 'POST',
                    body: formData,
                }
            );
            const result = await response.json();
            if (response.ok) {
                console.log('Post Sucessful', result);
                navigate({ to: `/post/${result.id}` });
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error('Error on POST', error);
        }
    }

    return (
        <div>
            <h2>Create a New Post</h2>
            <form
                onSubmit={handleSubmit}
                className='new-post-form'
                encType='multipart/form-data'
            >
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
                <p>
                    Image upload
                    <span style={{ fontSize: 'x-small' }}>
                        <br />
                        (.png .jpeg .webp supported , max filesize: 5MB)
                    </span>
                </p>
                <input
                    type='file'
                    name='image'
                    accept='image/*'
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
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
