import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import Header from '../components/header';
import Footer from '../components/Footer';
import '../main.css';

export const Route = createRootRoute({
    component: () => (
        <>
            <Header title='Lightwiki' />
            <main className='page-content'>
                <Outlet />
            </main>

            <Footer />
            <TanStackRouterDevtools />
        </>
    ),
});
