'use client';
import { useState } from 'react';
// Використовуємо @/ для надійності, якщо налаштовано в tsconfig
import GreetingBlock from '../components/GreetingBlock';
import DiaryList from '../components/DiaryList';
import DiaryEntryDetails from '../components/DiaryEntryDetails';

export default function DiaryPage() {
  // Початкові дані (база)
  const [entries, setEntries] = useState([
    { 
      id: '1', 
      title: 'Перший привіт', 
      date: '15 липня 2025', 
      tags: ['натхнення', 'вдячність'], 
      content: 'Це сталось! Сьогодні ввечері я зрозуміла...' 
    }
  ]);

  const [selectedEntry, setSelectedEntry] = useState<any>(entries[0]);

  return (
    // md:h-screen та overflow-hidden забезпечують фіксовану висоту на десктопі
    <div className="flex flex-col md:flex-row gap-8 p-4 md:p-12 md:h-screen overflow-hidden bg-[#FDFCFB]">
      
      {/* Спискова частина */}
      <div className="w-full md:w-[400px] flex flex-col h-full">
        <GreetingBlock userName="Ганна" />
        <div className="flex-grow overflow-hidden mt-4">
          <DiaryList 
            entries={entries} 
            onSelectEntry={(entry) => setSelectedEntry(entry)} 
          />
        </div>
      </div>

      {/* Деталі запису: показуємо на десктопі поруч */}
      <div className="hidden md:flex flex-col flex-grow bg-white rounded-[40px] p-10 shadow-sm border border-gray-50 h-full overflow-hidden">
        {entries.length > 0 ? (
          <DiaryEntryDetails 
            entry={selectedEntry} 
            onEdit={(e: any) => console.log('Edit', e)}
            onDelete={(id: string) => setEntries(entries.filter(i => i.id !== id))}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Наразі записи у щоденнику відсутні
          </div>
        )}
      </div>
    </div>
  );
}