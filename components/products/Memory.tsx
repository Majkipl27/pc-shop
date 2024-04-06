import { memory } from "@lib/interfaces";
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

export default function Memory({ data }: { data: memory[] }): JSX.Element {
  if (data.length === 0) {
    return (
      <p className="block h-full">No memory, matching your criteria found.</p>
    );
  }

  return (
    <Table className="w-2/3 mx-auto">
      <TableCaption>Memory</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Manufacturer</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Speed</TableHead>
          <TableHead>Price per gb</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((memory: memory) => {
          return (
            <TableRow key={memory.id}>
              <TableCell>
                <div className="w-8 h-8 bg-current opacity-50 rounded-lg" />
              </TableCell>
              <TableCell>
                <p>{transformBadName(memory.name || "")}</p>
              </TableCell>
              <TableCell>
                <p>{memory.manufacturer}</p>
              </TableCell>
              <TableCell>
                <p>
                  {memory.price === null
                    ? "Not in stock!"
                    : memory.price + " $"}
                </p>
              </TableCell>
              <TableCell>
                <p>{memory.speed}</p>
              </TableCell>
              <TableCell>
                <p>{memory.price_per_gb || "Not in stock!"}</p>
              </TableCell>
              <TableCell className="flex items-center justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {memory.manufacturer +
                          " " +
                          transformBadName(memory.name || "")}
                      </DialogTitle>
                      <DialogDescription>Memory details.</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-1 border-l border-b p-1 rounded-b-lg shadow-sm">
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Price:</span>
                        <span>
                          {memory.price === null
                            ? " Not in stock!"
                            : memory.price + " $"}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Speed: </span>
                        <span>{memory.speed + "Mhz"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Modules quantity: </span>
                        <span>
                          {+(memory.name?.split(",").slice(-2, -1)[0] as any) /
                            (memory.modules || 1)}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Price per gb: </span>
                        <span>
                          {memory.price_per_gb
                            ? memory.price_per_gb + " $"
                            : "Not in stock!"}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Color: </span>
                        <span>{memory.color}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">First word latency: </span>
                        <span>{memory.first_word_latency + "ms"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Cas latency: </span>
                        <span>{memory.cas_latency + "ms"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Manufacturer: </span>
                        <span>{memory.manufacturer}</span>
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
