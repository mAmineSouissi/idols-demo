export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <circle
          cx="16"
          cy="16"
          r="14"
          stroke="currentColor"
          strokeWidth="2"
          className="text-(--color-accent)"
        />
        <path
          d="M12 16L15 19L20 14"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-(--color-accent)"
        />
        <circle
          cx="16"
          cy="16"
          r="3"
          fill="currentColor"
          className="text-(--color-accent-2)"
        />
      </svg>
      <span className="text-xl font-bold text-(--color-fg)">Idols</span>
    </div>
  );
};
