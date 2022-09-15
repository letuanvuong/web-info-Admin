import {
  Button,
  Col,
  FieldForm as Form,
  Footer,
  Input,
  messageToast,
  Modal,
  Row,
  TextArea
} from '@digihcs/innos-ui3'
import { FooterRef } from '@digihcs/innos-ui3/es/footer/interface'
import { ButtonType } from '@digihcs/util/lib/enums/ButtonType'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { faSave, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  forwardRef,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import { editorConfig } from 'src/constant'
import {
  Service,
  ServiceInput,
  useCreateServiceMutation,
  useGetServicePaginationQuery,
  useUpdateServiceMutation
} from 'src/graphql-definition/webinfo-service.generated'
import { generateSlug, REGEX_SLUG } from 'src/utils/function'

import UploadImage from '../UploadImage'

import './styles.less'

interface Props {
  refetchGridData: () => void
}

type ServicesPassing = {
  currentServices: Service | null
}
export interface ModalFormServicesRefs {
  openModalFormServices: () => void
  setCurrentServices: (data: ServicesPassing) => void
  refetchDataServicesParent: () => void
}

const FormServiceModal = forwardRef<ModalFormServicesRefs, Props>(
  ({ refetchGridData }, ref) => {
    const { t } = useTranslation()
    const [currentServices, setCurrentServices] = useState<ServicesPassing>()
    // const [dataServicesParent, setDataServicesParent] = useState<any>([])
    const editorRef = useRef<any>(null)
    const { CKEditor, Editor } = editorRef.current || {}
    const [content, setContent] = useState('')
    const [visible, setVisible] = useState<boolean>(false)
    const [form] = Form.useForm()
    const { resetFields, validateFields } = form
    const footerRef: RefObject<FooterRef> = useRef()

    useImperativeHandle(ref, () => ({
      openModalFormServices,
      setCurrentServices,
      refetchDataServicesParent
    }))

    const closeModal = () => {
      resetFields()
      setVisible(false)
    }
    const openModalFormServices = () => setVisible(true)
    const refetchDataServicesParent = () => {
      refetchServices()
    }

    const { refetch: refetchServices, data: dataServices } =
      useGetServicePaginationQuery({
        skip: !visible,
        fetchPolicy: 'no-cache',
        variables: {
          limit: 0
        }
      })

    // useEffect(() => {
    //   const tempDataServices = (dataServices?.getServicePagination?.data ||
    //     []) as NonNullable<EcomServicesRes[]>

    //   setDataServicesParent(getOnlyServicesParent(tempDataServices))
    // }, [dataServices])

    const setFieldCKData = () => {
      if (dataServices?.getServicePagination) {
        setContent(currentServices?.currentServices?.desciption || '')
      }
    }
    useEffect(() => {
      setFieldCKData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataServices])

    const [callCreateServices] = useCreateServiceMutation({
      fetchPolicy: 'no-cache',
      onCompleted: async (data) => {
        if (data?.createService?._id) {
          messageToast.success({
            message: t('service.notiCreateSuccess')
          })
          closeModal()
          refetchGridData()
          refetchServices()
        }
      },
      onError: (error) => {
        messageToast.error({
          message: error?.message
            ? error?.message
            : t('service.notiCreateFaild')
        })
      }
    })

    const [callUpdateServices] = useUpdateServiceMutation({
      fetchPolicy: 'no-cache',

      onCompleted: async (data) => {
        if (data?.updateService?._id) {
          messageToast.success({
            message: t('service.notiUpdateSuccess')
          })
          closeModal()
          refetchGridData()
          refetchServices()
        }
      },
      onError: (error) => {
        messageToast.error({
          message: error?.message
            ? error?.message
            : t('service.notiUpdateFailed')
        })
      }
    })

    const hanleChangeSlug: any = async (e: any) => {
      if (!currentServices?.currentServices?._id) {
        const title = e.target.value
        const newSlug = await generateSlug(title)
        form.setFieldsValue({
          slug: newSlug
        })
      }
    }
    useEffect(() => {
      editorRef.current = {
        // eslint-disable-next-line global-require
        CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
        // eslint-disable-next-line global-require
        Editor: require('@digihcs/ckeditor5-all-plugin').Editor
      }
    }, [])
    const onSubmit = () => {
      validateFields()
        .then((values) => {
          const { slug, sortDescription, title } = values

          if (slug || sortDescription || title) {
            const input: ServiceInput = {
              desciption: content,
              slug,
              sortDescription,
              title,
              mainPhoto: values.mainPhoto || {}
            }

            if (currentServices?.currentServices?._id) {
              const queryValue = {
                variables: {
                  id: currentServices?.currentServices?._id,
                  input
                }
              }
              callUpdateServices(queryValue)
            } else {
              const queryValue = {
                variables: {
                  input: {
                    ...input
                  }
                }
              }
              callCreateServices(queryValue)
            }
          }
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err, 'err'))
    }

    useEffect(() => {
      if (currentServices?.currentServices?._id) {
        const { desciption, slug, sortDescription, title, mainPhoto } =
          currentServices.currentServices

        form.setFieldsValue({
          desciption,
          slug,
          sortDescription,
          title,
          mainPhoto
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentServices])

    // const getOnlyServicesParent = (data: NonNullable<EcomServicesRes[]>) =>
    //   data.filter((item) => !item.CategoryParent_Id)

    return (
      <Modal
        centered
        width={800}
        // maskClosable
        footer={
          <Footer ref={footerRef} visible>
            <Button
              iconName={
                <FontAwesomeIcon
                  icon={faSave}
                  width={15}
                  height={15}
                  style={{ marginRight: 5, marginBottom: 3 }}
                />
              }
              style={{
                marginRight: 10
              }}
              onClick={onSubmit}
            >
              {t('service.btnSave')}
            </Button>
            <Button
              iconName={
                <FontAwesomeIcon
                  icon={faXmark}
                  width={16}
                  height={16}
                  style={{ marginRight: 5, marginBottom: 3 }}
                />
              }
              onClick={() => closeModal()}
              buttonType={ButtonType.Neutral}
            >
              {t('service.btnExit')}
            </Button>
          </Footer>
        }
        visible={visible}
        onCancel={closeModal}
        title={
          currentServices?.currentServices?._id
            ? t('service.titleUpdateService')
            : t('service.titleNewService')
        }
        // wrapClassName='service_modal'
      >
        <div style={{ padding: '0 10px' }}>
          <Form form={form} layout={FormLayout.Vertical} className='formDonate'>
            <Row>
              <Col span='XL12 L12 M12 S12'>
                <div>
                  <Form.Item
                    labelStyle={{ width: 0 }}
                    name='mainPhoto'
                    rules={[
                      {
                        required: true,
                        message: t('service.msgMainPhotoMissing')
                      }
                    ]}
                  >
                    <Input hidden style={{ display: 'none' }} />
                  </Form.Item>
                  <UploadImage
                    linkImage={form.getFieldValue(['mainPhoto'])}
                    handleUploadCallback={(file: any) => {
                      form.setFields([
                        {
                          name: 'mainPhoto',
                          value: file
                        }
                      ])
                    }}
                  />
                </div>
              </Col>
            </Row>
            <Form.Item
              name='title'
              rules={[{ required: true, message: t('service.msgNameMissing') }]}
              label={t('service.textName')}
            >
              {currentServices?.currentServices?._id ? (
                <Input placeholder={t('service.holderName')} />
              ) : (
                <Input
                  placeholder={t('service.holderName')}
                  onBlur={hanleChangeSlug}
                />
              )}
            </Form.Item>

            <Form.Item
              name='slug'
              rules={[
                { required: true, message: t('service.msgSlugMissing') },
                {
                  pattern: REGEX_SLUG,
                  message: t('service.msgSlugHasSpecialCharacter')
                }
              ]}
              label='Slug'
            >
              {currentServices?.currentServices?._id ? (
                <Input placeholder={t('service.holderSlug')} disabled />
              ) : (
                <Input placeholder={t('service.holderSlug')} />
              )}
            </Form.Item>
            <Form.Item
              name='sortDescription'
              rules={[
                {
                  required: true,
                  message: t('service.msgShortDescriptionMissing')
                }
              ]}
              label={t('service.textShortDescription')}
            >
              <TextArea
                placeholder={t('service.holderSortDescription')}
                rows={3}
              />
            </Form.Item>
            <div style={{ height: '100%' }}>
              <Form.Item
                className='cms-ck ck-editor__editable'
                name='content'
                style={{ width: '100%' }}
                label={t('service.textDescription')}
              >
                <CKEditor
                  type=''
                  name='Description'
                  editor={Editor}
                  data={content || ''}
                  config={editorConfig}
                  width='100%'
                  onChange={(event: any, editor: any) => {
                    setContent(editor.getData())
                  }}
                />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    )
  }
)

FormServiceModal.displayName = 'FormServiceModal'

export default FormServiceModal
