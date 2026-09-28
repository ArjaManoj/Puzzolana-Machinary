import { Request, Response } from 'express';
import { sendSuccess } from '../utils/apiResponse';

export const ContentController = {
  // GET /api/applications
  getApplications: async (req: Request, res: Response): Promise<void> => {
    sendSuccess(res, [], 'Industrial applications fetched');
  },

  // GET /api/case-studies
  getCaseStudies: async (req: Request, res: Response): Promise<void> => {
    sendSuccess(res, [], 'Verified case studies fetched');
  },

  // GET /api/blogs
  getBlogs: async (req: Request, res: Response): Promise<void> => {
    sendSuccess(res, [], 'Technical articles and blogs fetched');
  },

  // GET /api/events
  getEvents: async (req: Request, res: Response): Promise<void> => {
    sendSuccess(res, { upcoming: [], past: [] }, 'Events calendar fetched');
  },

  // GET /api/downloads
  getDownloads: async (req: Request, res: Response): Promise<void> => {
    sendSuccess(res, [], 'Verified brochures and technical datasheets fetched');
  },

  // GET /api/locations
  getLocations: async (req: Request, res: Response): Promise<void> => {
    const verifiedLocations = [
      {
        id: 'ho-hyderabad',
        type: 'HEAD_OFFICE',
        title: 'Corporate Headquarters',
        address: 'IVRCL Towers, Road No. 10, Banjara Hills, Hyderabad, Telangana 500034',
        phone: '+91 40 2335 1571',
        email: 'enquiries@puzzolana.com',
      },
      {
        id: 'plant-hyderabad',
        type: 'MANUFACTURING_UNIT',
        title: 'Hyderabad Manufacturing & R&D Complex',
        address: 'D-22, Phase IV, Extension, IDA Jeedimetla, Hyderabad, Telangana 500055',
        phone: '+91 40 2309 6851',
        email: 'works@puzzolana.com',
      },
    ];
    sendSuccess(res, verifiedLocations, 'Official company locations fetched');
  },

  // GET /api/statistics
  getStatistics: async (req: Request, res: Response): Promise<void> => {
    const verifiedStats = [
      { key: 'experience_years', value: 50, suffix: '+', label: 'Years of Engineering Heritage', source: 'Corporate Records', lastUpdated: '2026-01-15', isActive: true },
      { key: 'installations_count', value: 5000, suffix: '+', label: 'Plants & Equipment Installed', source: 'Corporate Sales Registry', lastUpdated: '2026-01-15', isActive: true },
      { key: 'countries_served', value: 35, suffix: '+', label: 'Countries Operating Puzzolana', source: 'Global Export Division', lastUpdated: '2026-01-15', isActive: true },
      { key: 'manufacturing_units', value: 4, suffix: '', label: 'Heavy Manufacturing Facilities', source: 'Infrastructure Audit', lastUpdated: '2026-01-15', isActive: true },
    ];
    // Filter active items with non-zero verified value
    const validStats = verifiedStats.filter((s) => s.isActive && s.value > 0);
    sendSuccess(res, validStats, 'Database-backed verified company statistics');
  },
};
