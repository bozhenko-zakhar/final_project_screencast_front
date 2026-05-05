export interface DiaryEntry {
  title: string;
  description: string;
  emotions: string[];
  date: string;
}

export interface BackendDiaryEntry {
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
  id: string;
  title: string;
  date: string;
  emotions: Array<{
    id: string;
    title: string;
  }>;
}

export interface DiaryEntryDetail {
  id: string;
  title: string;
  date: string;
  description: string;
  emotions: Array<{
    id: string;
    title: string;
  }>;
}	