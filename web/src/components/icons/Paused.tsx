interface Props {
  height?: number;
  width?: number;
}

export default function Paused(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <g>
        <path d="M21 12L4 2v20l17-10z"></path>
      </g>
    </svg>
  );
}
