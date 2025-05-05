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
