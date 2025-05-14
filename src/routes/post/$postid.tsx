import { createFileRoute } from '@tanstack/react-router';
import HomePost from '../../components/HomePost';

export const Route = createFileRoute('/post/$postid')({
    loader: async ({ params }) => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/post/${params.postid}`
        );
        if (!response.ok) {
            throw new Error('Error fetching');
        }
        const post = await response.json();
        return post;
    },
    component: PostPage,
});

function PostPage() {
    const post = Route.useLoaderData();

    return (
        <HomePost
            title={post.title}
            body={post.body}
            createdAt={post.created_at}
            id={post.id}
            imagePath={`${import.meta.env.VITE_API_URL}${post.image_path}`}
        />
    );
}
