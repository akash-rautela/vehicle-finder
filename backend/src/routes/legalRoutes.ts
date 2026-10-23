import express, { Request, Response } from 'express';

const router = express.Router();

/**
 * GET /api/legal
 * Returns current legal policy metadata.
 * Useful for the frontend to display "last updated" dates
 * without hard-coding them in multiple places.
 */
router.get('/', (req: Request, res: Response) => {
  res.json({
    siteName: 'MotoMatch',
    author: 'Akash Rautela',
    contact: 'akashrautelacms@gmail.com',
    privacyPolicy: {
      version: '1.0',
      lastUpdated: '2026-10-23',
      url: '/privacy',
    },
    termsOfUse: {
      version: '1.0',
      lastUpdated: '2026-10-23',
      url: '/terms',
    },
    dataCollection: {
      visitorData: false,
      cookies: false,
      analytics: false,
      adminAccountData: true,
      thirdPartyServices: ['Vercel', 'MongoDB Atlas', 'Cloudinary'],
    },
  });
});

export default router;
