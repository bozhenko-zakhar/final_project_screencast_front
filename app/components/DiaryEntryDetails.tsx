export default function DiaryEntryDetails({ entry }: { entry: any }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{entry.title}</h2>
        <div className="flex gap-2">
          <button className="text-sm px-3 py-1 bg-white rounded-md shadow-sm">Редагувати</button>
          <button className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded-md shadow-sm">Видалити</button>
        </div>
      </div>
      
      <span className="text-sm text-gray-500 mb-4">{entry.date}</span>
      
      <div className="flex-grow overflow-y-auto pr-2 text-gray-700 whitespace-pre-wrap">
        {entry.content}
      </div>

      <div className="flex gap-2 mt-6 pt-4 border-t border-gray-200">
        {entry.tags?.map((tag: string, index: number) => (
          <span key={index} className="bg-gray-100 text-xs px-3 py-1 rounded-full text-gray-600">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}