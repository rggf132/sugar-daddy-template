/**
 * Domain Configuration
 *
 * This is the FIRST FILE you edit when creating a new app from this template.
 * It defines your app's identity, routes, features, and payment branding.
 *
 * After editing this file:
 * 1. Update db/schema.ts table definitions (already uses tablePrefix from here)
 * 2. Replace src/modules/events/ with your domain module
 * 3. Replace src/app/api/events/ with your domain API routes
 * 4. Update src/app/ page routes to match your domain
 */

export const domainConfig = {
  tablePrefix: 'app',

  app: {
    name: 'My App',
    description: 'A brief description of your app',
    logo: '/logo.png',
  },

  listing: {
    singular: 'listing',
    plural: 'listings',
    searchPlaceholder: 'Search listings...',
    detailParam: 'listingId',
  },

  routes: {
    listing: (id: string | number) => `/listings/${id}`,
    adminListing: (id: string | number) => `/admin/listings/${id}`,
  },

  features: {
    hasDateRange: false,
    hasEntryType: false,
    hasSubscriptions: true,
    hasOneTimePayments: true,
  },

  payments: {
    businessName: 'My App',
    subscriptionFeatures: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
    ],
  },
}

export type DomainConfig = typeof domainConfig
