function HighlightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <circle cx="10" cy="10" r="7.5" />
    </svg>
  );
}

export default HighlightIcon;
