import { Request, Response } from 'express';
import { ContentService } from '../services/contentService';
import { sendSuccess } from '../utils/apiResponse';

export const ContentController = {
  // GET /api/applications
  getApplications: async (req: Request, res: Response): Promise<void> => {
    const applications = await ContentService.getApplications();
    sendSuccess(res, applications, 'Industrial applications fetched');
  },

  // GET /api/case-studies
  getCaseStudies: async (req: Request, res: Response): Promise<void> => {
    const studies = await ContentService.getCaseStudies();
    sendSuccess(res, studies, 'Verified case studies fetched');
  },

  // GET /api/blogs
  getBlogs: async (req: Request, res: Response): Promise<void> => {
    const blogs = await ContentService.getBlogs();
    sendSuccess(res, blogs, 'Technical articles and blogs fetched');
  },

  // GET /api/events
  getEvents: async (req: Request, res: Response): Promise<void> => {
    const events = await ContentService.getEvents();
    sendSuccess(res, events, 'Events calendar fetched');
  },

  // GET /api/downloads
  getDownloads: async (req: Request, res: Response): Promise<void> => {
    const downloads = await ContentService.getDownloads();
    sendSuccess(res, downloads, 'Verified brochures and technical datasheets fetched');
  },

  // GET /api/locations
  getLocations: async (req: Request, res: Response): Promise<void> => {
    const locations = await ContentService.getLocations();
    sendSuccess(res, locations, 'Official company locations fetched');
  },

  // GET /api/statistics
  getStatistics: async (req: Request, res: Response): Promise<void> => {
    const statistics = await ContentService.getStatistics();
    sendSuccess(res, statistics, 'Database-backed verified company statistics');
  },
};
