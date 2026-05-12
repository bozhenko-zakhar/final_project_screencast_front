export interface DiaryEntry {
  title: string;
  description: string;
  emotions: string[];
  date: string;
}

export interface BackendDiaryEntry {
	data: DiaryEntry;
  _id: {
    $oid: string;
  };
  userId: string;
  title: string;
  description: string;
  emotions: Array<{
    _id: {
      $oid: string;
    };
    title: string;
  }>;
  date: string;
  __v?: number;
}

export interface DiaryListItem {
  _id: string;
  title: string;
  date: string;
	description: string;
  emotions: Array<{
    id: string;
    title: string;
  }>;
	// owner: string
}

export interface DiaryEntryDetail {
  _id: string;
  title: string;
  date: string;
  description: string;
  emotions: Array<{
    id: string;
    title: string;
  }>;
}	
