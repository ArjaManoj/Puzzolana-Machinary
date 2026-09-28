import { Request, Response, NextFunction } from 'express';

const SCRIPT_TAG_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const EVENT_HANDLER_REGEX = /\bon\w+\s*=\s*(['"][^'"]*['"]|[^\s>]+)/gi;
const JS_PROTOCOL_REGEX = /javascript\s*:[^<>\r\n]*/gi;
const VBS_PROTOCOL_REGEX = /vbscript\s*:[^<>\r\n]*/gi;
const DATA_HTML_REGEX = /data\s*:\s*text\/html[^<>\r\n]*/gi;

/**
 * Strips active script tags, DOM event handlers, and script protocols from a string.
 */
export function sanitizeXssString(str: string): string {
  if (typeof str !== 'string') return str;
  return str
    .replace(SCRIPT_TAG_REGEX, '')
    .replace(EVENT_HANDLER_REGEX, '')
    .replace(JS_PROTOCOL_REGEX, '')
    .replace(VBS_PROTOCOL_REGEX, '')
    .replace(DATA_HTML_REGEX, '')
    .trim();
}

/**
 * Recursively traverses arrays and objects to sanitize nested strings.
 */
export function sanitizeXssValue(val: any): any {
  if (val === null || val === undefined) return val;
  if (typeof val === 'string') {
    return sanitizeXssString(val);
  }
  if (Array.isArray(val)) {
    return val.map(sanitizeXssValue);
  }
  if (typeof val === 'object') {
    const sanitizedObj: Record<string, any> = {};
    for (const key of Object.keys(val)) {
      sanitizedObj[key] = sanitizeXssValue(val[key]);
    }
    return sanitizedObj;
  }
  return val;
}

/**
 * Express middleware for XSS payload neutralization on req.body, req.query, and req.params.
 */
export const xssSanitize = (req: Request, _res: Response, next: NextFunction): void => {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeXssValue(req.body);
  }
  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeXssValue(req.query);
  }
  if (req.params && typeof req.params === 'object') {
    req.params = sanitizeXssValue(req.params);
  }
  next();
};
