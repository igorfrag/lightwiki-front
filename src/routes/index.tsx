import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    beforeLoad: () => {
        throw redirect({
            to: '/posts/$page',
            params: { page: '1' },
        });
    },
});

export async function isLogged() {
    try {
        const res = await fetch('http://localhost:3000/api/me', {
            method: 'GET',
            credentials: 'include',
        });

        if (!res.ok) {
            return null;
        }
        const result = await res.json();
        return { ...result };
    } catch (err) {
        console.error('Erro ao autenticar', err);
        return null;
    }
}
