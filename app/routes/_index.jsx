import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { getUserFromSession } from "../utils/auth.server";

export const meta = () => {
  return [
    { title: 'Forum' },
    { name: 'description', content: 'Welcome to Forum!' },
  ];
};

export const loader = async ({ request }) => {
  return await getUserFromSession(request)
}

export default function Index() {
  const profileId = useLoaderData()
  const fetcher = useFetcher()
  const navigate = useNavigate()

  const handler = () => {
    if (profileId) {
      fetcher.submit(null, {
        method: "POST",
        action: "/logout"
      })
    } else {
      navigate("/login")
    }
  }
  return (
    <>
      {console.log(profileId)}
      <main className="ml-20 mt-14">
        <section className="py-12">
          <div className="xl:container">
            <div className="flex flex-col items-start gap-y-4">
              <h1>Home page</h1>
              <button className="bg-indigo-700 py-2 px-4 text-white rounded-md hover:bg-indigo-900" onClick={handler}>{profileId ? "Logout" : "Login"}</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
