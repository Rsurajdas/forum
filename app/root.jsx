import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from '@remix-run/react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import tailwindStyles from './styles/tailwind.css?url';
import Header from './components/client/Header';
import globalStyles from './styles/global.css?url';

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body className="bg-stone-50 font-mono relative">
        <Header />
        <MantineProvider>{children}</MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate()
  return (
    <html lang="en">
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <main>
          <section className='relative h-screen'>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-3xl w-full leading-normal py-4">
              <div className="relative h-[150px] leading-[150px] mb-6">
                <h1 className='font-404 text-[186px] font-black m-0 uppercase text-gray-300'>
                  {error.status}
                </h1>
              </div>
              <h2 className='font-404 text-[26px] font-bold m-0 text-gray-600'>
                {isRouteErrorResponse(error)
                  ? error.statusText
                  : error instanceof Error
                    ? error.message
                    : "Unknown Error"
                }
              </h2>
              <p className='text-sm font-semibold uppercase mb-0 text-gray-600'>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
              <button
                className="bg-indigo-700 text-white py-2 px-6 text-base rounded-sm transition-all ease-in active:translate-y-1 mt-4"
                onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
          </section>
        </main>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export const links = () => [
  { rel: 'stylesheet', href: tailwindStyles },
  { rel: 'stylesheet', href: globalStyles },
];
