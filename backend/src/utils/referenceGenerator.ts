/**
 * Enterprise B2B Enquiry Reference Generator
 * Formats:
 * - Quote: PZQ-YYYY-XXXXXX
 * - Service: PZS-YYYY-XXXXXX
 * - Spare Parts: PZP-YYYY-XXXXXX
 * - Dealer: PZD-YYYY-XXXXXX
 * - Job Application: PZJ-YYYY-XXXXXX
 * - General Contact: PZC-YYYY-XXXXXX
 */

export type EnquiryType = 'QUOTE' | 'SERVICE' | 'SPARES' | 'DEALER' | 'CAREER' | 'CONTACT';

const TYPE_PREFIX_MAP: Record<EnquiryType, string> = {
  QUOTE: 'PZQ',
  SERVICE: 'PZS',
  SPARES: 'PZP',
  DEALER: 'PZD',
  CAREER: 'PZJ',
  CONTACT: 'PZC',
};

export const generateReferenceId = (type: EnquiryType = 'QUOTE'): string => {
  const prefix = TYPE_PREFIX_MAP[type] || 'PZQ';
  const year = new Date().getFullYear();
  // 6-digit zero-padded cryptographic-pseudorandom integer
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${year}-${randomNum}`;
};
