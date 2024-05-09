import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { motherboard } from "@lib/interfaces";
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
import AddToCartSection from "@components/addToCartSection";

export default function Motherboards({
  data,
}: {
  data: motherboard[];
}): JSX.Element {
  if (data.length === 0) {
    return (
      <p className="block h-full">
        No motherboards, matching your criteria found.
      </p>
    );
  }

  return (
    <Table className="w-2/3 mx-auto bg-background/40 rounded-lg overflow-hidden">
      <TableCaption>Motherboards</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Manufacturer</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Socket</TableHead>
          <TableHead>Color</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((motherboard: motherboard) => {
          return (
            <TableRow key={motherboard.id}>
              <TableCell>
                <div className="w-8 h-8 bg-current opacity-50 rounded-lg" />
              </TableCell>
              <TableCell>
                <p>{transformBadName(motherboard.manufacturer || "")}</p>
              </TableCell>
              <TableCell>
                <p>{motherboard.name}</p>
              </TableCell>
              <TableCell>
                <p>
                  {motherboard.price === null
                    ? "Not in stock!"
                    : motherboard.price + " $"}
                </p>
              </TableCell>
              <TableCell>
                <p>{motherboard.socket}</p>
              </TableCell>
              <TableCell>
                <p>{motherboard.color || "Unknown"}</p>
              </TableCell>
              <TableCell className="flex items-center justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {motherboard.name +
                          " " +
                          transformBadName(motherboard.manufacturer || "")}
                      </DialogTitle>
                      <DialogDescription>
                        Motherboard details.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-1 border-l border-b p-1 rounded-b-lg shadow-sm">
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Price:</span>
                        <span>
                          {motherboard.price === null
                            ? " Not in stock!"
                            : motherboard.price + " $"}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Socket: </span>
                        <span>{motherboard.socket}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Form factor: </span>
                        <span>{motherboard.form_factor}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Max memory: </span>
                        <span>
                          {motherboard.max_memory
                            ? motherboard.max_memory + "Gb"
                            : "No data"}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Memory slots: </span>
                        <span>{motherboard.memory_slots}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Color: </span>
                        <span>{motherboard.color || "Unknown"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Manufacturer: </span>
                        <span>{motherboard.name}</span>
                      </p>
                    </div>
                    {motherboard.price && (
                      <AddToCartSection
                        category="Motherboard"
                        item={motherboard}
                        switchNameAndManufacturer
                      />
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