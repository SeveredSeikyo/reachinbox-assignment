// FIX: Removed self-import of AICategory, which was causing a name collision error because it was being imported in the same file where it was defined.
export enum AICategory {
    Interested = 'Interested',
    MeetingBooked = 'Meeting Booked',
    NotInterested = 'Not Interested',
    Spam = 'Spam',
    OutOfOffice = 'Out of Office',
    Uncategorized = 'Uncategorized'
}

export interface Account {
    id: string;
    email: string;
    provider: string;
}

export interface EmailDocument {
    id: string; 
    accountId: string;
    folder: string; 
    subject: string;
    body: string;
    from?: string;
    to?: string[];
    date: Date;
    aiCategory: AICategory;
    indexedAt: Date;
}