import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/$postid')({
    loader: async ({ params }) => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/posts/${params.postid}`
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
        <div>
            <h2>{post.title}</h2>
            <div className='post-content'>
                <p>{post.body}</p>
            </div>
        </div>
    );
}
