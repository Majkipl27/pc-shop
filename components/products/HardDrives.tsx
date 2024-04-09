import { hardDrive } from "@lib/interfaces";
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

export default function HardDrives({
  data,
}: {
  data: hardDrive[];
}): JSX.Element {
  if (data.length === 0) {
    return (
      <p className="block h-full">
        No hard drives, matching your criteria found.
      </p>
    );
  }

  return (
    <Table className="w-2/3 mx-auto">
      <TableCaption>Storage</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Manufacturer</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Type</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((hardDrive: hardDrive) => {
          return (
            <TableRow key={hardDrive.id}>
              <TableCell>
                <div className="w-8 h-8 bg-current opacity-50 rounded-lg" />
              </TableCell>
              <TableCell>
                <p>{transformBadName(hardDrive.name || "")}</p>
              </TableCell>
              <TableCell>
                <p>{hardDrive.manufacturer}</p>
              </TableCell>
              <TableCell>
                <p>
                  {hardDrive.price === null
                    ? "Not in stock!"
                    : hardDrive.price + " $"}
                </p>
              </TableCell>
              <TableCell>
                <p>
                  {hardDrive.capacity ? hardDrive.capacity + "Gb" : "No data"}
                </p>
              </TableCell>
              <TableCell>
                <p>{hardDrive.type}</p>
              </TableCell>
              <TableCell className="flex items-center justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {hardDrive.manufacturer +
                          " " +
                          transformBadName(hardDrive.name || "")}
                      </DialogTitle>
                      <DialogDescription>Hard drive details.</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-1 border-l border-b p-1 rounded-b-lg shadow-sm">
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Price:</span>
                        <span>
                          {hardDrive.price === null
                            ? " Not in stock!"
                            : hardDrive.price + " $"}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Price per gb:</span>
                        <span>
                          {hardDrive.price_per_gb === null
                            ? " Not in stock!"
                            : hardDrive.price_per_gb + " $"}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Capacity: </span>
                        <span>
                          {hardDrive.capacity
                            ? hardDrive.capacity + "Gb"
                            : "No data"}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Type: </span>
                        <span>{hardDrive.type}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Cache: </span>
                        <span>
                          {hardDrive.cache ? hardDrive.cache + "Mb" : "Unknown"}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Form factor: </span>
                        <span>
                          {hardDrive.form_factor
                            ? hardDrive.form_factor + "″"
                            : "No data"}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Interface: </span>
                        <span>{hardDrive.interface}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Manufacturer: </span>
                        <span>{hardDrive.manufacturer}</span>
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
