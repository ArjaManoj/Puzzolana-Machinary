import { Router } from 'express';
import { SearchController } from '../controllers/searchController';

const router = Router();

// GET /api/search (Unified multi-domain search across machinery, applications, articles, case studies, downloads, spares, dealers)
router.get('/', SearchController.search);

// GET /api/search/suggestions (Typeahead keywords and product suggestions for command palette)
router.get('/suggestions', SearchController.getSuggestions);

export default router;
