import { useEffect } from 'react';

export function useBackButton(isActive, onBack) {
  useEffect(() => {
    if (!isActive) return;

    const handlePopState = (event) => {
      event.preventDefault();
      onBack();
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isActive, onBack]);
}

