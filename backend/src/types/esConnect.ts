// Conceptual Interface
export interface EmailDocument {
    id: string; 
    accountId: string;
    folder: string; 
    subject: string;
    body: string;
    from: string;
    to: string[];
    date: Date;
    aiCategory: 'Interested' | 'Meeting Booked' | 'Not Interested' | 'Spam' | 'Out of Office' | 'Uncategorized';
    indexedAt: Date;
}

export interface EmailSearchQuery {
  q?: string;
  account?: string;
  folder?: string;
}
