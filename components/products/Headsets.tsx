import { headset } from "@lib/interfaces";
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
import { transformBadName } from "@lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@components/ui/dialog";
import { DialogTitle } from "@components/ui/dialog";
import { Separator } from "@components/ui/separator";

export default function Headsets({
  data,
}: {
  data: headset[];
}): JSX.Element {
  if (data.length === 0) {
    return (
      <p className="block h-full">No headsets, matching your criteria found.</p>
    );
  }

  return (
    <Table className="w-2/3 mx-auto">
      <TableCaption>Headsets</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Manufacturer</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Color</TableHead>
          <TableHead>Type</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((h: headset) => {
          return (
            <TableRow key={h.id}>
              <TableCell>
                <div className="w-8 h-8 bg-current opacity-50 rounded-lg" />
              </TableCell>
              <TableCell>
                <p>{transformBadName(h.name || "")}</p>
              </TableCell>
              <TableCell>
                <p>{h.manufacturer}</p>
              </TableCell>
              <TableCell>
                <p>{h.price === null ? "Not in stock!" : h.price + " $"}</p>
              </TableCell>
              <TableCell>
                <p>{h.color || "No data"}</p>
              </TableCell>
              <TableCell>
                <p>{h.type}</p>
              </TableCell>
              <TableCell className="flex items-center justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {h.manufacturer + " " + transformBadName(h.name || "")}
                      </DialogTitle>
                      <DialogDescription>Case details.</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-1 border-l border-b p-1 rounded-b-lg shadow-sm">
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Price:</span>
                        <span>
                          {h.price === null ? " Not in stock!" : h.price + " $"}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Color: </span>
                        <span>{h.color || "No data"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Type: </span>
                        <span>{h.type}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Microphone: </span>
                        <span>{h.microphone ? "Yes" : "No"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Wireless: </span>
                        <span>{h.wireless ? "Yes" : "No"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Enclosure Type: </span>
                        <span>{h.enclosure_type || "No data"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Manufacturer: </span>
                        <span>{h.manufacturer}</span>
                      </p>
                    </div>
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
