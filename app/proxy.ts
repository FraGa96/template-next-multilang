import { stackProxies } from '../middlewares/middlewares.utils';
import { withI18n } from '../middlewares/i18next.middleware';

// Order matters! The proxys will be executed in 
// the order they are defined here.
const proxys = [withI18n];

export default stackProxies(proxys);

export const config = {
  // matcher is required to avoid running the proxys on every request,
  matcher: [
    '/((?!api|_next|.*\\..*).*)',
  ],
};