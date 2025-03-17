"use client";
import Youtube, { YouTubeProps } from "react-youtube";
interface YoutubeTrailerProps {
  id: string;
}
export const YoutubeTrailer: React.FC<YoutubeTrailerProps> = ({ id }) => {
  const opts: YouTubeProps["opts"] = {
    height: 300,
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };
  return (
    <div className="relative pt-[56.25%] w-full">
      <div className="absolute top-0 left-0 w-full h-full">
        <Youtube videoId={id} opts={opts} />
      </div>
    </div>
  );
};
export default YoutubeTrailer;
