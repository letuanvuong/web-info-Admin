import { AddSapIcon, RemoveFluentIcon } from '@digihcs/icons'
import { FieldForm as Form } from '@digihcs/innos-ui3'
import { Upload } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { base64ToFile } from 'src/utils/function'
import { getUrlImage } from 'src/utils/uploadFile'

interface UploadImageProps {
  imageUrl?: any
  handleUploadCallback?: Function
  setImageUrl?: Function
  singleImageRef?: any
  singleFileRef?: any
}
const UploadImage = ({
  imageUrl,
  handleUploadCallback,
  setImageUrl,
  singleImageRef,
  singleFileRef
}: UploadImageProps) => {
  const { t } = useTranslation()
  const convertImages = async (imageConvert: any) => {
    const image = {
      base64: getUrlImage(imageConvert),
      fileName: imageConvert?.fileName
    }
    if (image.base64 !== undefined) {
      setImageUrl(image)
    }
  }
  useEffect(() => {
    convertImages(singleImageRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleImageRef.current])
  const handleRemove = (e: any) => {
    e.stopPropagation()
    setImageUrl(null)
    singleImageRef.current = null
    singleFileRef.current = null
    handleUploadCallback([])
  }
  const onSelectFile = (file: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = async (e) => {
      if (e?.target?.result) {
        const fileName = file.name
        singleImageRef.current = {
          base64: e.target.result,
          fileName
        }
        const reFile = await base64ToFile(e.target.result, fileName, file.type)
        singleFileRef.current = {
          file: reFile
        }

        handleUploadCallback(singleImageRef?.current)
        setImageUrl(JSON.parse(JSON.stringify(singleImageRef?.current)))
      }
    }
  }
  return (
    <>
      <Form.Item
        name='mainImage'
        rules={[
          {
            required: true,
            message: t('manageBlog.msgImagetMissing')
          }
        ]}
      >
        <Upload
          name='avatar'
          showUploadList={false}
          listType='picture-card'
          accept='.png,.jpg,.jpeg'
          beforeUpload={onSelectFile}
          className='mainImage'
        >
          <div
            style={{
              position: 'relative',
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'blue',
              fontWeight: 'bold',
              fontSize: '25px',
              cursor: 'pointer'
            }}
          >
            {imageUrl && imageUrl.base64 ? (
              <>
                <img
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill'
                  }}
                  alt={imageUrl.fileName}
                  src={imageUrl.base64}
                />
                <p onClick={handleRemove} className='icon-remove'>
                  <RemoveFluentIcon />
                </p>
              </>
            ) : (
              <AddSapIcon />
            )}
          </div>
        </Upload>
      </Form.Item>
    </>
  )
}

export default UploadImage
