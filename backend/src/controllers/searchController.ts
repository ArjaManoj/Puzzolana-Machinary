import { Request, Response } from 'express';
import { SearchService, SearchFilterOptions } from '../services/searchService';
import { AnalyticsService } from '../services/analyticsService';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const SearchController = {
  // GET /api/search?q=PJC&category=all&minCapacity=200&limit=30
  search: async (req: Request, res: Response): Promise<void> => {
    try {
      const q = (req.query.q as string) || '';
      const category = (req.query.category as any) || 'all';
      const minCapacity = req.query.minCapacity ? parseInt(req.query.minCapacity as string, 10) : undefined;
      const maxCapacity = req.query.maxCapacity ? parseInt(req.query.maxCapacity as string, 10) : undefined;
      const mobility = req.query.mobility as any;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 30;

      const options: SearchFilterOptions = {
        category,
        minCapacity,
        maxCapacity,
        mobility,
        limit,
      };

      const results = await SearchService.searchAll(q, options);

      // Log analytics event asynchronously
      if (q.trim()) {
        AnalyticsService.recordEvent(
          'search',
          req.originalUrl || '/api/search',
          { query: q, category, totalHits: results.totalHits },
          req.ip,
          req.get('user-agent')
        );
      }

      sendSuccess(res, results, `Found ${results.totalHits} matching results for '${q}'`);
    } catch (err) {
      sendError(res, (err as Error).message || 'Failed to process global search query', 500);
    }
  },

  // GET /api/search/suggestions?q=cone
  getSuggestions: async (req: Request, res: Response): Promise<void> => {
    try {
      const q = (req.query.q as string) || '';
      const suggestions = SearchService.getSuggestions(q);
      sendSuccess(res, suggestions, 'Search suggestions retrieved');
    } catch (err) {
      sendError(res, (err as Error).message || 'Failed to retrieve suggestions', 500);
    }
  },
};
