import { createFileRoute } from '@tanstack/react-router';
import NewPost from '../../components/NewPost';

export const Route = createFileRoute('/post/new-post')({
    component: NewPostRoute,
});

function NewPostRoute() {
    return <NewPost />;
}
