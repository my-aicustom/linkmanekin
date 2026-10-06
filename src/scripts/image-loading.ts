/** Prioritize the first screen, accounting for the mobile/desktop layout. */
export function updateImageLoading() {
  const images = Array.from(document.images).filter(
    (image) => image.getAttribute('src') && !image.src.startsWith('data:') && !image.closest('dialog'),
  );
  // Read layout before changing attributes to avoid repeated layout work.
  const priorities = images.map((image) => {
    let top = 0;
    let element: HTMLElement | null = image;
    while (element) {
      top += element.offsetTop;
      element = element.offsetParent as HTMLElement | null;
    }
    return image.offsetParent !== null && top < window.innerHeight;
  });
  images.forEach((image, index) => {
    image.loading = priorities[index] ? 'eager' : 'lazy';
    if (image.hasAttribute('fetchpriority')) {
      image.fetchPriority = priorities[index] ? 'high' : 'auto';
    }
  });
}

updateImageLoading();
void document.fonts.ready.then(updateImageLoading);
let resizeFrame = 0;
window.addEventListener('resize', () => {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(updateImageLoading);
});
