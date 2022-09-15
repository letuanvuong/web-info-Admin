import { AddSapIcon } from '@digihcs/icons'
import { messageToast } from '@digihcs/innos-ui3'
import { Upload } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import {
  LinkImage,
  TypeImage
} from 'src/graphql-definition/webinfo-service.generated'
import { backendUrlFile, getUrlImage, uploadFile } from 'src/utils/uploadFile'

interface UploadImageProps {
  linkImage?: LinkImage
  handleUploadCallback?: Function
}

function UploadImage({ linkImage, handleUploadCallback }: UploadImageProps) {
  const [imageUrl, setImageUrl] = useState<LinkImage>({})

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
            messageToast.error({
              message: 'Tải ảnh lên thất bại'
            })
          }
        }).catch(() => {
          messageToast.error({
            message: 'Tải ảnh lên thất bại'
          })
        })
      }
    },
    [handleUploadCallback]
  )

  useEffect(() => {
    setImageUrl(linkImage)
  }, [linkImage])

  return (
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
          height: 228,
          width: '100%',
          display: 'flex',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#DDDDDD',
          border: '1px solid #D9D9D9'
        }}
      >
        {imageUrl ? (
          <img
            alt='img'
            style={{
              width: '100%',
              objectFit: 'fill',
              borderRadius: 10
            }}
            src={getUrlImage(imageUrl)}
          />
        ) : (
          <AddSapIcon />
        )}
      </div>
    </Upload>
  )
}

export default UploadImage
