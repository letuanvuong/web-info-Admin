/* eslint-disable react/jsx-boolean-value */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-no-bind */
import {
  Button,
  FieldForm as Form,
  Footer,
  Input,
  messageToast,
  Modal,
  Option,
  Radio,
  Select
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
  EcomCategories,
  EcomCategoriesRes,
  EnumCategoriesStatus,
  useCreateEcomCategoriesMutation,
  useGetEcomCategoriesPaginationQuery,
  useUpdateEcomCategoriesMutation
} from 'src/graphql-definition/webinfo-service.generated'
import { generateSlug, REGEX_SLUG } from 'src/utils/function'

import './styles.less'

interface Props {
  refetchGridData: () => void
}

type CategoriesPassing = {
  currentCategories: EcomCategories | null
}
export interface ModalFormCategoriesRefs {
  openModalFormCategories: () => void
  setCurrentCategories: (data: CategoriesPassing) => void
  refetchDataCategoriesParent: () => void
}

const FormCategoriesModal = forwardRef<ModalFormCategoriesRefs, Props>(
  ({ refetchGridData }, ref) => {
    const { t } = useTranslation()
    const [currentCategories, setCurrentCategories] =
      useState<CategoriesPassing>()
    const [dataCategoriesParent, setDataCategoriesParent] = useState<any>([])
    const [visible, setVisible] = useState<boolean>(false)
    const [form] = Form.useForm()
    // edit
    const [isParent, setIsParent] = useState<boolean>(false)
    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (e.target.value === 'parent') {
        setIsParent(true)
      } else {
        setIsParent(false)
      }
    }

    // end edit
    const { resetFields, validateFields } = form
    const footerRef: RefObject<FooterRef> = useRef()
    useImperativeHandle(ref, () => ({
      openModalFormCategories,
      setCurrentCategories,
      refetchDataCategoriesParent
    }))

    const closeModal = () => {
      resetFields()
      setVisible(false)
    }
    const openModalFormCategories = () => setVisible(true)
    const refetchDataCategoriesParent = () => {
      refetchCategories()
    }

    const { refetch: refetchCategories, data: dataCategories } =
      useGetEcomCategoriesPaginationQuery({
        skip: !visible,
        fetchPolicy: 'no-cache',
        variables: {
          limit: 0,
          sortInput: [{ fieldSort: 'createdAt', sort: -1 }]
        }
      })

    useEffect(() => {
      const tempDataCategories = (dataCategories?.getEcomCategoriesPagination
        ?.data || []) as NonNullable<EcomCategoriesRes[]>

      setDataCategoriesParent(getOnlyCategoriesParent(tempDataCategories))
    }, [dataCategories])

    const [callCreateCategories] = useCreateEcomCategoriesMutation({
      fetchPolicy: 'no-cache',
      onCompleted: async (data) => {
        if (data?.createEcomCategories?._id) {
          messageToast.success({
            message: t('category.notiCreateSuccess')
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
            : t('category.notiCreateFaild')
        })
      }
    })

    const [callUpdateCategories] = useUpdateEcomCategoriesMutation({
      fetchPolicy: 'no-cache',
      onCompleted: async (data) => {
        if (data?.updateEcomCategories?._id) {
          messageToast.success({
            message: t('category.notiUpdateSuccess')
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
            : t('category.notiUpdateFaild')
        })
      }
    })

    const hanleChangeSlug: any = async (e: any) => {
      if (!currentCategories?.currentCategories?._id) {
        const title = e.target.value
        const newSlug = await generateSlug(title)
        form.setFieldsValue({
          Slug: newSlug
        })
      }
    }

    const onSubmit = () => {
      validateFields()
        .then((values) => {
          const { CategoryParent_Id, Slug, CategoryName } = values
          const input = {
            CategoryCode: CategoryName,
            CategoryName,
            CategoryParent_Id: isParent ? CategoryParent_Id : null,
            Slug
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
                  ...input,
                  Status: EnumCategoriesStatus.Notpublic
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
        const { CategoryName, Slug, CategoryParent_Id } =
          currentCategories.currentCategories
        form.setFieldsValue({
          CategoryName,
          Slug,
          CategoryParent_Id
        })
      }
      if (currentCategories?.currentCategories?.CategoryParent_Id) {
        setIsParent(true)
      } else {
        setIsParent(false)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCategories])

    // useEffect(() => {}, [
    //   currentCategories?.currentCategories?.CategoryParent_Id
    // ])

    const getOnlyCategoriesParent = (data: NonNullable<EcomCategoriesRes[]>) =>
      data.filter((item) => !item.CategoryParent_Id)

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
            ? t('category.titleUpdateCategory')
            : t('category.titleNewCategory')
        }
        // wrapClassName='category_modal'
      >
        <div style={{ padding: '0 10px' }}>
          <Form form={form} layout={FormLayout.Vertical} className='formDonate'>
            <Form.Item
              name='CategoryName'
              rules={[
                { required: true, message: t('category.msgNameMissing') }
              ]}
              label={t('category.textName')}
            >
              <Input
                placeholder={t('category.holderName')}
                onBlur={hanleChangeSlug}
              />
            </Form.Item>

            <Form.Item
              name='Slug'
              rules={[
                { required: true, message: t('category.msgSlugMissing') },
                {
                  pattern: REGEX_SLUG,
                  message: t('category.msgSlugHasSpecialCharacter')
                }
              ]}
              label='Slug'
            >
              <Input placeholder={t('category.holderSlug')} />
            </Form.Item>
            {!isParent && (
              <Form.Item label={t('category.gridParent')}>
                <Radio.Group columns={2} onChange={onChange}>
                  <Radio checked value={undefined}>
                    Cha
                  </Radio>
                  <Radio value='parent'>Con</Radio>
                </Radio.Group>
              </Form.Item>
            )}
            {isParent && (
              <Form.Item label={t('category.gridParent')}>
                <Radio.Group columns={2} onChange={onChange}>
                  <Radio value={undefined}>Cha</Radio>
                  <Radio checked value='parent'>
                    Con
                  </Radio>
                </Radio.Group>
              </Form.Item>
            )}
            {isParent ? (
              <Form.Item
                name='CategoryParent_Id'
                label={t('category.gridCategoryParent')}
                rules={[
                  { required: true, message: t('category.msgSelectMissing') }
                ]}
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
                  placeholder={t('category.holderCategory')}
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
              </Form.Item>
            ) : (
              <Form.Item name='CategoryParent_Id'>
                <Input style={{ display: 'none' }} />
              </Form.Item>
            )}
          </Form>
        </div>
      </Modal>
    )
  }
)

FormCategoriesModal.displayName = 'FormCategoriesModal'

export default FormCategoriesModal
