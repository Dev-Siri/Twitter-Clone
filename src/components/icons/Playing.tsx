interface Props {
  height?: number;
  width?: number;
}

export default function Playing(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <g>
        <path d="M4 2h5v20H4V2zm11 20h5V2h-5v20z"></path>
      </g>
    </svg>
  );
}
