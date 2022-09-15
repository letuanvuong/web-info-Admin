import { AddSapIcon } from '@digihcs/icons'
import { Upload } from 'antd'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useCallback, useEffect, useState } from 'react'
import {
  LinkImage,
  TypeImage
} from 'src/graphql-definition/webinfo-service.generated'
import { backendUrlFile, getUrlImage, uploadFile } from 'src/utils/uploadFile'

interface UploadImageProps {
  linkImage?: LinkImage
  imageUrl?: LinkImage
  setImageUrl?: Function
  handleUploadCallback?: Function
  sizeHeight?: string | number
}

function UploadImage({
  linkImage,
  setImageUrl,
  handleUploadCallback,
  sizeHeight = 120
}: UploadImageProps) {
  // const [imageUrl, setImageUrl] = useState<LinkImage>({})

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

  useEffect(() => {
    setImageUrl(linkImage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          height: sizeHeight,
          width: '100%',
          display: 'flex',
          borderRadius: 4,
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #D9D9D9'
        }}
      >
        {linkImage ? (
          <img
            alt='img'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'fill'
              // borderRadius: 10
            }}
            src={getUrlImage(linkImage)}
          />
        ) : (
          <AddSapIcon />
        )}
      </div>
    </Upload>
  )
}

export default UploadImage
