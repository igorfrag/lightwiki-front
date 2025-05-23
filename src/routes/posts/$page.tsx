import { createFileRoute } from '@tanstack/react-router';
import HomePost from '../../components/HomePost';
import { Link } from '@tanstack/react-router';

interface Post {
    title: string;
    body: string;
    created_at: string;
    id: number;
    image_path: string;
    name: string;
    user_id: string;
}

interface PostResponse {
    content: Post[];
    maxPages: number;
}

export const Route = createFileRoute('/posts/$page')({
    component: PostsPage,
    loader: async ({ params }) => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/posts/${params.page}`
        );
        if (!response.ok) {
            const posts: any = [];
            return posts;
        }
        const posts = (await response.json()) as PostResponse;
        if (!posts.content || !posts.maxPages) {
            return { content: [], maxPages: 1 };
        }
        return posts;
    },
});

function PostsPage() {
    const posts = Route.useLoaderData();
    const { page } = Route.useParams();
    const currentPage = Number(page);
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === posts.maxPages;
    const isSinglePage = posts.maxPages <= 1;

    return (
        <>
            <div>
                {posts.content.length === 0 ? (
                    <p>Não há posts no momento.</p>
                ) : (
                    posts.content.map((post: Post) => (
                        <HomePost
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            body={post.body}
                            createdAt={post.created_at}
                            imagePath={`${import.meta.env.VITE_API_URL}${post.image_path}`}
                            createdBy={post.name ? post.name : 'Anonymous'}
                        />
                    ))
                )}
            </div>

            {isSinglePage ? (
                <></>
            ) : isLastPage ? (
                <div
                    className='pagination-div'
                    style={{ flexDirection: 'row' }}
                >
                    <Link
                        to='/posts/$page'
                        params={{ page: (parseInt(page) - 1).toString() }}
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }
                    >
                        <button>{'<   '}Previous</button>
                    </Link>
                </div>
            ) : isFirstPage ? (
                <div className='pagination-div'>
                    <Link
                        to='/posts/$page'
                        params={{ page: (parseInt(page) + 1).toString() }}
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }
                    >
                        <button>Next{'   >'}</button>
                    </Link>
                </div>
            ) : (
                <div className='pagination-div'>
                    <Link
                        to='/posts/$page'
                        params={{ page: (parseInt(page) + 1).toString() }}
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }
                    >
                        <button>Next{'   >'}</button>
                    </Link>
                    <Link
                        to='/posts/$page'
                        params={{ page: (parseInt(page) - 1).toString() }}
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }
                    >
                        <button>{'<   '}Previous</button>
                    </Link>
                </div>
            )}
        </>
    );
}

export default PostsPage;
