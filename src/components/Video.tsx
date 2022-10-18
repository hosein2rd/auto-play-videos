import { useEffect, useRef } from "react";
import styled from "styled-components";

type VideoProps = {
  title: string;
  src: string;
  scrollPosition?: number;
  key1: number;
};

const Video = ({ title, src, scrollPosition = 16, key1 }: VideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const top =
      containerRef.current?.offsetTop === 16
        ? 0
        : containerRef.current?.offsetTop || 0;

    top <= scrollPosition && scrollPosition <= top + 391
      ? ref.current?.play()
      : ref.current?.pause();
  }, [scrollPosition, key1]);

  return (
    <Card ref={containerRef}>
      <StyledVideo ref={ref} muted loop height={300} src={src} />
      <Title>{title}</Title>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  border-radius: 1rem;
  box-shadow: 0rem 15rem 1rem lightgray;
  overflow: hidden;
`;

const Title = styled.p`
  direction: rtl;
  padding: 0 1rem;
`;

const StyledVideo = styled.video`
  background: black;
`;

export default Video;
