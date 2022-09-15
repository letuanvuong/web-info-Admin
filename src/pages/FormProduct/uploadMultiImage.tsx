import { AddSapIcon, RemoveFluentIcon } from '@digihcs/icons'
import { FieldForm as Form, messageToast } from '@digihcs/innos-ui3'
import { Upload } from 'antd'
import { forwardRef, memo, useEffect, useImperativeHandle, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { LinkImage } from 'src/graphql-definition/webinfo-service.generated'
import { base64ToFile } from 'src/utils/function'
import { getUrlImage } from 'src/utils/uploadFile'


export interface UploadMultiImageRefs {
  getValue: () => void
}
interface UploadImageProps {
  ecomImages?: {
    linkImage: LinkImage
  }[]
  handleUploadCallback?: Function
  listImages: any
  setListImages: any
}

const UploadImage = memo(
  forwardRef<UploadMultiImageRefs, UploadImageProps>((props, ref) => {
    const { ecomImages, handleUploadCallback, listImages, setListImages } =
      props
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'bmp']
    const { t } = useTranslation()
    const allImagesRef = useRef<any>([])
    const allFilesRef = useRef<any>([])

    const getValue = () => ({
      files: allFilesRef?.current
    })
    const convertImages = async (images: any = []) => {
      const listImages = []
      /* eslint no-await-in-loop: "off" */
      /* eslint no-restricted-syntax: "off" */
      for (const image of images) {
        listImages.push({
          base64: getUrlImage(image?.linkImage),
          fileName: image?.linkImage?.fileName
        })
      }
      allFilesRef.current = []
      allImagesRef.current = listImages
      setListImages(listImages)
    }
    const handleRemove = (index: number) => {
      const existFileIndex = allFilesRef?.current?.findIndex(
        (e: any) => e.file.name === allImagesRef?.current[index].fileName
      )
      if (existFileIndex !== -1) {
        allFilesRef?.current?.splice(existFileIndex, 1)
      }
      allImagesRef?.current?.splice(index, 1)
      setListImages(JSON.parse(JSON.stringify(allImagesRef?.current)))
      if (ecomImages[index] && getUrlImage(ecomImages[index]?.linkImage)) {
        ecomImages.splice(index, 1)
      }
      handleUploadCallback([...ecomImages, ...allImagesRef.current])
    }
    const handleUpload = (file: any) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = async (e) => {
        if (e?.target?.result) {
          let hasFile = false
          if (
            allImagesRef?.current?.findIndex(
              (image: any) => image.base64 === e.target.result
            ) < 0
          ) {
            let fileNamePrefix = ''
            if (
              imageExtensions.includes(
                file.name?.split('.').pop().toLowerCase()
              )
            ) {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              fileNamePrefix = 'image'
            } else {
              messageToast.warning({
                message: t('product.noteImgInvalid')
              })
              return
            }
            const fileName = file.name
            allImagesRef.current = allImagesRef?.current?.concat([
              {
                base64: e.target.result,
                fileName
              }
            ])
            const reFile = await base64ToFile(
              e.target.result,
              fileName,
              file.type
            )
            allFilesRef.current = allFilesRef?.current?.concat([
              {
                file: reFile
              }
            ])
            handleUploadCallback(allImagesRef?.current)
            setListImages(JSON.parse(JSON.stringify(allImagesRef?.current)))
            hasFile = true
          }
          if (!hasFile) {
            messageToast.warning({
              message: t('product.noteImgExists')
            })
          }
        }
      }
    }
    useEffect(() => {
      convertImages(ecomImages)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ecomImages])
    useImperativeHandle(ref, () => ({
      getValue
    }))
    return (
      <>
        <div className='row'>
          {listImages.map((image: any, idx: number) => (
            <div
              key={idx}
              style={{
                marginTop: '10px',
                position: 'relative',
                height: '71px',
                width: '62px',
                cursor: 'pointer'
              }}
              className='col-3 pt--custom'
            >
              <p onClick={() => handleRemove(idx)} className='icon-remove'>
                <RemoveFluentIcon />
              </p>
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill'
                }}
                alt={image.fileName}
                src={image.base64}
              />
            </div>
          ))}
          <div className='col-3 pt--custom'>
            <Form.Item
              name='ecomImages'
              rules={[
                {
                  required: true,
                  message: t('product.msgImagesMissing')
                }
              ]}
            >
              <div
                style={{
                  marginTop: '10px',
                  position: 'relative',
                  height: '71px',
                  width: '52px',
                  color: 'blue'
                }}
              >
                <Upload
                  multiple
                  showUploadList={false}
                  listType='picture-card'
                  accept='.png,.jpg,.jpeg'
                  beforeUpload={handleUpload}
                >
                  <AddSapIcon />
                </Upload>
              </div>
            </Form.Item>
          </div>
        </div>
        <p className='text-center text-small'>
          <i>{t('product.titleClick')}</i>
        </p>
      </>
    )
  })
)

export default UploadImage
