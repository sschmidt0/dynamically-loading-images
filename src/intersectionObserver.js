export const intersectionObserver = (setLimit, refNode) => {
  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setLimit(prev => prev + 24);
      }
    });
  };

  const options = {
    threshold: 1.0
  };

  const observer = new IntersectionObserver(callback, options);
  observer.observe(refNode.current);

  return () => observer.disconnect();
};
