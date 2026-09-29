/**
 * Privacy-Conscious Client Telemetry & Analytics Tracker
 * Non-blocking, zero-PII client event logging for Puzzolana Platform
 */

import { getApiBaseUrl } from './api';

export type AnalyticsEventType =
  | 'page_view'
  | 'product_view'
  | 'search'
  | 'finder_run'
  | 'compare'
  | 'quote_click'
  | 'quote_submit'
  | 'download';

export async function trackEvent(
  eventType: AnalyticsEventType,
  path: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  if (typeof window === 'undefined') return;

  const payload = {
    eventType,
    path: path || window.location.pathname,
    metadata: {
      ...metadata,
      referrer: document.referrer || undefined,
      screenResolution: `${window.innerWidth}x${window.innerHeight}`,
    },
  };

  const apiBase = getApiBaseUrl();
  try {
    // Non-blocking beacon or fetch
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon(`${apiBase}/analytics/event`, blob);
    } else {
      fetch(`${apiBase}/analytics/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Fail silently without disrupting user interaction
  }
}

export const Analytics = {
  trackPageView: (path?: string, metadata?: Record<string, unknown>) =>
    trackEvent('page_view', path || (typeof window !== 'undefined' ? window.location.pathname : '/'), metadata),

  trackProductView: (model: string, category: string, additional?: Record<string, unknown>) =>
    trackEvent('product_view', typeof window !== 'undefined' ? window.location.pathname : '/products', {
      model,
      category,
      ...additional,
    }),

  trackSearch: (query: string, resultsCount: number, category?: string) =>
    trackEvent('search', '/search', { query, resultsCount, category }),

  trackFinderRun: (rockType: string, capacityTPH: number, stages: number) =>
    trackEvent('finder_run', '/finder', { rockType, capacityTPH, stages }),

  trackCompare: (models: string[]) =>
    trackEvent('compare', '/products/compare', { models, count: models.length }),

  trackDownload: (assetId: string, title: string, fileType: string, isGated: boolean) =>
    trackEvent('download', '/downloads', { assetId, title, fileType, isGated }),

  trackQuoteSubmit: (referenceId: string, category: string, capacityTPH?: number) =>
    trackEvent('quote_submit', '/quote', { referenceId, category, capacityTPH }),
};
