import React from 'react';
import { InboxIcon } from './icons/InboxIcon';

const SidebarLink: React.FC<{ 
    icon: React.ReactNode; 
    text: string; 
    active?: boolean; 
}> = ({ icon, text, active }) => (
    <div 
        className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-lg text-left cursor-pointer ${active ? 'bg-brand-s-blue/20 text-brand-s-blue' : 'text-brand-gray-700 hover:bg-brand-gray-200'}`}
    >
        <div className="flex items-center">
            {icon}
            <span className="ml-3">{text}</span>
        </div>
    </div>
);

export const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 flex-shrink-0 bg-brand-gray-100 p-4 border-r border-brand-gray-300 hidden md:block">
            <div className="flex items-center justify-center mb-6">
                <h1 className="text-2xl font-bold text-brand-gray-800">Mailbox</h1>
            </div>
            <nav className="space-y-2">
                <SidebarLink 
                    icon={<InboxIcon className="w-5 h-5" />} 
                    text="Inbox" 
                    active={true}
                />
            </nav>
        </aside>
    );
};