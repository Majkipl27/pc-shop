import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";

export default function PaginationComponent({
  skip,
  take,
  updateSearchParams,
  totalLength,
  setTake,
}: {
  skip: number;
  take: number;
  updateSearchParams: (key: string, value: string) => void;
  totalLength: number;
  setTake: React.Dispatch<number>;
}): JSX.Element {
  return (
    <Pagination className="w-fit mx-0">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (skip - take >= 0) {
                updateSearchParams("skip", (skip - take).toString());
              }
            }}
          />
        </PaginationItem>
        {skip / take > 2 && (
          <>
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  updateSearchParams("skip", "0");
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationEllipsis>
              <PaginationLink>...</PaginationLink>
            </PaginationEllipsis>
          </>
        )}
        {skip / take >= 1 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                if (skip - take >= 0) {
                  updateSearchParams("skip", (skip - take).toString());
                }
              }}
            >
              {Math.floor(skip / take)}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive className="cursor-default">
            {Math.floor(skip / take + 1)}
          </PaginationLink>
        </PaginationItem>
        {skip / take < Math.ceil(totalLength) / take - 1 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => {
                if (skip + take < Math.ceil(totalLength)) {
                  updateSearchParams("skip", (skip + take).toString());
                }
              }}
            >
              {Math.floor(skip / take + 2)}
            </PaginationLink>
          </PaginationItem>
        )}
        {skip / take < Math.ceil(totalLength) / take - 2 && (
          <>
            <PaginationEllipsis>
              <PaginationLink>...</PaginationLink>
            </PaginationEllipsis>
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  updateSearchParams(
                    "skip",
                    (Math.floor(totalLength / take) * take).toString()
                  );
                }}
              >
                {Math.ceil(totalLength / take)}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (skip + take < Math.ceil(totalLength)) {
                updateSearchParams("skip", (skip + take).toString());
              }
            }}
          />
        </PaginationItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-36">
              Items per page: {take}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup className="w-32">
              <DropdownMenuItem
                onClick={() => {
                  setTake(10);
                  updateSearchParams("take", "10");
                }}
              >
                10
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setTake(20);
                  updateSearchParams("take", "20");
                }}
              >
                20
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setTake(50);
                  updateSearchParams("take", "50");
                }}
              >
                50
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </PaginationContent>
    </Pagination>
  );
}
