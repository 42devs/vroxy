import { verifyRequestOrigin } from 'lucia';

export default defineEventHandler((event) => {
  // CSRF protection for non-GET requests
  if (event.method !== 'GET') {
    const originHeader = getHeader(event, 'Origin') ?? null;
    // NOTE: You may need to use `X-Forwarded-Host` instead
    const hostHeader = getHeader(event, 'Host') ?? null;
    if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
      return event.node.res.writeHead(403).end();
    }
  }
});
