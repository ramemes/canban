"use client";

import { useEffect, useState } from "react";


import { RenameModal } from "@/components/modals/rename-modal";
import { CardModal } from "@/components/modals/card-modal";
import { NewBoardModal } from "@/components/modals/new-board-modal/new-board-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <RenameModal />
      <CardModal />
      <NewBoardModal />
    </>
  )
}