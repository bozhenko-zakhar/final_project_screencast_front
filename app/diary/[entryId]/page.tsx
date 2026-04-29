'use client';
import DiaryEntryDetails from '@/app/components/DiaryEntryDetails';
import Link from 'next/link';

const getEntryById = (id: string) => {
  return { 
    id, 
    title: 'Перший привіт', 
    date: '15 липня 2025', 
    tags: ['Натхнення', 'Вдячність'], 
    content: 'Це сталось! Сьогодні ввечері, коли я спокійно дивилася фільм...' 
  };
};

export default function MobileDiaryEntryPage({ params }: { params: { entryId: string } }) {
  const entry = getEntryById(params.entryId);

  return (
    <div className="p-4 flex flex-col h-screen md:hidden bg-[#FDFCFB]">
      <Link href="/diary" className="text-[#FF9B9B] mb-4 inline-block font-medium">
        &larr; Назад до щоденника
      </Link>
      
      <div className="bg-white rounded-[32px] p-6 flex-grow overflow-hidden shadow-sm border border-gray-50">
        <DiaryEntryDetails 
           entry={entry} 
           onEdit={() => console.log('Edit')} 
           onDelete={() => console.log('Delete')} 
        />
      </div>
    </div>
  );
}