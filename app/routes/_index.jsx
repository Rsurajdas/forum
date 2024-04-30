export const meta = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <h1 className="text-3xl font-bold underline text-green-400">
      Hello world!
    </h1>
  );
}
