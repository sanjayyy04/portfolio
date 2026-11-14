const basePath = import.meta.env.BASE_URL;

export function sitePath(path = '') {
  return `${basePath}${path.replace(/^\/+/, '')}`;
}

export function siteRoutePath(pathname = window.location.pathname) {
  const base = basePath.replace(/\/$/, '');
  if (pathname === base) return '/';
  if (base && pathname.startsWith(`${base}/`)) return pathname.slice(base.length);
  return pathname;
}
