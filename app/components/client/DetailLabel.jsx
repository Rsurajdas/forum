export default function DetailLabel({ value, title }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-semibold text-lg">{value || 0}</span>
      <span className="text-gray-500 text-base">{title}</span>
    </div>
  );
}
