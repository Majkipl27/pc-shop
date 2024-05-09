import { mouse } from "@lib/interfaces";
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
import AddToCartSection from "@components/addToCartSection";

export default function Mice({ data }: { data: mouse[] }): JSX.Element {
  if (data.length === 0) {
    return (
      <p className="block h-full">No mice, matching your criteria found.</p>
    );
  }

  return (
    <Table className="w-2/3 mx-auto bg-background/40 rounded-lg overflow-hidden">
      <TableCaption>Mice</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Manufacturer</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Color</TableHead>
          <TableHead>Connection type</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((m: mouse) => {
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
                <p>{m.color || "No data"}</p>
              </TableCell>
              <TableCell>
                <p>{m.connection_type}</p>
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
                        <span className="font-bold">Color: </span>
                        <span>{m.color || "No data"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Connection type: </span>
                        <span>{m.connection_type || "No data"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Tracking method: </span>
                        <span>{m.tracking_method}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Max dpi: </span>
                        <span>{m.max_dpi || "No data"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">
                          Hand hand_orientation:{" "}
                        </span>
                        <span>{m.hand_orientation || "Both"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Manufacturer: </span>
                        <span>{m.manufacturer}</span>
                      </p>
                    </div>
                    {m.price && (
                      <AddToCartSection
                        category="Mouse"
                        item={m}
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
