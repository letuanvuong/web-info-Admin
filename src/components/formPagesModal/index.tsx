import {
  Button,
  FieldForm as Form,
  Footer,
  Input,
  messageToast,
  Modal
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
  Page,
  PageInput,
  useCreatePageMutation,
  useGetPagePaginationQuery,
  useUpdatePageMutation
} from 'src/graphql-definition/webinfo-service.generated'
import { generateSlug, REGEX_SLUG } from 'src/utils/function'

import './styles.less'

interface Props {
  refetchGridData: () => void
}

type PagesPassing = {
  currentPages: Page | null
}
export interface ModalFormPagesRefs {
  openModalFormPages: () => void
  setCurrentPages: (data: PagesPassing) => void
  refetchDataPagesParent: () => void
}

const FormPageModal = forwardRef<ModalFormPagesRefs, Props>(
  ({ refetchGridData }, ref) => {
    const { t } = useTranslation()
    const [currentPages, setCurrentPages] = useState<PagesPassing>()
    const editorRef = useRef<any>(null)
    const { CKEditor, Editor } = editorRef.current || {}
    const [contents, setContents] = useState('')
    const [visible, setVisible] = useState<boolean>(false)
    const [form] = Form.useForm()
    const { resetFields, validateFields } = form
    const footerRef: RefObject<FooterRef> = useRef()
    useImperativeHandle(ref, () => ({
      openModalFormPages,
      setCurrentPages,
      refetchDataPagesParent
    }))

    const refetchDataPagesParent = () => {
      refetchPages()
    }
    const closeModal = () => {
      resetFields()
      setVisible(false)
    }
    const openModalFormPages = () => setVisible(true)

    const onSubmit = () => {
      validateFields()
        .then((values) => {
          const { content, slug, title } = values

          if (content || slug || title) {
            const input: PageInput = {
              content: contents,
              slug,
              title
            }
            if (currentPages?.currentPages?._id) {
              const queryValue = {
                variables: {
                  id: currentPages?.currentPages?._id,
                  input
                }
              }
              callUpdatePages(queryValue)
            } else {
              const queryValue = {
                variables: {
                  input: {
                    ...input
                  }
                }
              }
              callCreatePages(queryValue)
            }
          }
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err, 'err'))
    }

    useEffect(() => {
      if (currentPages?.currentPages?._id) {
        const { content, slug, title } = currentPages.currentPages
        form.setFieldsValue({
          content,
          slug,
          title
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPages])

    const { refetch: refetchPages, data: dataPages } =
      useGetPagePaginationQuery({
        skip: !visible,
        fetchPolicy: 'no-cache',
        variables: {
          limit: 0
        }
      })

    const [callCreatePages] = useCreatePageMutation({
      fetchPolicy: 'no-cache',
      onCompleted: async (data) => {
        if (data?.createPage?._id) {
          messageToast.success({
            message: t('managePages.notiCreatePageSuccess')
          })
          closeModal()
          refetchGridData()
          refetchPages()
        }
      },
      onError: (error) => {
        messageToast.error({
          message: error?.message
            ? error?.message
            : t('managePages.notiCreatePageFaild')
        })
      }
    })

    const [callUpdatePages] = useUpdatePageMutation({
      fetchPolicy: 'no-cache',

      onCompleted: async (data) => {
        if (data?.updatePage?._id) {
          messageToast.success({
            message: t('managePages.notiUpdatePageSuccess')
          })
          closeModal()
          refetchGridData()
          refetchPages()
        }
      },
      onError: (error) => {
        messageToast.error({
          message: error?.message
            ? error?.message
            : t('managePages.notiUpdatePageFaild')
        })
      }
    })

    const hanleChangeSlug: any = async (e: any) => {
      if (!currentPages?.currentPages?._id) {
        const title = e.target.value
        const newSlug = await generateSlug(title)
        form.setFieldsValue({
          slug: newSlug
        })
      }
    }

    const setFieldCKData = () => {
      if (dataPages?.getPagePagination) {
        setContents(currentPages?.currentPages?.content || '')
      }
    }
    useEffect(() => {
      setFieldCKData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataPages])

    useEffect(() => {
      editorRef.current = {
        // eslint-disable-next-line global-require
        CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
        // eslint-disable-next-line global-require
        Editor: require('@digihcs/ckeditor5-all-plugin').Editor
      }
    }, [])

    return (
      <Modal
        centered
        width={1000}
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
              {t('managePages.btnSave')}
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
              {t('managePages.btnExit')}
            </Button>
          </Footer>
        }
        visible={visible}
        onCancel={closeModal}
        title={
          currentPages?.currentPages?._id
            ? t('managePages.titleUpdatePage')
            : t('managePages.titleNewPage')
        }
      >
        <div style={{ padding: '0 10px' }}>
          <Form form={form} layout={FormLayout.Vertical} className='formDonate'>
            <Form.Item
              name='title'
              rules={[
                { required: true, message: t('managePages.msgTitleMissing') }
              ]}
              label={t('managePages.gridTitle')}
            >
              <Input
                onBlur={hanleChangeSlug}
                autoFocus
                placeholder={t('managePages.holderTitle')}
              />
            </Form.Item>

            <Form.Item
              name='slug'
              rules={[
                { required: true, message: t('managePages.msgSlugMissing') },
                {
                  pattern: REGEX_SLUG,
                  message: t('managePages.msgSlugHasSpecialCharacter')
                }
              ]}
              label='Slug'
            >
              <Input placeholder={t('managePages.holderSlug')} />
            </Form.Item>
            <div style={{ height: '100%' }}>
              <Form.Item
                className='cms-ck ck-editor__editable'
                name='content'
                style={{ width: '100%' }}
                label={t('managePages.gridContent')}
              >
                <CKEditor
                  type=''
                  name='content'
                  editor={Editor}
                  data={contents || ''}
                  config={editorConfig}
                  width='100%'
                  onChange={(event: any, editor: any) => {
                    setContents(editor.getData())
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

FormPageModal.displayName = 'FormPageModal'

export default FormPageModal
