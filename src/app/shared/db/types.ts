export interface Note {
  id: number;
  title: string;
  notes: string;
  archived?: boolean;
  pinned?: boolean;
  created?: string;
  lastUpdated?: string;
}
