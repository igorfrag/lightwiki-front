import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/account/register')({
    component: RegisterPage,
});

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = { username, password, name };
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/register`,
                {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                }
            );
            if (response.ok) {
                const result = await response.json();
                console.log('Post Successful', result);
                window.location.href = '/account/login';
            }
            if (!response.ok) {
                alert('Username already exists');
            }
        } catch (error) {
            console.error('Error on Post', error);
        }
    }

    return (
        <div className='login-container'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <p>Name</p>
                <input
                    style={{ width: '200px' }}
                    minLength={6}
                    type='name'
                    name='name'
                    required
                    placeholder='Name'
                    onChange={(e) => setName(e.target.value)}
                />
                <p>Username</p>
                <input
                    style={{ width: '200px' }}
                    minLength={6}
                    type='text'
                    name='username'
                    required
                    placeholder='Username'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <p>Password</p>
                <input
                    style={{ width: '200px' }}
                    minLength={6}
                    type='password'
                    name='password'
                    required
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <br />

                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
}
