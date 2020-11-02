export interface Note {
  id: string;
  title: string;
  notes: string;
  archived?: boolean;
  pinned?: boolean;
  created?: string;
  lastUpdated?: string;
}
