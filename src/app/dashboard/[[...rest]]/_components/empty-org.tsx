import Image from "next/image"
import { CreateOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";


export const EmptyOrg = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src="/empty-search.svg"
        alt="Empty"
        height={200}
        width={200}
      />
      <h2 className="text-2xl font-semibold mt-3">
        Welcome to Canban
      </h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create an organization to get started
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">
              Create organization
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
          <DialogTitle></DialogTitle>
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}