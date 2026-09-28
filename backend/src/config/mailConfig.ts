export interface MailConfig {
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
  fromAddress: string;
  fromName: string;
  internalSalesEmail: string;
  internalServiceEmail: string;
  internalPartsEmail: string;
  internalCareersEmail: string;
  internalCadDeskEmail: string;
  isMock: boolean;
}

export const mailConfig: MailConfig = {
  host: process.env.SMTP_HOST || 'smtp.puzzolana.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  user: process.env.SMTP_USER || 'noreply@puzzolana.com',
  pass: process.env.SMTP_PASS || '',
  fromAddress: process.env.SMTP_FROM || 'noreply@puzzolana.com',
  fromName: 'Puzzolana Heavy Machinery OEM',
  internalSalesEmail: process.env.NOTIFICATION_SALES_EMAIL || 'sales@puzzolana.com',
  internalServiceEmail: process.env.NOTIFICATION_SERVICE_EMAIL || 'service@puzzolana.com',
  internalPartsEmail: process.env.NOTIFICATION_PARTS_EMAIL || 'spares@puzzolana.com',
  internalCareersEmail: process.env.NOTIFICATION_CAREERS_EMAIL || 'careers@puzzolana.com',
  internalCadDeskEmail: process.env.NOTIFICATION_CAD_EMAIL || 'engineering@puzzolana.com',
  // If no SMTP_HOST is explicitly defined or in test mode, default to safe simulation mode
  isMock: process.env.NODE_ENV === 'test' || !process.env.SMTP_PASS,
};
