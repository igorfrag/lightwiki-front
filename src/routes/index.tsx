import { createFileRoute } from '@tanstack/react-router';
import HomePost from '../components/HomePost';

interface Post {
    title: string;
    body: string;
    created_at: string;
    id: number;
}

export const Route = createFileRoute('/')({
    component: Index,
    loader: async () => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/posts`
        );
        if (!response.ok) {
            throw new Error('Error Fetching');
        }
        const posts = (await response.json()) as Post[];
        return posts;
    },
});

function Index() {
    const posts = Route.useLoaderData();

    return (
        <>
            {posts.map((post) => (
                <HomePost
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    body={post.body}
                    createdAt={post.created_at}
                />
            ))}
        </>
    );
}
