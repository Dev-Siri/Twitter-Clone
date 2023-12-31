interface Props {
  height?: number;
  width?: number;
}

export default function PictureInPicture(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <g>
        <path d="M3.457 2.04L9 7.59V3h2v8H3V9h4.586L2.043 3.46l1.414-1.42zM19.5 8H14V6h5.5C20.881 6 22 7.12 22 8.5v11c0 1.38-1.119 2.5-2.5 2.5h-11C7.119 22 6 20.88 6 19.5V14h2v5.5c0 .28.224.5.5.5h11c.276 0 .5-.22.5-.5v-11c0-.28-.224-.5-.5-.5z"></path>
      </g>
    </svg>
  );
}
