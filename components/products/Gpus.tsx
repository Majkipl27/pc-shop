import { gpu } from "@lib/interfaces";
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

export default function Gpus({ data }: { data: gpu[] }): JSX.Element {
  if (data.length === 0) {
    return (
      <p className="block h-full">
        No graphics cards, matching your criteria found.
      </p>
    );
  }

  return (
    <Table className="w-2/3 mx-auto">
      <TableCaption>Graphics cards</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Manufacturer</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Chipset</TableHead>
          <TableHead>Memory</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((gpu: gpu) => {
          return (
            <TableRow key={gpu.id}>
              <TableCell>
                <div className="w-8 h-8 bg-current opacity-50 rounded-lg" />
              </TableCell>
              <TableCell>
                <p>{transformBadName(gpu.manufacturer || "")}</p>
              </TableCell>
              <TableCell>
                <p>{gpu.name}</p>
              </TableCell>
              <TableCell>
                <p>{gpu.price === null ? "Not in stock!" : gpu.price + " $"}</p>
              </TableCell>
              <TableCell>
                <p>{gpu.chipset}</p>
              </TableCell>
              <TableCell>
                <p>{gpu.memory}</p>
              </TableCell>
              <TableCell className="flex items-center justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {gpu.name +
                          " " +
                          transformBadName(gpu.manufacturer || "")}
                      </DialogTitle>
                      <DialogDescription>Gpu details.</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-1 border-l border-b p-1 rounded-b-lg shadow-sm">
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Price:</span>
                        <span>
                          {gpu.price === null
                            ? " Not in stock!"
                            : gpu.price + " $"}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Chipset: </span>
                        <span>{gpu.chipset}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Memory: </span>
                        <span>{gpu.memory + "Gb"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Core clock: </span>
                        <span>{gpu.core_clock + "Mhz"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Boost clock: </span>
                        <span>
                          {gpu.boost_clock
                            ? gpu.boost_clock + "Mhz"
                            : "Not available"}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Color: </span>
                        <span>{gpu.color}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Length: </span>
                        <span>{gpu.length + "mm"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Manufacturer: </span>
                        <span>{gpu.name}</span>
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
