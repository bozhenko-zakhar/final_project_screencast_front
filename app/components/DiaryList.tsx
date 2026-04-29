import DiaryEntryCard from './DiaryEntryCard';

export default function DiaryList({ entries, onSelectEntry }: { entries: any[], onSelectEntry?: (entry: any) => void }) {
  return (
    <div className="flex flex-col flex-grow md:overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Ваші записи</h1>
        <button className="text-sm font-medium text-gray-600 flex items-center gap-1 hover:text-black">
          Новий запис <span className="text-lg">+</span>
        </button>
      </div>

      <div className="flex flex-col gap-3 md:overflow-y-auto pr-2 pb-4">
        {entries.map((entry) => (
          <DiaryEntryCard 
            key={entry.id} 
            entry={entry} 
            onClick={() => onSelectEntry && onSelectEntry(entry)} 
          />
        ))}
      </div>
    </div>
  );
}