import { EmailDocument, Account } from '../types';

const API_BASE_URL = 'http://localhost:5000';

export interface PaginatedResponse {
  emails: EmailDocument[];
  totalEmails: number;
  totalPages: number;
}

const parseEmailDates = (email: any): EmailDocument => ({
  ...email,
  date: new Date(email.date),
  indexedAt: new Date(email.indexedAt),
});

const parseAndValidateJson = async (response: Response) => {
    const text = await response.text();
    if (!text) {
        return null;
    }
    try {
        return JSON.parse(text);
    } catch (e) {
        console.error("Failed to parse JSON response:", text);
        throw new Error(`Failed to parse server response. Status was ${response.status}, but the body was not valid JSON.`);
    }
};

export const fetchAccounts = async (): Promise<Account[]> => {
    const response = await fetch(`${API_BASE_URL}/api/accounts`);
    if (!response.ok) {
        throw new Error('Failed to fetch accounts');
    }
    const data = await parseAndValidateJson(response);
    return data || [];
};

export const searchEmails = async (
    query: string,
    account: string,
    folder: string,
    page: number,
    pageSize: number
): Promise<PaginatedResponse> => {
    const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
    });
    if (query) params.set('q', query);
    if (account) params.set('account', account);
    if (folder) params.set('folder', folder);

    const response = await fetch(`${API_BASE_URL}/api/emails/search?${params.toString()}`);
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await parseAndValidateJson(response);

    if (Array.isArray(data)) {
        return {
            emails: data.map(parseEmailDates),
            totalPages: data.length < pageSize ? page : page + 1,
            totalEmails: 0,
        };
    } else if (data && typeof data === 'object' && Array.isArray(data.emails)) {
        return {
            ...data,
            emails: (data.emails || []).map(parseEmailDates),
        };
    }
    
    return { emails: [], totalPages: 1, totalEmails: 0 };
};