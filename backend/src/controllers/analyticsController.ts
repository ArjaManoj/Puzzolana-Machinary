import { Request, Response } from 'express';
import { AnalyticsService, EventType } from '../services/analyticsService';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const AnalyticsController = {
  // POST /api/analytics/event (Public Ingestion)
  postEvent: async (req: Request, res: Response): Promise<void> => {
    const { eventType, path, metadata } = req.body;

    const validEvents: EventType[] = [
      'page_view',
      'product_view',
      'search',
      'finder_run',
      'compare',
      'quote_click',
      'quote_submit',
      'download',
    ];

    if (!eventType || !validEvents.includes(eventType)) {
      sendError(res, 'Invalid or missing eventType', 400);
      return;
    }

    if (!path) {
      sendError(res, 'Path is required for telemetry recording', 400);
      return;
    }

    const recorded = await AnalyticsService.recordEvent(
      eventType,
      path,
      metadata,
      req.ip,
      req.headers['user-agent']
    );

    sendSuccess(res, { id: recorded.id, timestamp: recorded.timestamp }, 'Telemetry event recorded', 201);
  },

  // GET /api/analytics/metrics (Protected)
  getMetrics: async (req: Request, res: Response): Promise<void> => {
    const metrics = await AnalyticsService.getAggregatedMetrics();
    sendSuccess(res, metrics, 'Aggregated telemetry metrics fetched');
  },

  // GET /api/analytics/funnel (Protected)
  getFunnel: async (req: Request, res: Response): Promise<void> => {
    const funnel = await AnalyticsService.getConversionFunnel();
    sendSuccess(res, funnel, 'Conversion funnel metrics fetched');
  },

  // GET /api/analytics/live (Protected)
  getLiveStream: async (req: Request, res: Response): Promise<void> => {
    const { limit } = req.query;
    const events = AnalyticsService.getLiveEventStream(limit ? parseInt(limit as string, 10) : 30);
    sendSuccess(res, events, 'Live telemetry stream fetched');
  },
};
