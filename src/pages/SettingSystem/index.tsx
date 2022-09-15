import { SaveSapIcon, StoreHisIcon } from '@digihcs/icons'
import {
  Button,
  Col,
  FieldForm as Form,
  messageToast,
  Modal,
  Option,
  Row,
  Select
} from '@digihcs/innos-ui3'
import { ConfirmType } from '@digihcs/util/lib/enums/ConfirmType'
import { FormLabelAlign } from '@digihcs/util/lib/enums/FormLabelAlign'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AppConfigContext } from 'src/context'
import {
  SettingType,
  useGetSettingQuery,
  useUpdateSettingTypeMutation
} from 'src/graphql-definition/webinfo-service.generated'

interface IFormValues {
  idWarehouse: string
}

function SettingSystem() {
  const { t } = useTranslation()
  const { appConfigState } = useContext(AppConfigContext)

  const pharmacyNodes = useMemo(
    () =>
      appConfigState?.nodes?.filter(
        (node: any) => node?.category?.code === 'KhoDuoc'
      ) || [],
    [appConfigState?.nodes]
  )

  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(true)

  const [form] = Form.useForm<IFormValues>()
  const { validateFields, setFieldsValue } = form

  const { data: dataSetting } = useGetSettingQuery({
    onError: (err) =>
      messageToast.error({ message: t(err.message || 'Có lỗi xảy ra') })
  })

  const [updateSetting] = useUpdateSettingTypeMutation({
    onCompleted: (data) => {
      if (data?.updateSettingType?.ecommerce?.idWarehouse) {
        messageToast.success({ message: t('Lưu thành công') })
      }
    },
    onError: (err) =>
      messageToast.error({
        message: t('Lưu thất bại'),
        description: t(err.message || 'Có lỗi xảy ra')
      })
  })

  useEffect(() => {
    const idWarehouse = dataSetting?.getSetting?.ecommerce?.idWarehouse
    if (idWarehouse) {
      const foundWarehouse = pharmacyNodes?.find(
        (item: any) => item?._id === idWarehouse
      )

      setFieldsValue({ idWarehouse: foundWarehouse?._id || '' })
    }
  }, [
    pharmacyNodes,
    setFieldsValue,
    dataSetting?.getSetting?.ecommerce?.idWarehouse
  ])

  const openModalWarning = () =>
    Modal.confirm({
      onOk: onSave,
      okText: t('Đồng ý'),
      cancelText: t('Huỷ'),
      title: t('Cảnh báo'),
      type: ConfirmType.Warning,
      content: t(
        'Khi đổi kho hàng tất cả các đơn hàng sẽ ghi nhận trừ tồn kho mới đổi.'
      )
    })

  const onSave = () => {
    validateFields()
      .then((values) =>
        updateSetting({
          variables: { input: values, type: SettingType.Ecommerce }
        })
      )
      .catch(() => messageToast.error({ message: t('Có lỗi xảy ra') }))
  }

  return (
    <div style={{ padding: '10px 12px' }}>
      <div>
        <h3 style={{ fontSize: 18, fontWeight: 400 }}>
          {t('setting.textSystemInstallation')}
        </h3>
      </div>

      <div style={{ marginTop: 15 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <StoreHisIcon style={{ color: '#0384CE' }} />
          <span>{t('systemInstallation.textWarehouse')}</span>
        </div>

        <div style={{ marginTop: 15 }}>
          <Form
            form={form}
            className='form-warehouse'
            layout={FormLayout.Horizontal}
            labelAlign={FormLabelAlign.Left}
            onFieldsChange={() =>
              setIsDisabledButton(!form.isFieldsTouched(['idWarehouse'], true))
            }
          >
            <Row>
              <Col span='XL7 L7 M7 S7'>
                <Form.Item
                  name='idWarehouse'
                  className='form-item'
                  label={t('systemInstallation.textChooseAnECommerceWarehouse')}
                >
                  <Select
                    filterOption={false}
                    placeholder={t('systemInstallation.textChooseWarehouse')}
                  >
                    {pharmacyNodes?.map((node: any) => (
                      <Option key={node?._id} value={node?._id}>
                        {node?.name || ''}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span='XL5 L5 M5 S5'>
                <Form.Item>
                  <Button
                    size='large'
                    onClick={openModalWarning}
                    iconName={<SaveSapIcon />}
                    disabled={isDisabledButton}
                  >
                    {t('systemInstallation.textbtnSaveChange')}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default SettingSystem
