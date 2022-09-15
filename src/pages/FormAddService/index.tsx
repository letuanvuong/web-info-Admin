import { BackFluentIcon } from '@digihcs/icons'
import {
  Col,
  FieldForm as Form,
  Input,
  messageToast,
  Modal,
  Row,
  TextArea
} from '@digihcs/innos-ui3'
import { ConfirmType } from '@digihcs/util/lib/enums/ConfirmType'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { editorConfig } from 'src/constant'
import {
  LinkImage,
  Service,
  TypeImage,
  useCreateServiceMutation,
  useGetServiceByIdQuery,
  useUpdateServiceMutation
} from 'src/graphql-definition/webinfo-service.generated'
import { REGEX_SLUG } from 'src/utils/function'
import UploadImage from 'src/utils/reviewbeforeuploadsinglefile'
import { backendUrlFile, uploadFile } from 'src/utils/uploadFile'

import ButtonAction from '../CMSHome/ButtonAction'
import dataServicesGroup from '../ManageService/directories.json'
import { ServicesType } from '../ManageService/type'

import './styles.less'

type ServicesPassing = {
  currentServices: Service | null
}

function FormAddService() {
  const editorRef = useRef<any>(null)
  const { CKEditor, Editor } = editorRef.current || {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentServices, setCurrentServices] = useState<ServicesPassing[]>([])
  const [isWarning, setIsWarning] = useState(false)
  // const [imageUrl, setImageUrl] = useState<LinkImage>(null)
  const { t } = useTranslation()
  const [formInfo] = Form.useForm()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { resetFields, validateFields } = formInfo
  const [ckcontent, setCKcontent] = useState('')
  const [mounted, setMounted] = useState(false)
  const { idItem }: { idItem: string } = useParams()
  const history: any = useHistory()

  // upload single file
  const [imageUrl, setImageUrl] = useState<any>()
  const singleImageRef = useRef<any>()
  const singleFileRef = useRef<any>()
  const { data: dataServiceById, refetch } = useGetServiceByIdQuery({
    variables: {
      id: idItem
    }
  })

  useEffect(() => {
    editorRef.current = {
      // eslint-disable-next-line global-require
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      // eslint-disable-next-line global-require
      Editor: require('@digihcs/ckeditor5-all-plugin').Editor
    }
    setMounted(true)
  }, [])
  const FieldDefault = () => {
    if (dataServiceById) {
      // setImageUrl(dataServiceById?.getServiceById.mainPhoto || null)
      singleImageRef.current = dataServiceById?.getServiceById.mainPhoto || null
      const { title, sortDescription, desciption, keywords, slug } =
        dataServiceById.getServiceById
      formInfo.setFieldsValue({
        mainPhoto: dataServiceById?.getServiceById.mainPhoto || null,
        title,
        sortDescription,
        desciption,
        keywords,
        slug
      })
      setCurrentServices([])
    }
  }

  useEffect(() => {
    FieldDefault()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataServiceById?.getServiceById])
  const setAllForm = async () => {
    if (dataServiceById?.getServiceById) {
      refetch({ id: idItem })
        .then(({ errors, data }) => {
          FieldDefault()
        })
        .catch((err) => {})
    } else {
      formInfo.resetFields()
      setImageUrl(null)
    }
    setFieldCKData()
  }

  const setFieldCKData = () => {
    if (dataServiceById?.getServiceById) {
      setCKcontent(dataServiceById?.getServiceById?.desciption || '')
    } else setCKcontent('')
  }

  useEffect(() => {
    setFieldCKData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataServiceById?.getServiceById])

  const [callCreateService] = useCreateServiceMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.createService?._id) {
        messageToast.success({
          message: t('service.notiCreateSuccess')
        })
        setImageUrl({})
        singleImageRef.current = null
        setCKcontent('')
        formInfo.resetFields()
        handleLoadGrid()
      }
    },
    onError: (error) => {
      messageToast.error({
        message: error?.message ? error?.message : t('service.notiCreateFaild')
      })
    }
  })
  const [callUpdateService] = useUpdateServiceMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.updateService?._id) {
        messageToast.success({
          message: t('service.notiUpdateSuccess')
        })
        setImageUrl({})
        singleImageRef.current = null
        setCKcontent('')
        formInfo.resetFields()
        handleLoadGrid()
      }
    },
    onError: (error) => {
      messageToast.error({
        message: error?.message ? error?.message : t('service.notiUpdateFaild')
      })
    }
  })
  const onClickWarning = () => {
    Modal.confirm({
      wrapClassName: 'deleteModal',
      title: t('service.textWarning'),
      centered: true,
      type: ConfirmType.Warning,
      okText: t('service.btnOk'),
      cancelText: t('service.btnCancel'),
      content: t('service.msgWarning'),
      onOk: () => handleLoadGrid()
    })
  }
  const onClickWarningResetField = () => {
    Modal.confirm({
      wrapClassName: 'deleteModal',
      title: t('service.textWarning'),
      centered: true,
      type: ConfirmType.Warning,
      okText: t('service.btnOk'),
      cancelText: t('service.btnCancel'),
      content: t('service.msgWarning'),
      onOk: () => {
        setAllForm()
        singleFileRef.current = null
        setIsWarning(false)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }
  const handleBackGrid = () => {
    if (isWarning) {
      onClickWarning()
    } else {
      handleLoadGrid()
    }
  }
  const handleResetField = () => {
    if (isWarning) {
      onClickWarningResetField()
    } else {
      setAllForm()
    }
  }
  const handleLoadGrid = () => {
    let finded = null
    const findedCT_Services = dataServicesGroup.find(
      (i: ServicesType) => i.route === '/service-list'
    )

    finded = findedCT_Services
    if (finded?.type === 'his') {
      history.push(`/manage-service${finded.route}`)
    } else {
      window.location.href = `${window.location.origin}/manage-service${finded?.route}`
    }
  }
  const onSubmit = () => {
    if (imageUrl === null) {
      formInfo.setFields([
        {
          name: 'mainPhoto',
          value: null
        }
      ])
      validateFields()
      return
    }
    validateFields()
      .then((values) => {
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
            const { title, sortDescription, keywords, slug } = values
            const input = {
              mainPhoto: singleLinkImage,
              title,
              sortDescription,
              keywords,
              desciption: ckcontent,
              slug: slug !== '' ? slug : undefined
            }

            if (dataServiceById) {
              const queryValue = {
                variables: {
                  id: dataServiceById.getServiceById._id,
                  input
                }
              }
              callUpdateService(queryValue)
            } else {
              const queryValue = {
                variables: {
                  input: {
                    ...input
                  }
                }
              }
              callCreateService(queryValue)
            }
          }
        )
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err, 'err'))
  }

  return (
    <div className='form-add' style={{ height: '100%', overflow: 'auto' }}>
      <div className='tile-service'>
        <h3
          style={{
            fontSize: 14,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            padding: 6
          }}
        >
          <span className='title'>
            <BackFluentIcon
              className='back-grid'
              onClick={() => {
                handleBackGrid()
              }}
            />
            {dataServiceById?.getServiceById
              ? dataServiceById?.getServiceById?.title
              : t('service.titleNewService')}
          </span>
        </h3>
      </div>
      <Form
        form={formInfo}
        layout={FormLayout.Vertical}
        className='add_service_form'
      >
        <Row>
          <Col span='XL9 L9 M9 S9'>
            <div className='form-item'>
              <Row>
                <Form layout={FormLayout.Horizontal} form={formInfo}>
                  <div>
                    <Form.Item
                      name='title'
                      rules={[
                        {
                          required: true,
                          message: t('service.msgNameMissing')
                        }
                      ]}
                      label={t('service.textTitle')}
                      labelStyle={{ width: 120, marginRight: 20 }}
                    >
                      <Input
                        placeholder={t('service.holderName')}
                        onChange={() => {
                          setIsWarning(true)
                        }}
                        style={{ width: '500px' }}
                      />
                    </Form.Item>
                    <Form.Item
                      name='sortDescription'
                      rules={[
                        {
                          required: true,
                          message: t('service.msgShortDescriptionMissing')
                        }
                      ]}
                      label={t('service.textShortDescription1')}
                      labelStyle={{ width: 120, marginRight: 20 }}
                    >
                      <TextArea
                        placeholder={t('service.holderSortDescription')}
                        rows={3}
                        onChange={() => {
                          setIsWarning(true)
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      name='keywords'
                      label={t('service.textKeyWord')}
                      labelStyle={{ width: 120, marginRight: 20 }}
                    >
                      <Input
                        placeholder={t('service.holderKeyWord')}
                        onChange={() => {
                          setIsWarning(true)
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      name='slug'
                      rules={[
                        {
                          pattern: REGEX_SLUG,
                          message: t('service.msgSlugHasSpecialCharacter')
                        }
                      ]}
                      label='Slug'
                      labelStyle={{ width: 120, marginRight: 20 }}
                    >
                      {dataServiceById ? (
                        <Input placeholder={t('service.holderSlug')} readOnly />
                      ) : (
                        <Input
                          placeholder={t('service.holderSlug')}
                          onChange={() => {
                            setIsWarning(true)
                          }}
                        />
                      )}
                    </Form.Item>
                  </div>
                </Form>
              </Row>
            </div>

            {mounted && (
              <Row>
                <div className='ckeditor-content'>
                  <span className='service-content-title'>
                    {t('service.textDescription')}
                  </span>

                  <div style={{ paddingTop: 9 }}>
                    <Form.Item
                      name='ckcontent'
                      style={{ width: '100%' }}
                      rules={[
                        {
                          required: true,
                          message: t('service.msgDescriptionMissing')
                        }
                      ]}
                    >
                      <CKEditor
                        type=''
                        // name='ContentEditor'
                        editor={Editor}
                        data={ckcontent || ''}
                        config={editorConfig}
                        width='100%'
                        onChange={(event: any, editor: any) => {
                          setCKcontent(editor.getData())
                        }}
                        onFocus={() => {
                          setIsWarning(true)
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
              </Row>
            )}
          </Col>
          <Col span='XL3 L3 M3 S3'>
            <Row>
              <div className='form-image'>
                <span className='service-image-title'>
                  {t('service.textImage')}
                </span>
                <UploadImage
                  imageUrl={imageUrl}
                  singleFileRef={singleFileRef}
                  singleImageRef={singleImageRef}
                  setImageUrl={setImageUrl}
                  handleUploadCallback={(file: any) => {
                    formInfo.setFields([
                      {
                        name: 'mainPhoto',
                        value: file
                      }
                    ])
                    setIsWarning(true)
                  }}
                />
                <p
                  style={{
                    fontSize: 10,
                    fontFamily: 'Roboto',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    textAlign: 'center'
                  }}
                >
                  {t('service.clickImage')}
                </p>
              </div>
            </Row>
          </Col>
        </Row>
        <div
          className='w-100 position-absolute bg-white shadow-lg p-2'
          style={{ left: 0, bottom: 0 }}
        >
          <div style={{ marginTop: -20 }}>
            <ButtonAction
              onSubmit={() => onSubmit()}
              onCancel={handleResetField}
            />
          </div>
        </div>
      </Form>
    </div>
  )
}

export default FormAddService
