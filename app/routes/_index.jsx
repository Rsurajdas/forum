import { useFetcher } from "@remix-run/react";

export const meta = () => {
  return [
    { title: 'Forum' },
    { name: 'description', content: 'Welcome to Forum!' },
  ];
};

export default function Index() {
  const fetcher = useFetcher()

  const handleLogout = () => {
    fetcher.submit(null, {
      method: "POST",
      action: "/logout"
    })
  }
  return (
    <>
      <main>
        <section className="py-12">
          <div className="xl:container">
            <div className="flex flex-col items-start gap-y-4">
              <h1>Home page</h1>
              <button className="bg-indigo-700 py-2 px-4 text-white rounded-md hover:bg-indigo-900" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
