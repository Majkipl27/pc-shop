import { keyboard } from "@lib/interfaces";
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

export default function Keyboards({ data }: { data: keyboard[] }): JSX.Element {
  if (data.length === 0) {
    return (
      <p className="block h-full">No keyboards, matching your criteria found.</p>
    );
  }

  return (
    <Table className="w-2/3 mx-auto">
      <TableCaption>Keyboards</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Manufacturer</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Color</TableHead>
          <TableHead>Switches</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((k: keyboard) => {
          return (
            <TableRow key={k.id}>
              <TableCell>
                <div className="w-8 h-8 bg-current opacity-50 rounded-lg" />
              </TableCell>
              <TableCell>
                <p>{transformBadName(k.name || "")}</p>
              </TableCell>
              <TableCell>
                <p>{k.manufacturer}</p>
              </TableCell>
              <TableCell>
                <p>{k.price === null ? "Not in stock!" : k.price + " $"}</p>
              </TableCell>
              <TableCell>
                <p>{k.color || "No data"}</p>
              </TableCell>
              <TableCell>
                <p>{k.switches || "No data"}</p>
              </TableCell>
              <TableCell className="flex items-center justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {k.manufacturer + " " + transformBadName(k.name || "")}
                      </DialogTitle>
                      <DialogDescription>Case details.</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-1 border-l border-b p-1 rounded-b-lg shadow-sm">
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Price:</span>
                        <span>
                          {k.price === null ? " Not in stock!" : k.price + " $"}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Color: </span>
                        <span>{k.color || "No data"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Connection type: </span>
                        <span>{k.connection_type || "No data"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Style: </span>
                        <span>{k.style || "No data"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Switches: </span>
                        <span>{k.switches || "No data"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">
                          Backlit:
                        </span>
                        <span>{k.backlit || "No"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">
                          Ten key less:
                        </span>
                        <span>{k.backlit ? "Yes" : "No"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Manufacturer: </span>
                        <span>{k.manufacturer}</span>
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
