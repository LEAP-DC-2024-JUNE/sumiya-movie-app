import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Genre } from "@/utils";
import { RightDirection } from "./svg/RightDirection";
interface DropDownMenuProps {
  allgeners?: Genre[];
}

export const DropDownMenu: React.FC<DropDownMenuProps> = ({ allgeners }) => {
  return (
    <div className="max-w-[335px] border border-gray-400">
      <DropdownMenu>
        <DropdownMenuTrigger>Genre</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Genres</DropdownMenuLabel>
          <DropdownMenuItem>See lists of movies by genre</DropdownMenuItem>
          <DropdownMenuSeparator />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              maxWidth: "300px",
              padding: "20px",
            }}
          >
            {allgeners?.map((genre) => {
              return (
                <div key={genre.id} className="flex items-center gap-2">
                  <DropdownMenuItem>{genre.name}</DropdownMenuItem>
                  <RightDirection />
                </div>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default DropDownMenu;
