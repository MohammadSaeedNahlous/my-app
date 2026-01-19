// Next.js middleware for authentication using NextAuth
// explain it
// This middleware integrates NextAuth.js to provide authentication capabilities
// for a Next.js application. It imports the NextAuth function and the authentication
// configuration from the 'auth.config' file. The middleware is then exported to be
// used in the application, enabling features like session management and user
// authentication based on the defined configuration.
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const { auth: middleware } = NextAuth(authConfig);
