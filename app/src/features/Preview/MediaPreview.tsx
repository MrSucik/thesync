import { useState, useRef, useLayoutEffect } from "react";
import { MediaModel } from "definitions";
import { useDownloadURL } from "hooks/useDownloadURL";
import styled, { keyframes, css } from "styled-components";

const scroll = (props: { offset: number }) => keyframes`
0% {
  transform: translateY(0)
}
10% {
  transform: translateY(0)
}
50% {
  transform: translateY(${-props.offset}px)
}
60% {
  transform: translateY(${-props.offset}px)
}
90% {
  transform: translateY(0)
}
100% {
  transform: translateY(0)
}
`;

const animation = (props: { offset: number }) =>
  css`
    ${scroll(props)} 30s linear
  `;

const ScrollingImage = styled.img`
  margin: auto;
  max-width: 100%;
  display: ${(props: { visible: boolean; offset: number }) =>
    props.visible ? "inline" : "none"};
  max-height: ${() => (window.innerHeight > 1200 ? "" : "100%")};
  animation: ${(props: { offset: number; visible: boolean }) =>
    props.offset ? animation(props) : ""};
  will-change: transform;
  -webkit-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-transform-style: preserve-3d;
  -webkit-perspective: 1000;
`;

interface Props {
  visible: boolean;
  media: MediaModel;
}

const MediaPreview: React.FC<Props> = ({ media, visible }) => {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLImageElement>(null);
  const downloadURL = useDownloadURL(media.file);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  });

  return (
    <>
      {media.fileType?.startsWith("image") && (
        <ScrollingImage
          ref={ref}
          src={downloadURL}
          alt={media.name}
          offset={height - 1760 < 0 ? 0 : height - 1760}
          visible={visible}
        />
      )}
      {media.fileType === "video" && (
        <video autoPlay loop>
          <source src={downloadURL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </>
  );
};

export default MediaPreview;
