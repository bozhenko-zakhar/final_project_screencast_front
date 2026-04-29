export default function GreetingBlock({ userName }: { userName: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Доброго ранку, {userName}!
      </h2>
    </div>
  );
}