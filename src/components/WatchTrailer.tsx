import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import YoutubeTrailer from "./YoutubeTrailer";
import { MovieIdData } from "@/utils";
interface WatchTrailerProps {
  id: number;
}
export const WatchTrailer: React.FC<WatchTrailerProps> = async ({ id }) => {
  const movieId = await MovieIdData(`/movie/${id}/videos?language=en-US`);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="md:bg-white md:text-black md:text-xl">
          Watch Trailer
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full h-full">
        <DialogHeader>
          <DialogTitle className="text-white">Watch Trailer</DialogTitle>
        </DialogHeader>
        <YoutubeTrailer id={movieId[0]?.key} />
      </DialogContent>
    </Dialog>
  );
};
export default WatchTrailer;
