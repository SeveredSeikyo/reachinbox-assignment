import React from 'react';
import { EmailDocument, Account } from '../types';
import { EmailListItem } from './EmailListItem';
import { Pagination } from './Pagination';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';

interface EmailListProps {
  emails: EmailDocument[];
  selectedEmail: EmailDocument | null;
  onSelectEmail: (email: EmailDocument) => void;
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSearch: (query: string) => void;
  accounts: Account[];
  selectedAccount: string;
  onAccountChange: (accountId: string) => void;
  folders: string[];
  selectedFolder: string;
  onFolderChange: (folder: string) => void;
}

const SkeletonLoader: React.FC = () => (
  <div className="p-4 border-b border-brand-gray-200 animate-pulse">
    <div className="h-4 bg-brand-gray-200 rounded w-1/3 mb-2"></div>
    <div className="h-4 bg-brand-gray-200 rounded w-2/3 mb-2"></div>
    <div className="h-3 bg-brand-gray-200 rounded w-1/4"></div>
  </div>
);

export const EmailList: React.FC<EmailListProps> = ({
  emails,
  selectedEmail,
  onSelectEmail,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  onSearch,
  accounts,
  selectedAccount,
  onAccountChange,
  folders,
  selectedFolder,
  onFolderChange,
}) => {
  return (
    <div className="flex flex-col bg-white w-full md:w-96 border-r border-brand-gray-300 flex-shrink-0">
      <div className="p-4 border-b border-brand-gray-300 space-y-4">
        <FilterBar 
          accounts={accounts}
          selectedAccount={selectedAccount}
          onAccountChange={onAccountChange}
          folders={folders}
          selectedFolder={selectedFolder}
          onFolderChange={onFolderChange}
          isLoading={isLoading}
        />
        <SearchBar onSearch={onSearch} isSearching={isLoading} />
      </div>
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => <SkeletonLoader key={i} />)
        ) : emails.length > 0 ? (
          emails.map(email => (
            <EmailListItem
              key={email.id}
              email={email}
              isSelected={selectedEmail?.id === email.id}
              onSelect={onSelectEmail}
            />
          ))
        ) : (
          <div className="p-8 text-center text-brand-gray-500">
            <p>No emails found.</p>
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        isLoading={isLoading}
      />
    </div>
  );
};