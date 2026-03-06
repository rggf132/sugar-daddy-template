import { domainConfig } from 'src/domain.config'

export const PageUrls = {
  home: () => '/',
  adminHome: () => '/admin/',
  listing: ({ id }: { id: string | number }) => domainConfig.routes.listing(id),
  adminListing: ({ id }: { id: string | number }) =>
    domainConfig.routes.adminListing(id),
  event: ({ eventId }: { eventId: string | number }) =>
    domainConfig.routes.listing(eventId),
  adminEvent: ({ eventId }: { eventId: string | number }) =>
    domainConfig.routes.adminListing(eventId),
  profile: () => `/profile`,
  test1: () => `/test1`,
  test2: () => `/test2`,
}
