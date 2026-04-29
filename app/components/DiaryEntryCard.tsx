import Link from 'next/link';

type EntryProps = {
  id: string;
  title: string;
  date: string;
  tags: string[];
};

export default function DiaryEntryCard({ entry, onClick }: { entry: EntryProps; onClick?: () => void }) {
  return (
    // На мобілці - посилання, на десктопі - кнопка
    <Link 
      href={`/diary/${entry.id}`} 
      onClick={(e) => {
        if (window.innerWidth >= 768 && onClick) {
          e.preventDefault(); // Запобігаємо переходу на нову сторінку на десктопі
          onClick();
        }
      }}
      className="block w-full text-left"
    >
      <div className="bg-[#FFEFEF] p-4 rounded-xl cursor-pointer hover:bg-[#FFEDED] transition-colors flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800">{entry.title}</h3>
          <span className="text-xs text-gray-500">{entry.date}</span>
        </div>
        
        <div className="flex gap-2 mt-2">
          {entry.tags.map((tag, index) => (
            <span key={index} className="bg-white text-xs px-2 py-1 rounded-full text-gray-600 shadow-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}