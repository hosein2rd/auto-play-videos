import "./App.css";
import Video from "./components/Video";
import { Video as VideoType } from "./types";
import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { apiCall } from "./store/api";
import { videoReceived, videoRequested } from "./store/video";
import Loading from "./components/Loading";

type VideoData = { list: VideoType[]; loading: boolean };

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const dispatch = useDispatch();
  const { list: videos, loading } = useSelector<
    { video: VideoData },
    VideoData
  >((store) => store.video);

  useEffect(() => {
    dispatch(
      apiCall({
        url: "/fa/v1/video/video/mostViewedVideos",
        onStart: videoRequested.type,
        onSuccess: videoReceived.type,
      })
    );
  }, [dispatch]);

  const handleOnScroll = () => {
    const scrollTop = containerRef?.current?.scrollTop || 0;
    const scrollHeight = containerRef?.current?.scrollHeight || 0;
    const clientHeight = containerRef?.current?.clientHeight || 0;

    const lastScroll = scrollHeight - scrollTop === clientHeight;

    setScrollPosition(
      scrollTop === 0
        ? scrollTop
        : lastScroll
        ? scrollHeight - clientHeight + 500
        : scrollTop + 400
    );
  };

  const debounceScrollHandler = useCallback(
    () => debounce(handleOnScroll, 100),
    []
  );

  return (
    <div
      onScroll={debounceScrollHandler()}
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "auto",
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        videos.map((video, i) => (
          <Video
            key={i}
            key1={i}
            scrollPosition={scrollPosition}
            title={video.attributes.title}
            src={video.attributes.preview_src}
          />
        ))
      )}
    </div>
  );
}

export default App;
