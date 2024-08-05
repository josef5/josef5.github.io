declare global {
  interface Window {
    _statcounter: {
      push: (data: { tags: { event_name: string } }) => void;
      record_pageview: () => void;
    };
  }
}

export {};
