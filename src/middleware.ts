// src/middleware.ts
import { LANGUAGES, DEFAULT_LANGUAGE } from './config';
import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { pathname } = context.url;

  // Only redirect from the root URL
  if (pathname === '/') {
    // Parse Accept-Language header
    const acceptLang = context.request.headers.get('accept-language') || '';
    const preferredLang = acceptLang
      .split(',')                          // e.g., "en-US,en;q=0.9,fr;q=0.8"
      .map(l => l.split(';')[0].trim())   // ["en-US", "en", "fr"]
      .map(l => l.split('-')[0])          // ["en", "en", "fr"]
      .find(l => LANGUAGES.includes(l));

    const redirectLang = preferredLang || DEFAULT_LANGUAGE;

    return context.redirect(`/${redirectLang}`, 301);

  }

  return next(); // Continue as normal
};
