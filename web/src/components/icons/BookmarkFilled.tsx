interface Props {
  height?: number;
  width?: number;
}

export default function BookmarkFilled(props: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g>
        <path
          d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  );
}
