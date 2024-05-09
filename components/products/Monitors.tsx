import { monitor } from "@lib/interfaces";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Button } from "@components/ui/button";
import { addToCart, transformBadName } from "@lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@components/ui/dialog";
import { DialogTitle } from "@components/ui/dialog";
import { Separator } from "@components/ui/separator";
import { IconPlus } from "@tabler/icons-react";
import { Input } from "@components/ui/input";
import AddToCartSection from "@components/addToCartSection";

export default function Monitors({ data }: { data: monitor[] }): JSX.Element {
  if (data.length === 0) {
    return (
      <p className="block h-full">No monitors, matching your criteria found.</p>
    );
  }

  return (
    <Table className="w-2/3 mx-auto bg-background/40 rounded-lg overflow-hidden">
      <TableCaption>Monitors</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Manufacturer</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Screen size</TableHead>
          <TableHead>Refresh rate</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((m: monitor) => {
          return (
            <TableRow key={m.id}>
              <TableCell>
                <div className="w-8 h-8 bg-current opacity-50 rounded-lg" />
              </TableCell>
              <TableCell>
                <p>{transformBadName(m.name || "")}</p>
              </TableCell>
              <TableCell>
                <p>{m.manufacturer}</p>
              </TableCell>
              <TableCell>
                <p>{m.price === null ? "Not in stock!" : m.price + " $"}</p>
              </TableCell>
              <TableCell>
                <p>{m.screen_size ? m.screen_size + "″" : "No data"}</p>
              </TableCell>
              <TableCell>
                <p>{m.refresh_rate ? m.refresh_rate + "Hz" : "No data"}</p>
              </TableCell>
              <TableCell className="flex items-center justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {m.manufacturer + " " + transformBadName(m.name || "")}
                      </DialogTitle>
                      <DialogDescription>Case details.</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-1 border-l border-b p-1 rounded-b-lg shadow-sm">
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Price:</span>
                        <span>
                          {m.price === null ? " Not in stock!" : m.price + " $"}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Screen size: </span>
                        <span>{m.screen_size || "No data"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Resolution: </span>
                        <span>{m.resolution || "No data"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Refresh rate: </span>
                        <span>
                          {m.refresh_rate ? m.refresh_rate + "Hz" : "No data"}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Response time: </span>
                        <span>
                          {m.response_time ? m.response_time + "ms" : "No data"}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Panel type:</span>
                        <span>{m.panel_type || "No data"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Aspect ratio:</span>
                        <span>{m.aspect_ratio || "No data"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Manufacturer: </span>
                        <span>{m.manufacturer}</span>
                      </p>
                    </div>
                    {m.price && (
                      <AddToCartSection category="Monitor" item={m} />
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
