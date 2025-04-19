interface Props {
  height?: number;
  width?: number;
}

export default function Error(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path
        d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zm1 16H9v-2h2zm0-4H9V4h2z"
        fillOpacity={1}
      />
    </svg>
  );
}
