import { AddSapIcon, SysMinusSapIcon } from '@digihcs/icons'
import { FieldForm as Form } from '@digihcs/innos-ui3'
import { Upload } from 'antd'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  LinkImage,
  TypeImage
} from 'src/graphql-definition/webinfo-service.generated'
import { backendUrlFile, getUrlImage, uploadFile } from 'src/utils/uploadFile'

import './styles.less'

interface UploadImageProps {
  imageUrl?: LinkImage
  handleUploadCallback?: Function
  setImageUrl?: Function
}

function UploadImage({
  imageUrl,
  handleUploadCallback,
  setImageUrl
}: UploadImageProps) {
  // const [imageUrl, setImageUrl] = useState<LinkImage>({})
  // const [isWarning, setIsWarning] = useState(false)
  const { t } = useTranslation()

  const handleUpload = useCallback(
    (file: any) => {
      if (file) {
        uploadFile('image', [file], (err: any, res: any) => {
          try {
            if (!res || err) throw new Error('Upload image error')
            const newLinkImage: LinkImage = {
              url: `${backendUrlFile.image}/${res?.[0]?.filename}`,
              fileName: res?.[0]?.filename,
              type: TypeImage.File
            }
            setImageUrl(newLinkImage)
            handleUploadCallback?.(newLinkImage)
          } catch (error) {
            // messageToast.error({
            //   message: 'Tải ảnh lên thất bại'
            // })
          }
        }).catch(() => {
          // messageToast.error({
          //   message: 'Tải ảnh lên thất bại'
          // })
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleUploadCallback]
  )

  const handleRemove = (e: any) => {
    e.stopPropagation()
    setImageUrl(null)
    handleUploadCallback([])
  }
  useEffect(() => {
    setImageUrl(imageUrl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl])

  return (
    <>
      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: -20,
          marginRight: 40
          // border: '1px solid #D9D9D9'
        }}
      >
        <SysMinusSapIcon style={{ color: 'red' }} />
      </div> */}
      <Form.Item
        name='mainPhoto'
        rules={[
          {
            required: true,
            message: t('service.msgMainPhotoMissing')
          }
        ]}
      >
        <Upload
          action=''
          name='avatar'
          showUploadList={false}
          listType='picture-card'
          accept='.png,.jpg,.jpeg'
          beforeUpload={handleUpload}
        >
          <div
            style={{
              height: 193,
              width: 193,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#DDDDDD',
              position: 'relative'
              // border: '1px solid #D9D9D9'
            }}
          >
            {imageUrl ? (
              <>
                <img
                  alt='img'
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill'
                    // borderRadius: 10
                  }}
                  src={getUrlImage(imageUrl)}
                />
                <SysMinusSapIcon
                  className='icon-remove'
                  onClick={handleRemove}
                />
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
