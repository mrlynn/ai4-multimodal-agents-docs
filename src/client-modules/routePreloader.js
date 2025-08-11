export default function routePreloader() {
  // Preload critical routes to prevent 404 flashes
  if (typeof window !== 'undefined') {
    const routes = ['/ta-solutions'];
    
    routes.forEach(route => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });
  }
}