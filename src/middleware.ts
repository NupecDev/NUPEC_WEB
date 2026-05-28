import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    /*
     * Aplica el middleware a todas las rutas excepto:
     * - _next (internos de Next.js)
     * - api  (rutas de API)
     * - studio (Sanity Studio)
     * - archivos estáticos con extensión (js, css, png, etc.)
     */
    "/((?!_next|api|studio|.*\\..*).*)",
  ],
};
