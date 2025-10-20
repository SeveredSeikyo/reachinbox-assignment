
import React from 'react';
import { EmailDocument, AICategory } from '../types';

interface EmailListItemProps {
  email: EmailDocument;
  isSelected: boolean;
  onSelect: (email: EmailDocument) => void;
}

const getCategoryClass = (category: AICategory) => {
  switch (category) {
    case AICategory.Interested:
      return 'bg-green-100 text-green-800';
    case AICategory.MeetingBooked:
      return 'bg-blue-100 text-blue-800';
    case AICategory.NotInterested:
      return 'bg-red-100 text-red-800';
    case AICategory.Spam:
      return 'bg-yellow-100 text-yellow-800';
    case AICategory.OutOfOffice:
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const EmailListItem: React.FC<EmailListItemProps> = ({ email, isSelected, onSelect }) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(email.date);

  return (
    <div
      onClick={() => onSelect(email)}
      className={`p-4 border-b border-brand-gray-200 cursor-pointer hover:bg-brand-s-blue/10 transition-colors duration-150 ${isSelected ? 'bg-brand-s-blue/20' : 'bg-white'}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 overflow-hidden">
          <p className="font-semibold text-brand-gray-800 truncate">{email.from || 'Unknown Sender'}</p>
          <p className="font-medium text-brand-gray-700 truncate">{email.subject}</p>
        </div>
        <div className="text-right ml-4 flex-shrink-0">
          <p className="text-xs text-brand-gray-500">{formattedDate}</p>
        </div>
      </div>
      <div className="mt-2 flex items-center">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getCategoryClass(email.aiCategory)}`}>
          {email.aiCategory}
        </span>
      </div>
    </div>
  );
};
