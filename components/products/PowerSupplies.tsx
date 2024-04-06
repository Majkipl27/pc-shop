import { powerSupply } from "@lib/interfaces";
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
import { capitalizeFirstLetter, transformBadName } from "@lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@components/ui/dialog";
import { DialogTitle } from "@components/ui/dialog";
import { Separator } from "@components/ui/separator";

export default function PowerSupplies({ data }: { data: powerSupply[] }): JSX.Element {
  if (data.length === 0) {
    return (
      <p className="block h-full">
        No power supplies, matching your criteria found.
      </p>
    );
  }

  return (
    <Table className="w-2/3 mx-auto">
      <TableCaption>Power supplies</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Manufacturer</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Efficency rating</TableHead>
          <TableHead>Wattage</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((ps: powerSupply) => {
          return (
            <TableRow key={ps.id}>
              <TableCell>
                <div className="w-8 h-8 bg-current opacity-50 rounded-lg" />
              </TableCell>
              <TableCell>
                <p>{transformBadName(ps.manufacturer || "")}</p>
              </TableCell>
              <TableCell>
                <p>{ps.name}</p>
              </TableCell>
              <TableCell>
                <p>{ps.price === null ? "Not in stock!" : ps.price + " $"}</p>
              </TableCell>
              <TableCell>
                <p>
                  {ps.efficiency_rating
                    ? capitalizeFirstLetter(ps.efficiency_rating)
                    : "No data"}
                </p>
              </TableCell>
              <TableCell>
                <p>{ps.wattage}</p>
              </TableCell>
              <TableCell className="flex items-center justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {ps.name +
                          " " +
                          transformBadName(ps.manufacturer || "")}
                      </DialogTitle>
                      <DialogDescription>
                        Power supply details.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-1 border-l border-b p-1 rounded-b-lg shadow-sm">
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Price:</span>
                        <span>
                          {ps.price === null
                            ? " Not in stock!"
                            : ps.price + " $"}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Efficiency rating: </span>
                        <span>
                          {ps.efficiency_rating
                            ? capitalizeFirstLetter(ps.efficiency_rating)
                            : "No data"}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Wattage: </span>
                        <span>{ps.wattage + "W"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Type: </span>
                        <span>{ps.type || "Core not unlocked"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Modular: </span>
                        <span>
                          {ps.modular === "false" ? "No" : ps.modular}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Color: </span>
                        <span>{ps.color || "No data"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Manufacturer: </span>
                        <span>{ps.name}</span>
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
