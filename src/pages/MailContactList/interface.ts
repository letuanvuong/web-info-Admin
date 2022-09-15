export interface MessageModalProps {
  callBack: () => Promise<void>
}

export interface MessageModalRef {
  onOpenModal: () => void
  setSelectedRow: (selectedRow: any) => void
}
