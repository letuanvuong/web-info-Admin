import {
  Button,
  FieldForm as Form,
  Footer,
  Input,
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
  useGetBlogPaginationQuery
} from 'src/graphql-definition/webinfo-service.generated'

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

const FormEmailContactModal = forwardRef<ModalFormBlogsRefs, Props>(
  ({ refetchGridData }, ref) => {
    const { t } = useTranslation()
    const [currentCategories, setCurrentCategories] =
      useState<CategoriesPassing>()
    // const [dataCategoriesParent, setDataCategoriesParent] = useState<any>([])
    const [visible, setVisible] = useState<boolean>(false)
    const [form] = Form.useForm()
    const { resetFields } = form
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
              name='sortContent'
              rules={[
                { required: true, message: t('category.msgSlugMissing') }
              ]}
              label={t('manageBlog.textSortContent')}
            >
              <Input placeholder={t('manageBlog.holderSortContent')} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    )
  }
)

FormEmailContactModal.displayName = 'FormEmailContactModal'

export default FormEmailContactModal
