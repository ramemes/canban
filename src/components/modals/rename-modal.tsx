"use client";

import { 
  AlertDialogAction, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogTitle, 
  AlertDialogTrigger  
} from "@/components/ui/alert-dialog";

import { useRenameModal } from "@/store/use-rename-modal";

import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";



export const RenameModal = () => {

  const {
    isOpen,
    onClose,
    initialValues,
  } = useRenameModal();

  const { 
    mutate, 
    pending 
  } = useApiMutation(api.board.editBoardTitle) 

  const [title, setTitle] = useState(initialValues.title);

  useEffect(() => {
    setTitle(initialValues.title);
  },[initialValues.title]);



  const editTitle: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    mutate({
      id: initialValues.id, 
      title
    })
    .then(() => {
      // toast.success(`${initialValues.table.slice(0,1).toUpperCase()}${initialValues.table.slice(1,-1)} renamed`)
      onClose()
    })
    // .catch(() => toast.error(`Unable to change ${initialValues.table.slice(0,-1)} title`))
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Title</AlertDialogTitle>
          <AlertDialogDescription>
            Enter a new title for your board
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={editTitle} className="space-y-4">
          <Input
              autoFocus
              disabled={pending}
              required
              maxLength={60}
              id="name"
              placeholder={`Board title`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

          <AlertDialogFooter>
              <Button disabled={pending} type="submit">Save changes</Button>
          </AlertDialogFooter>
        </form>

      </AlertDialogContent>
    </AlertDialog>
  )
}


// "use client";

// import { 
//   AlertDialogAction, 
//   AlertDialogFooter, 
//   AlertDialogHeader, 
//   AlertDialog, 
//   AlertDialogContent, 
//   AlertDialogDescription, 
//   AlertDialogTitle, 
//   AlertDialogTrigger  
// } from "@/components/ui/alert-dialog";

// import { useRenameModal } from "@/store/use-rename-modal";

// import { FormEventHandler, useEffect, useState } from "react";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { useApiMutation } from "@/hooks/useApiMutation";
// import { api } from "../../../convex/_generated/api";
// import { toast } from "sonner";



// export const RenameModal = () => {

//   const {
//     isOpen,
//     onClose,
//     initialValues,
//   } = useRenameModal();

//   const { 
//     mutate, 
//     pending 
//   } = initialValues.table === "boards" ? 
//     useApiMutation(api.board.editBoardTitle) 
//     : initialValues.table === "lists" ? 
//     useApiMutation(api.list.editListTitle)
//     : useApiMutation(api.board.editBoardTitle) 

//   const [title, setTitle] = useState(initialValues.title);
//   const [table, setTable] = useState(initialValues.table)

//   useEffect(() => {
//     setTitle(initialValues.title);
//   },[initialValues.title]);



//   const editTitle: FormEventHandler<HTMLFormElement> = (e) => {
//     e.preventDefault()


//     mutate({
//       id: initialValues.id, 
//       title
//     })
//     .then(() => {
//       // toast.success(`${initialValues.table.slice(0,1).toUpperCase()}${initialValues.table.slice(1,-1)} renamed`)
//       onClose()
//     })
//     // .catch(() => toast.error(`Unable to change ${initialValues.table.slice(0,-1)} title`))
//   }

//   return (
//     <AlertDialog open={isOpen} onOpenChange={onClose}>

//       <AlertDialogContent className="sm:max-w-[425px]">
//         <AlertDialogHeader>
//           <AlertDialogTitle>Edit Title</AlertDialogTitle>
//           <AlertDialogDescription>
//             Enter a new title for your {table.slice(0,-1)}
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <form onSubmit={editTitle} className="space-y-4">
//           <Input
//               autoFocus
//               disabled={pending}
//               required
//               maxLength={60}
//               id="name"
//               // placeholder={`${initialValues.table.slice(0,1).toUpperCase()}${initialValues.table.slice(1,-1)} title`}
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />

//           <AlertDialogFooter>
//               <Button disabled={pending} type="submit">Save changes</Button>
//           </AlertDialogFooter>
//         </form>

//       </AlertDialogContent>
//     </AlertDialog>
//   )
// }