import React from 'react';
import { Account } from '../types';

interface FilterBarProps {
    accounts: Account[];
    selectedAccount: string;
    onAccountChange: (accountId: string) => void;
    folders: string[];
    selectedFolder: string;
    onFolderChange: (folder: string) => void;
    isLoading: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
    accounts,
    selectedAccount,
    onAccountChange,
    folders,
    selectedFolder,
    onFolderChange,
    isLoading
}) => {
    return (
        <div className="flex items-center space-x-2 w-full">
            <select
                value={selectedAccount}
                onChange={(e) => onAccountChange(e.target.value)}
                disabled={isLoading}
                className="w-1/2 pl-3 pr-8 py-2 text-sm bg-brand-gray-200 text-black border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent appearance-none"
            >
                <option value="">All Accounts</option>
                {accounts.map(acc => (
                    <option key={acc.email} value={acc.email} className="text-black">{acc.email}</option>
                ))}
            </select>
            <select
                value={selectedFolder}
                onChange={(e) => onFolderChange(e.target.value)}
                disabled={isLoading}
                className="w-1/2 pl-3 pr-8 py-2 text-sm bg-brand-gray-200 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent appearance-none"
            >
                <option value="">All Folders</option>
                {folders.map(folder => (
                    <option key={folder} value={folder}>{folder}</option>
                ))}
            </select>
        </div>
    );
};