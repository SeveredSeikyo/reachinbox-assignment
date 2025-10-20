
import React from 'react';
import { EmailDocument } from '../types';

interface EmailDetailProps {
  email: EmailDocument | null;
}

export const EmailDetail: React.FC<EmailDetailProps> = ({ email }) => {
  if (!email) {
    return (
      <div className="flex-1 h-full flex items-center justify-center bg-brand-gray-100">
        <div className="text-center text-brand-gray-500">
          <p className="text-lg">Select an email to read</p>
          <p>Nothing selected</p>
        </div>
      </div>
    );
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(email.date);

  return (
    <div className="flex-1 h-full overflow-y-auto bg-white p-6 md:p-8">
      <h2 className="text-2xl font-bold text-brand-gray-800 mb-4">{email.subject}</h2>
      <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-brand-gray-200">
        <div className="w-10 h-10 bg-brand-s-blue text-white rounded-full flex items-center justify-center font-bold text-xl">
          {(email.from || '?').charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-brand-gray-900">{email.from || 'Unknown Sender'}</p>
          <p className="text-sm text-brand-gray-600">To: {(email.to || []).join(', ')}</p>
        </div>
        <div className="flex-1 text-right">
          <p className="text-sm text-brand-gray-600">{formattedDate}</p>
        </div>
      </div>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: email.body }}
      />
    </div>
  );
};
