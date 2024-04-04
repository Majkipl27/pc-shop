import { cpu } from "@lib/interfaces";
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

export default function Cpus({ data }: { data: cpu[] }): JSX.Element {
  if (data.length === 0) {
    return (
      <p className="block h-full">No cpu's, matching your criteria found.</p>
    );
  }

  return (
    <Table className="w-2/3 mx-auto">
      <TableCaption>Cpus</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Manufacturer</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Core Count</TableHead>
          <TableHead>Graphics</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((cpu: cpu) => {
          return (
            <TableRow key={cpu.id}>
              <TableCell>
                <div className="w-8 h-8 bg-current opacity-50 rounded-lg" />
              </TableCell>
              <TableCell>
                <p>{transformBadName(cpu.name || "")}</p>
              </TableCell>
              <TableCell>
                <p>{cpu.manufacturer}</p>
              </TableCell>
              <TableCell>
                <p>{cpu.price === null ? "Not in stock!" : cpu.price + " $"}</p>
              </TableCell>
              <TableCell>
                <p>{cpu.core_count}</p>
              </TableCell>
              <TableCell>
                <p>{cpu.graphics || "-"}</p>
              </TableCell>
              <TableCell className="flex items-center justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {cpu.manufacturer +
                          " " +
                          transformBadName(cpu.name || "")}
                      </DialogTitle>
                      <DialogDescription>cpu details.</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-1 border-l border-b p-1 rounded-b-lg shadow-sm">
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Price:</span>
                        <span>
                          {cpu.price === null
                            ? " Not in stock!"
                            : cpu.price + " $"}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Core count: </span>
                        <span>{cpu.core_count}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Core clock (Ghz): </span>
                        <span>{cpu.core_clock}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Boost clock (Ghz): </span>
                        <span>{cpu.boost_clock || "Core not unlocked"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Tdp (W): </span>
                        <span>{cpu.tdp}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Graphics: </span>
                        <span>{cpu.graphics || "-"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Manufacturer: </span>
                        <span>{cpu.manufacturer}</span>
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
