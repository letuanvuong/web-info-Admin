import { FileUploader, Modal } from '@digihcs/innos-ui3'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Iprops {
  visibleImport?: boolean;
  setVisibleImport?: any;
  readXLSXFile?: (target: any) => void;
}

const ImportModal = ({ visibleImport, setVisibleImport, readXLSXFile }: Iprops) => {


  const [files, setFiles] = useState(null)
  const { t } = useTranslation()

  return (
    <Modal
      visible={visibleImport}
      title={t('product.AddProductFile')}
      onCancel={() => setVisibleImport(false)}
      width='600px'
      centered
      className='stock-model-modal'
      onOk={() => readXLSXFile({ target: { files } })}
    >
      <FileUploader
        placeholder={t('product.ClickUpload')}
        tooltip={t('product.ClickUpload')}
        accept='.xlsx'
        maximumFileSize={2}
        maximumFilenameLength={20}
        onChange={value => setFiles(value)}
        beforeUpload={() => false}
      />
    </Modal>
  )
}

export default ImportModal
