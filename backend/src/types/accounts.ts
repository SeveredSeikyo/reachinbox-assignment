export interface EmailAccount {
  id: string;
  email: string;
  provider: 'gmail' | 'outlook' | 'other';
}
