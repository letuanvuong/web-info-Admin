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
  EnumStockModelStatus,
  StockModel,
  useCreateStockModelMutation,
  useUpdateStockModelMutation
} from 'src/graphql-definition/webinfo-service.generated'
import { generateSlug, REGEX_SLUG } from 'src/utils/function'

import './styles.less'

interface Props {
  refetchGridData: () => void
}

type ProductsPassing = {
  currentProducts: StockModel | null
}
export interface ModalFormProductsRefs {
  openModalFormCategories: () => void
  setCurrentCategories: (data: ProductsPassing) => void
}

const FormProductModal = forwardRef<ModalFormProductsRefs, Props>(
  ({ refetchGridData }, ref) => {
    const { t } = useTranslation()
    const [currentProducts, setCurrentCategories] = useState<ProductsPassing>()
    const [visible, setVisible] = useState<boolean>(false)
    const [form] = Form.useForm()
    const { resetFields, validateFields } = form
    const footerRef: RefObject<FooterRef> = useRef()
    useImperativeHandle(ref, () => ({
      openModalFormCategories,
      setCurrentCategories
    }))

    const closeModal = () => {
      resetFields()
      setVisible(false)
    }
    const openModalFormCategories = () => setVisible(true)

    const [callCreateCategories] = useCreateStockModelMutation({
      fetchPolicy: 'no-cache',
      onCompleted: async (data) => {
        if (data?.createStockModel?._id) {
          messageToast.success({
            message: t('product.notiCreateSuccess')
          })
          closeModal()
          refetchGridData()
        }
      },
      onError: (error) => {
        messageToast.error({
          message: error?.message
            ? error?.message
            : t('product.notiCreateFaild')
        })
      }
    })

    const [callUpdateCategories] = useUpdateStockModelMutation({
      fetchPolicy: 'no-cache',
      onCompleted: async (data) => {
        if (data?.updateStockModel?._id) {
          messageToast.success({
            message: t('product.notiUpdateSuccess')
          })
          closeModal()
          refetchGridData()
        }
      },
      onError: (error) => {
        messageToast.error({
          message: error?.message
            ? error?.message
            : t('product.notiUpdateFaild')
        })
      }
    })

    const hanleChangeSlug: any = async (e: any) => {
      if (!currentProducts?.currentProducts?._id) {
        const title = e.target.value
        const newSlug = await generateSlug(title)
        form.setFieldsValue({
          ecomSlug: newSlug
        })
      }
    }

    const onSubmit = () => {
      validateFields()
        .then((values) => {
          const { ecomSlug, name } = values
          const input = {
            name,

            ecomSlug
          }
          if (currentProducts?.currentProducts?._id) {
            const queryValue = {
              variables: {
                id: currentProducts?.currentProducts?._id,
                input
              }
            }
            callUpdateCategories(queryValue)
          } else {
            const queryValue = {
              variables: {
                input: {
                  ...input,
                  ecomStatus: EnumStockModelStatus.Public
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
      if (currentProducts?.currentProducts?._id) {
        const { name, ecomSlug } = currentProducts.currentProducts
        form.setFieldsValue({
          name,
          ecomSlug
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentProducts])

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
              {t('product.btnSave')}
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
              {t('product.btnExit')}
            </Button>
          </Footer>
        }
        visible={visible}
        onCancel={closeModal}
        title={
          currentProducts?.currentProducts?._id
            ? t('product.titleUpdateProduct')
            : t('product.titleNewProduct')
        }
        // wrapClassName='category_modal'
      >
        <div style={{ padding: '0 10px' }}>
          <Form form={form} layout={FormLayout.Vertical} className='formDonate'>
            <Form.Item
              name='name'
              rules={[{ required: true, message: t('product.msgNameMissing') }]}
              label={t('product.textName')}
            >
              <Input
                placeholder={t('product.holderName')}
                onBlur={hanleChangeSlug}
              />
            </Form.Item>
            <Form.Item
              name='code'
              rules={[{ required: true, message: t('product.msgNameMissing') }]}
              label={t('product.textName')}
            >
              <Input
                placeholder={t('product.holderName')}
                onBlur={hanleChangeSlug}
              />
            </Form.Item>
            <Form.Item
              name='ecomSlug'
              rules={[
                { required: true, message: t('product.msgSlugMissing') },
                {
                  pattern: REGEX_SLUG,
                  message: t('product.msgSlugHasSpecialCharacter')
                }
              ]}
              label='ecomSlug'
            >
              <Input placeholder={t('product.holderSlug')} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    )
  }
)

FormProductModal.displayName = 'FormProductModal'

export default FormProductModal
