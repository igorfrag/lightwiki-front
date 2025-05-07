import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/account/login')({
    component: LoginPage,
});

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = { username, password };
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/login`,
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
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Error on Post', error);
        }
    }

    return (
        <div className='login-container'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <p>Username</p>
                <input
                    minLength={6}
                    type='text'
                    name='username'
                    required
                    placeholder='Username'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <p>Password</p>
                <input
                    minLength={6}
                    type='password'
                    name='password'
                    required
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <br />
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}
