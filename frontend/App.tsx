import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { EmailList } from './components/EmailList';
import { EmailDetail } from './components/EmailDetail';
import { searchEmails, fetchAccounts } from './services/api';
import { EmailDocument, Account } from './types';

const PAGE_SIZE = 20;
const FOLDERS = ['INBOX', 'Sent', 'Spam', 'Trash'];

const App: React.FC = () => {
    const [emails, setEmails] = useState<EmailDocument[]>([]);
    const [selectedEmail, setSelectedEmail] = useState<EmailDocument | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<string>('');
    const [selectedFolder, setSelectedFolder] = useState<string>('');


    const loadEmails = useCallback(async (page: number, query: string, account: string, folder: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await searchEmails(query, account, folder, page, PAGE_SIZE);
            
            setEmails(response.emails);
            setTotalPages(response.totalPages);
            setCurrentPage(page);

            if (page === 1 && response.emails.length > 0 && !selectedEmail) {
                setSelectedEmail(response.emails[0]);
            } else if (response.emails.length === 0) {
                setSelectedEmail(null);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(`Failed to fetch emails: ${errorMessage}`);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [selectedEmail]);

    useEffect(() => {
        fetchAccounts()
            .then(setAccounts)
            .catch(err => {
                console.error("Failed to fetch accounts:", err);
                setError("Could not load accounts.");
            });
    }, []);

    useEffect(() => {
        loadEmails(currentPage, searchQuery, selectedAccount, selectedFolder);
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery, currentPage, selectedAccount, selectedFolder]);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
        }
    };
    
    const resetToFirstPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
        setSelectedEmail(null);
    }

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        resetToFirstPage();
    };

    const handleAccountChange = (accountId: string) => {
        setSelectedAccount(accountId);
        resetToFirstPage();
    };

    const handleFolderChange = (folder: string) => {
        setSelectedFolder(folder);
        resetToFirstPage();
    };


    return (
        <div className="flex h-screen font-sans text-brand-gray-800 antialiased">
            <Sidebar />
            <main className="flex flex-1 overflow-hidden">
                <EmailList
                    emails={emails}
                    selectedEmail={selectedEmail}
                    onSelectEmail={setSelectedEmail}
                    isLoading={isLoading}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    onSearch={handleSearch}
                    accounts={accounts}
                    selectedAccount={selectedAccount}
                    onAccountChange={handleAccountChange}
                    folders={FOLDERS}
                    selectedFolder={selectedFolder}
                    onFolderChange={handleFolderChange}
                />
                <EmailDetail email={selectedEmail} />
            </main>
             {error && <div className="absolute bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">{error}</div>}
        </div>
    );
};

export default App;