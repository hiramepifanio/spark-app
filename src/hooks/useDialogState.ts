import { useState } from "react";

interface DialogState<T> {
  isOpen: boolean
  open: (subject: T) => void
  close: () => void
  subject: T | null
}

export function useDialogState<T>(initialState: boolean): DialogState<T> {
  const [isOpen, setIsOpen] = useState<boolean>(initialState)
  const [subject, setSubject] = useState<T | null>(null)
  
  function open(subject: T | null = null): void {
    setIsOpen(true)
    setSubject(subject)
  }
  
  function close(): void {
    setIsOpen(false)
    setSubject(null)
  }

  return {
    isOpen,
    open,
    close,
    subject
  }
}