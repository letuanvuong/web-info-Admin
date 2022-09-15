import {
  Button,
  Calendar,
  Checkbox,
  Col,
  FieldForm as Form,
  Footer,
  Input,
  messageToast,
  Modal,
  Option,
  Row,
  Select
} from '@digihcs/innos-ui3'
import { FooterRef } from '@digihcs/innos-ui3/es/footer/interface'
import { ButtonType } from '@digihcs/util/lib/enums/ButtonType'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import { Upload } from 'antd'
import moment from 'moment'
import React, {
  forwardRef,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import {
  EnumGender,
  TypeImage,
  useCreateStaffMutation,
  useFindOneDonViHanhChinhQuery,
  useSearchDm_DonViHanhChinhLazyQuery,
  useSearchUserNotHaveStaffLazyQuery,
  useUpdateStaffMutation
} from 'src/graphql-definition/webinfo-service.generated'
import { checkDoubleClick, reducer } from 'src/utils/function'

import { backendUrlFile, uploadFile } from '../../utils/uploadFile'
import { StaffModalProps, StaffModalRef } from './interface'

import './index.less'

const StaffModal = React.memo(
  forwardRef<StaffModalRef, StaffModalProps>((props, ref) => {
    const { t } = useTranslation()
    const [visible, setVisible] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState('')

    const handleOpenModal = () => {
      setVisible(true)
      if (!isComponentDidMount.current) {
        getDidMount({
          variables: {
            searchString: ''
          }
        })
      }
      isComponentDidMount.current = true
    }
    const [state, setState] = useReducer(reducer, {
      isFullScreen: false,
      selectedRow: {
        _id: undefined,
        code: undefined
      },
      optsDiaChi: [],
      diaChi: {
        _id: undefined,
        MaNoiSinhSong: undefined,
        TenNoiSinhSong: undefined
      },
      disableButtonEdit: true,
      isTamNgung: false,
      users: []
    })
    const [disableSave, setDisableSave] = useState(true)

    const { selectedRow, isTamNgung } = state
    const footerRef: RefObject<FooterRef> = useRef()
    const [form] = Form.useForm()
    const checkDoubleClickRef = useRef(false)
    const { resetFields } = form
    const waitingAccommodation = useRef(null)
    const isComponentDidMount = useRef<boolean>(false)
    const dataImageFileRef = useRef<string>('')
    const waitingUser = useRef(null)

    const [getDidMount, { data: dataDidmount, error: errorDidmount }] =
      useSearchDm_DonViHanhChinhLazyQuery({
        fetchPolicy: 'no-cache'
      })

    const { refetch: refetchFindDVHC } = useFindOneDonViHanhChinhQuery({
      fetchPolicy: 'no-cache'
    })

    const [callCreateStaff] = useCreateStaffMutation({
      fetchPolicy: 'no-cache',
      onCompleted: async (data) => {
        if (data?.createStaff) {
          messageToast.success({
            message: t('staff.notiSaveSuccess')
          })
          props.callBack()
          handleHide()
        }
      },
      onError: (error) => {
        if (error.message.includes('This employee has been created')) {
          messageToast.error({
            message: t('error.can_not_save'),
            description: t('staff.notiStaffCodeExits')
          })
          return
        }
        if (error.message.includes('This account has been created')) {
          messageToast.error({
            message: t('error.can_not_save'),
            description: t('error.notiAccountLinkedStaff')
          })
          return
        }
        if (error.message.includes('Failed to fetch')) {
          messageToast.error({
            message: t('error.can_not_save'),
            description: t('error.connection_fail')
          })
          return
        }
        messageToast.error({
          message: t('error.can_not_save'),
          description: t('error.error_save')
        })
      }
    })

    const [callUpdateStaff] = useUpdateStaffMutation({
      fetchPolicy: 'no-cache',
      onCompleted: async (data) => {
        if (data?.updateStaff) {
          messageToast.success({
            message: t('staff.notiSaveSuccess')
          })
          props.callBack()
          handleHide()
        }
      },
      onError: (error) => {
        if (error.message.includes('This employee has been created')) {
          messageToast.error({
            message: t('error.can_not_save'),
            description: t('staff.notiStaffCodeExits')
          })
          return
        }
        if (error.message.includes('This account has been created')) {
          messageToast.error({
            message: t('error.can_not_save'),
            description: t('error.notiAccountLinkedStaff')
          })
          return
        }
        if (error.message.includes('Failed to fetch')) {
          messageToast.error({
            message: t('error.can_not_save'),
            description: t('error.connection_fail')
          })
          return
        }
        messageToast.error({
          message: t('error.can_not_save'),
          description: t('error.error_save')
        })
      }
    })

    const [SearhUser, { data: dataSeachUser }] =
      useSearchUserNotHaveStaffLazyQuery({
        fetchPolicy: 'no-cache'
      })

    useEffect(() => {
      if (dataSeachUser) {
        setState({
          users: dataSeachUser?.searchUserNotHaveStaff?.length
            ? dataSeachUser.searchUserNotHaveStaff
            : []
        })
      }
    }, [dataSeachUser])

    useEffect(() => {
      if (dataDidmount) {
        setState({
          optsDiaChi: dataDidmount.searchDM_DonViHanhChinh || []
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataDidmount])

    useEffect(() => {
      if (errorDidmount) {
        messageToast.error({
          message: t('error.can_not_load_initial_data'),
          description: t('error.error_load_initial_data')
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorDidmount])

    const setSelectedRow = useCallback(
      async (selectedRow) => {
        setState({
          selectedRow
        })
        if (selectedRow?._id) {
          const objSetState: any = {
            isTamNgung: selectedRow.TamNgung,
            disableButtonEdit: true,
            diaChi: selectedRow.noiSinhSong
          }
          setDisableSave(false)
          if (
            !isComponentDidMount.current ||
            (selectedRow.DiaChi_Id &&
              !state.optsDiaChi.find(
                (i: any) => i._id === selectedRow.DiaChi_Id
              ))
          ) {
            getDidMount({
              variables: {
                searchString: '',
                idDefault: selectedRow?.DiaChi_Id
              }
            })
          }

          setAvatarUrl(selectedRow?.LinkAvatar?.fileName)
          dataImageFileRef.current = selectedRow?.LinkAvatar?.fileName

          SearhUser({
            variables: {
              keyword: '',
              idDefault: selectedRow.TaiKhoan_Id,
              limit: 50,
              isUpdate: true
            }
          })

          form.setFieldsValue({
            MaNhanVien: selectedRow.MaNhanVien,
            TenNhanVien: selectedRow.TenNhanVien,
            NgaySinh: selectedRow.NgaySinh
              ? moment(selectedRow.NgaySinh).locale('vi')
              : undefined,
            SoDienThoai: selectedRow.SoDienThoai,
            GioiTinh: selectedRow.GioiTinh,
            DiaChi_Id: selectedRow.DiaChi_Id,
            SoNha: selectedRow.SoNha,
            CMNDHoacHoChieu: selectedRow.CMNDHoacHoChieu,
            DiaChi: selectedRow.fullAddress || '',
            TaxCode: selectedRow?.TaxCode,
            Email: selectedRow?.Email,
            TaiKhoan_Id: selectedRow.TaiKhoan_Id || '',
            LinkAvatar: selectedRow?.LinkAvatar
          })

          setState(objSetState)
        } else if (!isComponentDidMount.current) {
          getDidMount()
        }
        isComponentDidMount.current = true
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [selectedRow]
    )

    const searchAccommodation = useCallback((val) => {
      const fields = form.getFieldsValue()
      if (waitingAccommodation.current)
        clearTimeout(waitingAccommodation.current)
      waitingAccommodation.current = setTimeout(async () => {
        getDidMount({
          variables: {
            searchString: val,
            limit: 100,
            idDefault: fields.DiaChi_Id
          }
        })
      }, 100)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const changeSearchNoiSinhSong = useCallback(async (idDonViHanhChinh) => {
      refetchFindDVHC({
        id: idDonViHanhChinh
      })
        .then(({ data: { findOneDonViHanhChinh } }) => {
          setState({
            diaChi: findOneDonViHanhChinh
          })
          const { getFieldsValue, setFieldsValue } = form
          const fields = getFieldsValue()
          const fullAddress: any = `${fields.SoNha ? fields.SoNha : ''}${
            fields.SoNha
              ? `, ${findOneDonViHanhChinh.TenDayDu}`
              : `${findOneDonViHanhChinh.TenDayDu}`
          }`
          setFieldsValue({
            DiaChi: fullAddress
          })
        })
        .catch(() => {
          messageToast.error({
            message: t('error.error_appear'),
            description: t('staff.notiCannotGetAddress')
          })
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleHide = () => {
      setVisible(false)
      resetFields()
      setAvatarUrl('')
      dataImageFileRef.current = ''
      setState({
        selectedRow: {},
        isTamNgung: false,
        disableButtonEdit: true,
        users: []
      })
      setDisableSave(true)
    }

    useImperativeHandle(ref, () => ({
      onOpenModal: handleOpenModal,
      setSelectedRow
    }))

    const checkedPending = useCallback(() => {
      if (isTamNgung) {
        setState({
          isTamNgung: false
        })
      } else {
        setState({
          isTamNgung: true
        })
      }
    }, [isTamNgung])

    const createNhanVien = useCallback(async () => {
      const { getFieldsValue } = form
      const fields = getFieldsValue()
      const LinkAvatar = {
        url: '',
        fileName: dataImageFileRef.current,
        type: TypeImage.File
      }
      const queryValue = {
        variables: {
          input: {
            TenNhanVien: fields.TenNhanVien,
            NgaySinh: fields.NgaySinh
              ? moment(fields.NgaySinh).valueOf()
              : undefined,
            GioiTinh: fields.GioiTinh,
            CMNDHoacHoChieu: fields.CMNDHoacHoChieu || '',
            TaxCode: fields.TaxCode || '',
            SoDienThoai: fields.SoDienThoai || '',
            Email: fields.Email || '',
            SoNha: fields.SoNha || '',
            DiaChi_Id: fields.DiaChi_Id || '',
            TaiKhoan_Id: fields.TaiKhoan_Id || '',
            TamNgung: isTamNgung,
            LinkAvatar
          }
        }
      }
      callCreateStaff(queryValue)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTamNgung])

    const updateNhanVien = useCallback(async () => {
      const { getFieldsValue } = form
      const fields = getFieldsValue()
      const LinkAvatar = {
        url: '',
        fileName: dataImageFileRef.current,
        type: TypeImage.File
      }
      const queryValue = {
        variables: {
          id: selectedRow._id,
          input: {
            TenNhanVien: fields.TenNhanVien,
            NgaySinh: fields.NgaySinh
              ? moment(fields.NgaySinh).valueOf()
              : undefined,
            GioiTinh: fields.GioiTinh,
            TaxCode: fields.TaxCode || '',
            CMNDHoacHoChieu: fields.CMNDHoacHoChieu || '',
            SoDienThoai: fields.SoDienThoai || '',
            Email: fields.Email || '',
            DiaChi_Id: fields.DiaChi_Id || '',
            TaiKhoan_Id: fields.TaiKhoan_Id || '',
            SoNha: fields.SoNha || '',
            TamNgung: isTamNgung,
            LinkAvatar
          }
        }
      }
      callUpdateStaff(queryValue)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRow?._id, isTamNgung])

    const onOkFooter = useCallback(() => {
      const { validateFields } = form
      try {
        validateFields().then(() => {
          if (selectedRow._id) {
            checkDoubleClick(checkDoubleClickRef, updateNhanVien, [])
          } else {
            checkDoubleClick(checkDoubleClickRef, createNhanVien, [])
          }
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRow?._id, isTamNgung])

    const handleCheckButtonSave = () => {
      if (
        (disableSave && selectedRow?._id) ||
        (disableSave && !selectedRow?._id)
      ) {
        return true
      }
      return false
    }

    const hanleInputAddress = (val: any) => {
      const fullAddress: any = `${
        val.target.value ? `${val.target.value}, ` : ''
      }${state.diaChi.TenDayDu ? state.diaChi.TenDayDu : ''}`
      form.setFieldsValue({
        DiaChi: fullAddress
      })
    }

    const handleUpload = useCallback((file: any) => {
      if (file) {
        uploadFile('image', [file], (err: any, res: any) => {
          try {
            if (!res || err) throw new Error('Upload image error')
            setAvatarUrl(res?.[0]?.filename)
            dataImageFileRef.current = res?.[0]?.filename
          } catch (error) {
            messageToast.error({
              message: t('error.error_upload_img')
            })
          }
        }).catch(() => {
          messageToast.error({
            message: t('error.error_upload_img')
          })
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSearchUser = async (val: string) => {
      if (waitingUser.current) clearTimeout(waitingUser.current)
      waitingUser.current = setTimeout(async () => {
        const idDefault = form.getFieldValue('TaiKhoan_Id')
        SearhUser({
          variables: {
            keyword: val,
            idDefault: null,
            limit: 50,
            isUpdate: !!idDefault
          }
        })
      }, 300)
    }

    return (
      <>
        <Modal
          title={`${selectedRow?.MaNhanVien || t('staff.textNewStaff')}`}
          width={500}
          centered
          className='modal-staff'
          visible={visible}
          okText={t('staff.btnSave')}
          cancelText={t('staff.btnClose')}
          onCancel={handleHide}
          footer={
            <Footer ref={footerRef} visible>
              <Button
                iconName='save'
                data-ci='btn-save'
                onClick={onOkFooter}
                disabled={handleCheckButtonSave()}
              >
                {t('staff.btnSave')}
              </Button>
              <Button
                buttonType={ButtonType.Neutral}
                iconName='decline'
                data-ci='btn-close'
                onClick={handleHide}
              >
                {t('staff.btnExit')}
              </Button>
            </Footer>
          }
        >
          <div>
            <Form
              form={form}
              initialValues={{
                GioiTinh: EnumGender.Male
              }}
              layout={FormLayout.Vertical}
              className='form-staff'
              onValuesChange={(_, values: any) => {
                const { TenNhanVien, NgaySinh, GioiTinh } = values
                setDisableSave(!TenNhanVien || !NgaySinh || !GioiTinh)
              }}
            >
              <Row>
                <Col span='12'>
                  <div>
                    <Upload
                      action=''
                      name='avatar'
                      showUploadList={false}
                      listType='picture-card'
                      accept='.png,.jpg,.jpeg'
                      beforeUpload={handleUpload}
                    >
                      {avatarUrl ? (
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            position: 'relative'
                          }}
                        >
                          <img
                            alt='avatar'
                            width={102}
                            height={102}
                            // eslint-disable-next-line dot-notation
                            src={`${backendUrlFile['image']}/${avatarUrl}`}
                          />
                        </div>
                      ) : (
                        <div>Upload</div>
                      )}
                    </Upload>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span='12'>
                  <Form.Item
                    label={t('staff.gridName')}
                    name='TenNhanVien'
                    rules={[{ required: true }]}
                  >
                    <Input
                      autoFocus
                      placeholder={t('staff.holderName')}
                      disabled={!state.disableButtonEdit && selectedRow?._id}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span='XL6 L6 M6 S6'>
                  <Form.Item
                    label={t('staff.gridDOB')}
                    name='NgaySinh'
                    rules={[{ required: true }]}
                  >
                    <Calendar.DatePicker
                      data-ci='NgaySinh'
                      placeholder='dd/mm/yyyy'
                      format={['DD/MM/YYYY', 'DDMMYYYY']}
                      disabled={!state.disableButtonEdit && selectedRow?._id}
                    />
                  </Form.Item>
                </Col>
                <Col span='XL6 L6 M6 S6'>
                  <Form.Item
                    label={t('staff.gridGender')}
                    name='GioiTinh'
                    rules={[{ required: true }]}
                  >
                    <Select
                      disabled={!state.disableButtonEdit && selectedRow?._id}
                    >
                      <Option data-ci='male' value={EnumGender.Male}>
                        {t('common.male')}
                      </Option>
                      <Option data-ci='female' value={EnumGender.Female}>
                        {t('common.female')}
                      </Option>
                      {/* <Option data-ci='other' value='OTHER'>Khác</Option> */}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span='XL6 L6 M6 S6'>
                  <Form.Item label={t('staff.gridID')} name='CMNDHoacHoChieu'>
                    <Input
                      disabled={!state.disableButtonEdit && selectedRow?._id}
                      placeholder={t('staff.holderID')}
                    />
                  </Form.Item>
                </Col>
                <Col span='XL6 L6 M6 S6'>
                  <Form.Item label={t('staff.gridTaxCode')} name='TaxCode'>
                    <Input
                      disabled={!state.disableButtonEdit && selectedRow?._id}
                      placeholder={t('staff.holderTaxCode')}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span='12'>
                  <Form.Item label={t('staff.gridPhone')} name='SoDienThoai'>
                    <Input
                      disabled={!state.disableButtonEdit && selectedRow?._id}
                      placeholder={t('staff.holderPhone')}
                    />
                  </Form.Item>{' '}
                </Col>
              </Row>
              <Row>
                <Col span='12'>
                  <Form.Item
                    label='Email'
                    name='Email'
                    rules={[
                      {
                        type: 'email',
                        message: t('staff.msgEmailInvalidate')
                      }
                    ]}
                  >
                    <Input
                      disabled={!state.disableButtonEdit && selectedRow?._id}
                      placeholder={t('staff.holderEmail')}
                    />
                  </Form.Item>{' '}
                </Col>
              </Row>
              <Row>
                <Col span='12'>
                  <Form.Item label={t('staff.labelDistrict')} name='DiaChi_Id'>
                    <Select
                      onSearch={searchAccommodation}
                      onChange={changeSearchNoiSinhSong}
                      filterOption={false}
                      optionLabelProp='label'
                      showSearch
                      disabled={!state.disableButtonEdit && selectedRow?._id}
                    >
                      {state &&
                        state.optsDiaChi?.map((item: any, idx: any) => (
                          <Option
                            key={idx}
                            value={item._id}
                            label={item.TenDayDu}
                          >
                            <div>{item.TenDayDu}</div>
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>{' '}
                </Col>
              </Row>
              <Row>
                <Col span='12'>
                  <Form.Item
                    label={t('staff.labelApartmentNumber')}
                    name='SoNha'
                  >
                    <Input
                      disabled={!state.disableButtonEdit && selectedRow?._id}
                      onChange={hanleInputAddress}
                      placeholder={t('staff.holderApartmentNumber')}
                    />
                  </Form.Item>{' '}
                </Col>
              </Row>
              <Row>
                <Col span='12'>
                  <Form.Item label={t('staff.labelAddress')} name='DiaChi'>
                    <Input readOnly />
                  </Form.Item>{' '}
                </Col>
              </Row>
              <Row>
                <Col span='12'>
                  <Form.Item label={t('staff.textAccount')} name='TaiKhoan_Id'>
                    <Select
                      showSearch
                      filterOption={false}
                      optionLabelProp='label'
                      onSearch={onSearchUser}
                      onClick={() => {
                        const idDefault = form.getFieldValue('TaiKhoan_Id')
                        SearhUser({
                          variables: {
                            keyword: '',
                            idDefault: idDefault || null,
                            limit: 50,
                            isUpdate: !!idDefault
                          }
                        })
                      }}
                    >
                      {state.users?.map((i: any, idx: number) => (
                        <Option key={idx} value={i._id} label={i?.username}>
                          <div>{i?.username}</div>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>{' '}
                </Col>
              </Row>
              <Row>
                <Col span='12'>
                  <Form.Item label='' name='TamNgung' controlWidth='68%'>
                    <Checkbox
                      data-ci='TamNgung'
                      onChange={checkedPending}
                      checked={isTamNgung}
                      disabled={!state.disableButtonEdit && selectedRow?._id}
                    >
                      {t('staff.textActivePending')}
                    </Checkbox>
                  </Form.Item>{' '}
                </Col>
              </Row>
            </Form>
          </div>
        </Modal>
      </>
    )
  })
)
export default StaffModal
