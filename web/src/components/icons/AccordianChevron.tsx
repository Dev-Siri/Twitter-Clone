interface Props {
  height?: number;
  width?: number;
}

export default function AccordionChevron(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <g>
        <path
          d="M3.543 8.96l1.414-1.42L12 14.59l7.043-7.05 1.414 1.42L12 17.41 3.543 8.96z"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  );
}
