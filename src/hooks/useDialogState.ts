import { useState } from "react";

export interface DialogState<T> {
  isOpen: boolean
  open: (subject?: T | null) => void
  close: () => void
  subject: T | null
}

export function useDialogState<T>(): DialogState<T> {
  const [isOpen, setIsOpen] = useState(false)
  const [subject, setSubject] = useState<T | null>(null)
  
  function open(subject: T | null = null): void {
    setIsOpen(true)
    setSubject(subject)
  }
  
  function close(): void {
    setIsOpen(false)
    setSubject(null)
  }

  return { isOpen, open, close, subject }
}