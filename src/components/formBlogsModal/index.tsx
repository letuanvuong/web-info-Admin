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
import {
  Blog,
  useCreateBlogMutation,
  useGetBlogPaginationQuery,
  useUpdateBlogMutation
} from 'src/graphql-definition/webinfo-service.generated'
import { generateSlug, REGEX_SLUG } from 'src/utils/function'

import './styles.less'

interface Props {
  refetchGridData: () => void
}

type CategoriesPassing = {
  currentCategories: Blog | null
}
export interface ModalFormBlogsRefs {
  openModalFormBlogs: () => void
  setCurrentCategories: (data: CategoriesPassing) => void
  refetchDataCategoriesParent: () => void
}

const FormBlogsModal = forwardRef<ModalFormBlogsRefs, Props>(
  ({ refetchGridData }, ref) => {
    const { t } = useTranslation()
    const [currentCategories, setCurrentCategories] =
      useState<CategoriesPassing>()
    // const [dataCategoriesParent, setDataCategoriesParent] = useState<any>([])
    const [visible, setVisible] = useState<boolean>(false)
    const [form] = Form.useForm()
    const { resetFields, validateFields } = form
    const footerRef: RefObject<FooterRef> = useRef()
    useImperativeHandle(ref, () => ({
      openModalFormBlogs,
      setCurrentCategories,
      refetchDataCategoriesParent
    }))

    const closeModal = () => {
      resetFields()
      setVisible(false)
    }
    const openModalFormBlogs = () => setVisible(true)
    const refetchDataCategoriesParent = () => {
      refetchCategories()
    }

    const { refetch: refetchCategories } = useGetBlogPaginationQuery({
      skip: !visible,
      fetchPolicy: 'no-cache',
      variables: {
        limit: 0,
        sort: [{ fieldSort: 'publishAt', sort: -1 }]
      }
    })

    // useEffect(() => {
    //   const tempDataCategories = (dataCategories?.getBlogPagination
    //     ?.data || []) as NonNullable<EcomCategoriesRes[]>

    //   setDataCategoriesParent(getOnlyCategoriesParent(tempDataCategories))
    // }, [dataCategories])

    const [callCreateCategories] = useCreateBlogMutation({
      fetchPolicy: 'no-cache',
      onCompleted: async (data) => {
        if (data?.createBlog?._id) {
          messageToast.success({
            message: t('manageBlog.notiCreateSuccess')
          })
          closeModal()
          refetchGridData()
          refetchCategories()
        }
      },
      onError: (error) => {
        messageToast.error({
          message: error?.message
            ? error?.message
            : t('manageBlog.notiCreateFaild')
        })
      }
    })

    const [callUpdateCategories] = useUpdateBlogMutation({
      fetchPolicy: 'no-cache',
      onCompleted: async (data) => {
        if (data?.updateBlog?._id) {
          messageToast.success({
            message: t('manageBlog.notiUpdateSuccess')
          })
          closeModal()
          refetchGridData()
          refetchCategories()
        }
      },
      onError: (error) => {
        messageToast.error({
          message: error?.message
            ? error?.message
            : t('manageBlog.notiUpdateFaild')
        })
      }
    })

    const hanleChangeSlug: any = async (e: any) => {
      if (!currentCategories?.currentCategories?._id) {
        const title = e.target.value
        const newSlug = await generateSlug(title)
        form.setFieldsValue({
          slug: newSlug
        })
      }
    }

    const onSubmit = () => {
      validateFields()
        .then((values) => {
          const { title, slug, sortContent } = values
          const input = {
            title,
            slug,
            sortContent
          }
          if (currentCategories?.currentCategories?._id) {
            const queryValue = {
              variables: {
                id: currentCategories?.currentCategories?._id,
                input
              }
            }
            callUpdateCategories(queryValue)
          } else {
            const queryValue = {
              variables: {
                input: {
                  ...input
                }
              }
            }
            callCreateCategories(queryValue)
          }
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err, 'err'))
    }

    useEffect(() => {
      if (currentCategories?.currentCategories?._id) {
        const { title, slug, sortContent } = currentCategories.currentCategories
        form.setFieldsValue({
          title,
          slug,
          sortContent
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCategories])

    // const getOnlyCategoriesParent = (data: NonNullable<EcomCategoriesRes[]>) =>
    //   data.filter((item) => !item.CategoryParent_Id)

    return (
      <Modal
        centered
        width={500}
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
              {t('category.btnSave')}
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
              {t('category.btnExit')}
            </Button>
          </Footer>
        }
        visible={visible}
        onCancel={closeModal}
        title={
          currentCategories?.currentCategories?._id
            ? t('manageBlog.titleUpdateBlog')
            : t('manageBlog.titleNewBlog')
        }
        // wrapClassName='category_modal'
      >
        <div style={{ padding: '0 10px' }}>
          <Form form={form} layout={FormLayout.Vertical} className='formDonate'>
            <Form.Item
              name='title'
              rules={[
                { required: true, message: t('category.msgNameMissing') }
              ]}
              label={t('manageBlog.gridBlogTitle')}
            >
              <Input
                placeholder={t('manageBlog.holderBlogTitle')}
                onBlur={hanleChangeSlug}
              />
            </Form.Item>

            <Form.Item
              name='slug'
              rules={[
                { required: true, message: t('category.msgSlugMissing') },
                {
                  pattern: REGEX_SLUG,
                  message: t('category.msgSlugHasSpecialCharacter')
                }
              ]}
              label='Slug'
            >
              <Input placeholder={t('manageBlog.holderBlogSlug')} />
            </Form.Item>
            <Form.Item
              name='sortContent'
              rules={[
                { required: true, message: t('category.msgSlugMissing') }
              ]}
              label={t('manageBlog.textSortContent')}
            >
              <Input placeholder={t('manageBlog.holderSortContent')} />
            </Form.Item>

            {/* <Form.Item
              name='CategoryParent_Id'
              label={t('category.gridCategoryParent')}
            >
              <Select
                showSearch
                optionFilterProp='children'
                filterOption={(input: any, option: any) =>
                  option?.children
                    ?.toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                onChange={() => {}}
                allowClear
              >
                {dataCategoriesParent
                  ?.filter(
                    (x: any) =>
                      x?._id !== currentCategories?.currentCategories?._id
                  )
                  .map((x: any) => (
                    <Option key={x._id} value={x._id}>
                      {x.CategoryName}
                    </Option>
                  ))}
              </Select>
            </Form.Item> */}
          </Form>
        </div>
      </Modal>
    )
  }
)

FormBlogsModal.displayName = 'FormBlogsModal'

export default FormBlogsModal
