import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function SortByComponent({
  sortBy,
  setSortBy,
}: {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}): JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-36 !mt-0">
          Sort by: {sortBy}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup className="w-32">
          <DropdownMenuItem
            onClick={() => {
              setSortBy("Price (asc)");
            }}
          >
            Price (asc)
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setSortBy("Price (desc)");
            }}
          >
            Price (desc)
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setSortBy("Newest");
            }}
          >
            Newest
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setSortBy("Oldest");
            }}
          >
            Oldest
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
