export const meta = () => {
  return [
    { title: 'Forum' },
    { name: 'description', content: 'Welcome to Forum!' },
  ];
};

export default function Index() {
  return (
    <>
      <main>
        <section className="py-12">
          <div className="xl:container">
            <div className="flex">
              <h1>Home page</h1>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
