// eslint-disable-next-line import/newline-after-import
import {
  FieldForm as Form,
  Input,
  messageToast,
  Modal,
  Option,
  Select,
  TextArea
} from '@digihcs/innos-ui3'
import { ConfirmType } from '@digihcs/util/lib/enums/ConfirmType'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RefObject, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { editorConfig } from 'src/constant'
import {
  EnumStockModelStatus,
  GetStockModelByIdQuery,
  LinkImage,
  TypeImage,
  useCreateStockModelMutation,
  useGetMapStockModelRelatedsByStockModelQuery,
  useGetStockModelByIdQuery,
  useGetStockModelPaginationQuery,
  useUpdateStockModelMutation
} from 'src/graphql-definition/webinfo-service.generated'
import { REGEX_SLUG } from 'src/utils/function'
import {
  backendUrlFile,
  uploadFile,
  uploadMultiFile
} from 'src/utils/uploadFile'

import dataStockModelsGroup from '../ManageProduct/directories.json'
import { ProductsType } from '../ManageProduct/type'
import ButtonAction from './ButtonAction'
import IcdPhuField, { IcdData } from './IcdPhuField'
import UploadButton, { UploadMultiImageRefs } from './uploadMultiImage'
import UploadImage from './uploadSingleImage'

import './styles.less'

const FormProduct = () => {
  const { idItem }: { idItem: string } = useParams()
  const editorRef = useRef<any>(null)
  const { CKEditor, Editor } = editorRef.current || {}
  const [content, setContent] = useState('')
  const { t } = useTranslation()
  const [currentProducts, setCurrentProducts] = useState<
    GetStockModelByIdQuery['getStockModelById']
  >({})
  const [selectedValues, setSelectedValues] = useState<IcdData[]>([])
  const [form] = Form.useForm()
  const [mounted, setMounted] = useState(false)
  const { resetFields, validateFields } = form
  const history: any = useHistory()
  // single image
  const [imageUrl, setImageUrl] = useState<any>()
  const singleImageRef = useRef<any>()
  const singleFileRef = useRef<any>()
  // multi image
  const [listImages, setListImages] = useState<any>([])
  const ecomMultiImages = useRef<any[]>([])
  const [IsWarning, setIsWarning] = useState(false)

  // ref multi Image
  const imagesRef: RefObject<UploadMultiImageRefs> = useRef()

  const [callCreateCategories] = useCreateStockModelMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.createStockModel?._id) {
        setContent('')
        resetFields()
        setImageUrl({})
        ecomMultiImages.current = []
        singleImageRef.current = null
        messageToast.success({
          message: t('product.notiCreateSuccess')
        })
      }
      handleLoadGrid()
    },
    onError: (error) => {
      const errorApollo: any = error?.graphQLErrors?.[0]
      messageToast.error({
        message: errorApollo?.code
          ? t(`errorCode.${errorApollo?.code}`)
          : error?.message,
        duration: 2
      })
    }
  })
  const [callUpdateCategories] = useUpdateStockModelMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.updateStockModel?._id) {
        setContent('')
        resetFields()
        setImageUrl({})
        ecomMultiImages.current = []
        singleImageRef.current = null
        messageToast.success({
          message: t('product.notiUpdateSuccess')
        })
      }
      handleLoadGrid()
    },
    onError: (error) => {
      const errorApollo: any = error?.graphQLErrors?.[0]
      messageToast.error({
        message: errorApollo?.code
          ? t(`errorCode.${errorApollo?.code}`)
          : error?.message,
        duration: 2
      })
    }
  })
  // const hanleChangeSlug: any = async (e: any) => {
  //   if (!currentProducts?._id) {
  //     const title = e.target.value
  //     const newSlug = await generateSlug(title)
  //     form.setFieldsValue({
  //       ecomSlug: newSlug
  //     })
  //   }
  // }
  const { data: dataStockModelByRelated } =
    useGetMapStockModelRelatedsByStockModelQuery({
      fetchPolicy: 'no-cache',
      variables: { idStockModel: idItem }
    })
  const { data: dataStockModelById } = useGetStockModelByIdQuery({
    fetchPolicy: 'no-cache',
    variables: { id: idItem }
  })
  const { data: dataStockModel } = useGetStockModelPaginationQuery({
    fetchPolicy: 'no-cache',
    variables: {
      limit: 20,
      idsDefault:
        dataStockModelByRelated?.getMapStockModelRelatedsByStockModel?.map(
          (i: any, index: number) => i?.idStockModelRelated
        )
    }
  })
  const loadDataStockModel = () => {
    if (dataStockModelById) {
      const {
        name,
        ecomShortDescription,
        code,
        ecomDescription,
        prices,
        ecomImages,
        upc,
        sku,
        ecomStatus,
        ecomSlug
      } = dataStockModelById?.getStockModelById

      form.setFieldsValue({
        name,
        code,
        ecomShortDescription,
        mainImage: ecomImages[0]?.linkImage || {},
        ecomImages: ecomImages?.slice(1) || [],
        prices: prices[0]?.price[0] || null,
        upc,
        sku,
        ecomStatus,
        ecomSlug,
        productRelated:
          dataStockModelByRelated?.getMapStockModelRelatedsByStockModel?.map(
            (i: any, index: number) => i?.idStockModelRelated
          )
      })
      singleImageRef.current = ecomImages[0]?.linkImage || {}
      ecomMultiImages.current = ecomImages?.slice(1) || []
      setContent(ecomDescription)
      setCurrentProducts(dataStockModelById?.getStockModelById)
    }
  }
  useEffect(() => {
    loadDataStockModel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataStockModelById?.getStockModelById])
  useEffect(() => {
    editorRef.current = {
      // eslint-disable-next-line global-require
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      // eslint-disable-next-line global-require
      Editor: require('@digihcs/ckeditor5-all-plugin').Editor
    }
    setMounted(true)
  }, [])

  const onSubmit = () => {
    const images: any = imagesRef?.current?.getValue()

    if (imageUrl === null) {
      form.setFields([
        {
          name: 'mainImage',
          value: null
        }
      ])
      validateFields()
      return
    }
    validateFields()
      .then((values) => {
        const newArrImages: any[] = JSON.parse(
          JSON.stringify(
            ecomMultiImages.current.length > 0
              ? [...ecomMultiImages.current].map((img) => img)
              : []
          )
        )

        let singleLinkImage: any = { ...singleImageRef.current } || null
        uploadFile(
          'image',
          [singleFileRef?.current?.file],
          (err: any, res: any) => {
            const newLinkImage: LinkImage = {
              url: `${backendUrlFile.image}/${res?.[0]?.filename}`,
              fileName: res?.[0]?.filename,
              type: TypeImage.File
            }

            if (newLinkImage && newLinkImage?.fileName) {
              singleLinkImage = newLinkImage
            }
            uploadMultiFile('image', images?.files, (err: any, res: any) => {
              for (let i = 0; i < res.length; i++) {
                const newLinkImage: LinkImage = {
                  url: `${backendUrlFile.image}/${res?.[i]?.filename}`,
                  fileName: res?.[i]?.filename,
                  type: TypeImage.File
                }

                newArrImages.push({ linkImage: newLinkImage })
              }

              const {
                name,
                ecomShortDescription,
                prices,
                upc,
                sku,
                productRelated,
                ecomStatus,
                ecomSlug
              } = values
              const input = {
                name,
                ecomDescription: content,
                ecomShortDescription,
                prices: [{ idPriceType: 'default', price: [+prices] }],
                upc,
                sku,
                unit: {
                  name: ['box'],
                  factor: [1],
                  realFactor: [1],
                  sumFactor: 1
                },
                ecomImages: [{ linkImage: singleLinkImage }, ...newArrImages],
                ecomStatus,
                ecomSlug: ecomSlug !== '' ? ecomSlug : undefined
              }
              if (currentProducts?._id) {
                const queryValue = {
                  variables: {
                    id: currentProducts?._id,
                    input: {
                      ...input
                    },

                    idsStockModelRelated: productRelated
                  }
                }

                callUpdateCategories(queryValue)
              } else {
                const queryValue = {
                  variables: {
                    input: {
                      ...input
                    },
                    idsStockModelRelated: productRelated
                  }
                }

                callCreateCategories(queryValue)
              }
            })
          }
        )
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err, 'err'))
  }
  const handleReset = () => {
    if (dataStockModelById?.getStockModelById) {
      loadDataStockModel()
      setSelectedValues([])
      setListImages([])
    } else {
      setContent('')
      resetFields()
      setImageUrl({})
      setSelectedValues([])
      setListImages([])
      ecomMultiImages.current = []
    }
  }
  const handleLoadGrid = () => {
    let finded = null
    const findedCT_Blogs = dataStockModelsGroup.find(
      (i: ProductsType) => i.route === '/product-list'
    )

    finded = findedCT_Blogs
    if (finded?.type === 'his') {
      history.push(`/manage-product${finded.route}`)
    } else {
      window.location.href = `${window.location.origin}/manage-product${finded?.route}`
    }
  }
  const handlebBackGrid = (action: string) => {
    if (IsWarning) {
      Modal.confirm({
        wrapClassName: 'waringModal',
        title: t('product.titleWarning'),
        centered: true,
        type: ConfirmType.Warning,
        okText: t('product.btnOK'),
        cancelText: t('product.btnCancel'),
        content: t('product.msgWarning'),
        onOk: () => {
          if (action === 'back') handleLoadGrid()
          else if (action === 'cancel') {
            handleReset()
            setIsWarning(false)
          }
          singleFileRef.current = null
        }
      })
    } else {
      if (action === 'back') handleLoadGrid()
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      else action === 'cancel'
      handleReset()
    }
  }
  return (
    <div
      style={{
        background: '#f5f5f5',
        height: '100%',
        overflow: 'auto'
      }}
    >
      <div className='container-fluid'>
        <Form
          form={form}
          layout={FormLayout.Horizontal}
          className='formProduct mt-2'
        >
          <div className='row'>
            <div className='col-12'>
              <div className='card'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FontAwesomeIcon
                    style={{ margin: '10px' }}
                    icon={faArrowLeft}
                    onClick={() => handlebBackGrid('back')}
                    className='back-grid-icon'
                  />

                  <b className='title'>
                    {(currentProducts && currentProducts?.name) ||
                      t('product.titleNewProduct')}
                  </b>
                </div>
              </div>
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col-9' style={{ paddingRight: 0 }}>
              <div className='card'>
                <div className='card-body'>
                  <Form.Item
                    name='name'
                    rules={[
                      {
                        required: true,
                        message: t('product.msgNameMissing')
                      }
                    ]}
                    style={{ marginBottom: '15px' }}
                    label={t('product.textName')}
                    labelStyle={{ width: '115px', textAlign: 'left' }}
                    className='custom-width-50'
                  >
                    <Input
                      placeholder={t('product.holderName')}
                      // onBlur={hanleChangeSlug}
                      onChange={() => setIsWarning(true)}
                    />
                  </Form.Item>
                  <Form.Item
                    name='prices'
                    style={{ marginBottom: '15px' }}
                    label={t('product.price')}
                    labelStyle={{ width: '115px', textAlign: 'left' }}
                    className='custom-width-50'
                  >
                    <Input.Number
                      min={0}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      }
                      placeholder={t('product.holderPrice')}
                      onChange={() => setIsWarning(true)}
                    />
                  </Form.Item>
                  <Form.Item
                    name='upc'
                    style={{ marginBottom: '15px' }}
                    label={t('product.textUpc')}
                    labelStyle={{ width: '115px', textAlign: 'left' }}
                    className='custom-width-50'
                  >
                    <Input
                      placeholder={t('product.holderUpc')}
                      onChange={() => setIsWarning(true)}
                    />
                  </Form.Item>
                  <Form.Item
                    name='sku'
                    style={{ marginBottom: '15px' }}
                    label={t('product.textSku')}
                    labelStyle={{ width: '115px', textAlign: 'left' }}
                    className='custom-width-50'
                  >
                    <Input
                      placeholder={t('product.holderSku')}
                      onChange={() => setIsWarning(true)}
                    />
                  </Form.Item>
                  <Form.Item
                    name='ecomSlug'
                    rules={[
                      {
                        pattern: REGEX_SLUG,
                        message: t('product.msgSlugHasSpecialCharacter')
                      }
                    ]}
                    label='Slug'
                    labelStyle={{ width: '115px', textAlign: 'left' }}
                    className='custom-width-50'
                  >
                    {dataStockModelById ? (
                      <Input placeholder={t('product.holderSlug')} readOnly />
                    ) : (
                      <Input
                        placeholder={t('product.holderSlug')}
                        onChange={() => {
                          setIsWarning(true)
                        }}
                      />
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className='card mt-2'>
                <div className='card-body'>
                  <Form.Item
                    name='ecomShortDescription'
                    label={t('product.textShortDesc')}
                    rules={[
                      {
                        required: true,
                        message: t('product.msgShortDescMissing')
                      }
                    ]}
                    labelStyle={{
                      textAlign: 'left'
                    }}
                    style={{
                      display: 'unset'
                    }}
                    className='custom-width-100'
                  >
                    <TextArea onChange={() => setIsWarning(true)} rows={5} />
                  </Form.Item>

                  <div className='cms-ck'>
                    <div
                      className='ck-editor__editable '
                      style={{ height: '100%' }}
                    >
                      {mounted && (
                        <div>
                          <Form.Item
                            name='ecomDescription'
                            style={{
                              width: '100%',
                              height: '100%',
                              display: 'unset'
                            }}
                            label={t('product.textLongDesc')}
                            labelStyle={{ width: '150px', textAlign: 'left' }}
                          >
                            <CKEditor
                              type=''
                              name='ContentEditor'
                              data={content || ''}
                              editor={Editor}
                              config={editorConfig}
                              width='100%'
                              onChange={(event: any, editor: any) => {
                                setContent(editor.getData())
                              }}
                              onFocus={() => setIsWarning(true)}
                            />
                          </Form.Item>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='card mt-2 mb-2'>
                <div className='card-body'>
                  <Form.Item
                    label={t('product.textProductRelated')}
                    name='productRelated'
                    labelStyle={{
                      width: '115px',
                      textAlign: 'left'
                    }}
                    className='custom-select-option'
                  >
                    <IcdPhuField
                      options={
                        dataStockModel?.getStockModelPagination?.data || []
                      }
                      style={{ height: 35, width: '100%' }}
                      onChange={() => setIsWarning(true)}
                      selectedValues={selectedValues}
                      setSelectedValues={setSelectedValues}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className='col-3'>
              <div className='card col-12'>
                <b className='card-title'>{t('product.textStatus')}</b>

                <div className='text-center'>
                  <Form.Item name='ecomStatus'>
                    <Select
                      onChange={() => setIsWarning(true)}
                      style={{ marginBottom: '15px' }}
                      defaultValue={EnumStockModelStatus.NotPublic}
                    >
                      <Option
                        label={EnumStockModelStatus.Public}
                        value={EnumStockModelStatus.Public}
                      >
                        {t('product.textPublic')}
                      </Option>
                      <Option
                        label={EnumStockModelStatus.NotPublic}
                        value={EnumStockModelStatus.NotPublic}
                      >
                        {t('product.textDraft')}
                      </Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className='card col-12 mt-2'>
                <b className='card-title'>{t('product.titleProductImage')}</b>

                <div className='text-center col-12'>
                  <UploadImage
                    singleImageRef={singleImageRef}
                    imageUrl={imageUrl}
                    singleFileRef={singleFileRef}
                    setImageUrl={setImageUrl}
                    handleUploadCallback={(file: any) => {
                      form.setFields([
                        {
                          name: 'mainImage',
                          value: file
                        }
                      ])
                      setIsWarning(true)
                    }}
                  />
                </div>
              </div>
              <div className='card col-12 mt-2'>
                <b className='card-title'>
                  {t('product.titleProductGalleryImage')}
                </b>

                <UploadButton
                  ref={imagesRef}
                  ecomImages={ecomMultiImages.current}
                  listImages={listImages}
                  setListImages={setListImages}
                  handleUploadCallback={(file: any) => {
                    form.setFields([
                      {
                        name: 'ecomImages',
                        value: file
                      }
                    ])
                    setIsWarning(true)
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className='w-100 position-absolute bg-white  shadow-lg p-2'
            style={{ left: 0, bottom: 0 }}
          >
            <div style={{ marginTop: -20 }}>
              <ButtonAction
                setContent={setContent}
                onSubmit={onSubmit}
                onCancel={() => {
                  handlebBackGrid('cancel')
                }}
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default FormProduct
