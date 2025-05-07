import { createFileRoute } from '@tanstack/react-router';
import HomePost from '../components/HomePost';

interface Post {
    title: string;
    body: string;
    created_at: string;
    id: number;
    image_path: string;
}

export const Route = createFileRoute('/')({
    component: Index,
    loader: async () => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/posts`
        );
        if (!response.ok) {
            const posts: any = [];
            return posts;
        }
        const posts = (await response.json()) as Post[];
        return posts;
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
        return result.user;
    } catch (err) {
        console.error('Erro ao autenticar', err);
        return null;
    }
}

function Index() {
    const posts = Route.useLoaderData();

    return (
        <>
            <div>
                {posts.length === 0 ? (
                    <p>Não há posts no momento.</p>
                ) : (
                    posts.map((post: Post) => (
                        <HomePost
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            body={post.body}
                            createdAt={post.created_at}
                            imagePath={`${import.meta.env.VITE_API_URL}${post.image_path}`}
                        />
                    ))
                )}
            </div>
        </>
    );
}
