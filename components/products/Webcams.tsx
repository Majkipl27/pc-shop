import { webcam } from "@lib/interfaces";
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

export default function Webcams({ data }: { data: webcam[] }): JSX.Element {
  if (data.length === 0) {
    return (
      <p className="block h-full">No webcams, matching your criteria found.</p>
    );
  }

  return (
    <Table className="w-2/3 mx-auto bg-background/40 rounded-lg overflow-hidden">
      <TableCaption>Webcams</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Manufacturer</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Resolution</TableHead>
          <TableHead>Connection</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((w: webcam) => {
          return (
            <TableRow key={w.id}>
              <TableCell>
                <div className="w-8 h-8 bg-current opacity-50 rounded-lg" />
              </TableCell>
              <TableCell>
                <p>{transformBadName(w.name || "")}</p>
              </TableCell>
              <TableCell>
                <p>{w.manufacturer}</p>
              </TableCell>
              <TableCell>
                <p>{w.price === null ? "Not in stock!" : w.price + " $"}</p>
              </TableCell>
              <TableCell>
                <p>{w.resolutions || "No data"}</p>
              </TableCell>
              <TableCell>
                <p>{w.connection || "No data"}</p>
              </TableCell>
              <TableCell className="flex items-center justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {w.manufacturer + " " + transformBadName(w.name || "")}
                      </DialogTitle>
                      <DialogDescription>Case details.</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-1 border-l border-b p-1 rounded-b-lg shadow-sm">
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Price:</span>
                        <span>
                          {w.price === null ? " Not in stock!" : w.price + " $"}
                        </span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Resolution: </span>
                        <span>{w.resolutions || "No data"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Connection: </span>
                        <span>{w.connection || "No data"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Focus type: </span>
                        <span>{w.focus_type || "No data"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Fov: </span>
                        <span>{w.fov || "No data"}</span>
                      </p>
                      <Separator />
                      <p className="flex items-center text-lg justify-between w-full *:block px-1">
                        <span className="font-bold">Manufacturer: </span>
                        <span>{w.manufacturer}</span>
                      </p>
                    </div>
                    {w.price && <AddToCartSection category="Webcam" item={w} />}
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
