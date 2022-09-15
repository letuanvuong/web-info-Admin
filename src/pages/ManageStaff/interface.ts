export interface StaffModalProps {
  callBack: () => Promise<void>
}

export interface StaffModalRef {
  onOpenModal: () => void
  setSelectedRow: (selectedRow: any) => void
}
