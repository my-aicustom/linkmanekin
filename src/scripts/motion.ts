const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-ready');

  const revealSelectors = [
    '.hero-copy > *',
    '.hero-stage',
    '.section-heading > *',
    '.lookbook-panel',
    '.statement-section > *',
    '.statement-grid > *',
    '.catalog-toolbar',
    '.product-card',
    '.finishing-art',
    '.finishing-copy > *',
    '.studio-section > *',
    '.page-intro > *',
    '.technical-strip > *',
    '.detail-grid > *',
    '.faq-section > *',
  ];

  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>(revealSelectors.join(',')),
  );

  nodes.forEach((node, index) => {
    node.classList.add('reveal-item');
    node.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
  });

  document
    .querySelectorAll<HTMLElement>('.hero-stage, .sports-banner')
    .forEach((node) => node.classList.add('reveal-image'));

  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('reveal-visible');
        instance.unobserve(entry.target);
      });
    },
    {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.12,
    },
  );

  requestAnimationFrame(() => {
    document
      .querySelectorAll<HTMLElement>('.reveal-item, .reveal-image')
      .forEach((node) => observer.observe(node));
  });
}
