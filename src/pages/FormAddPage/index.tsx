import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  AddActivity2SapIcon,
  BackFluentIcon,
  DeclineSapIcon,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  DeleteSapIcon,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  EditSapIcon,
  SaveSapIcon
} from '@digihcs/icons'
import {
  Button,
  Checkbox,
  Col,
  FieldForm as Form,
  Input,
  messageToast,
  Modal,
  Row
} from '@digihcs/innos-ui3'
import { ButtonType } from '@digihcs/util/lib/enums/ButtonType'
import { ConfirmType } from '@digihcs/util/lib/enums/ConfirmType'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { List } from 'antd'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import moment from 'moment'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { editorConfig } from 'src/constant'
import {
  EnumContentHistoryType,
  Page,
  useCreateContentHistoryMutation,
  useCreatePageMutation,
  useDeleteContentHistoryMutation,
  useGetContentHistoryQuery,
  useGetPageByIdQuery,
  useRenameVersionMutation,
  useUpdatePageMutation
} from 'src/graphql-definition/webinfo-service.generated'
import { REGEX_SLUG } from 'src/utils/function'

import dataPagesGroup from '../ManagePage/directories.json'
import { PagesType } from '../ManagePage/type'

import './styles.less'

type PagesPassing = {
  currentPages: Page | null
}

function FormAddPage() {
  const editorRef = useRef<any>(null)
  const { CKEditor, Editor } = editorRef.current || {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPages, setCurrentPages] = useState<PagesPassing>()
  const { t } = useTranslation()
  const [formInfo] = Form.useForm()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { resetFields, validateFields } = formInfo
  const [ckcontent, setCKcontent] = useState('')
  const [isMainMenu, setIsMainMenu] = useState(false)
  const [isFooterMenu, setIsFooterMenu] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { idItem }: { idItem: string } = useParams()
  const [IsWarning, setIsWarning] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isShowUpdate, setShowUpdate] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [valueVersion, setValueVersion] = useState<any>('')
  const history: any = useHistory()

  const { data: dataPageById, refetch } = useGetPageByIdQuery({
    variables: {
      id: idItem
    }
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [id, setId] = useState<number | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [active, setActive] = useState<number | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState<string>('')

  const { data: dataContentHitory, refetch: reload } =
    useGetContentHistoryQuery({
      fetchPolicy: 'no-cache',
      variables: {
        idContent: idItem,
        type: EnumContentHistoryType.Page
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

  const reloadPageByID = (value: any) => {
    if (dataPageById) {
      const {
        title,
        content,
        description,
        keywords,
        slug,
        isAddToMainMenu,
        isAddToFooterMenu
      } = dataPageById.getPageById
      formInfo.setFieldsValue({
        title,
        content,
        description,
        keywords,
        slug
      })

      setIsMainMenu(isAddToMainMenu)
      setIsFooterMenu(isAddToFooterMenu)
    }
    if (value) {
      formInfo.setFieldsValue({
        title: JSON.parse(value).dataPage.title,
        description: JSON.parse(value).dataPage.description,
        keywords: JSON.parse(value).dataPage.keywords
      })
      setCKcontent(JSON.parse(value).dataPage.content)
      setIsMainMenu(JSON.parse(value).dataPage.isAddToMainMenu)
      setIsFooterMenu(JSON.parse(value).dataPage.isAddToFooterMenu)
    }
  }

  useEffect(() => {
    reloadPageByID(valueVersion)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueVersion, dataPageById?.getPageById])

  const setAllForm = async () => {
    if (dataPageById) {
      refetch({ id: idItem })
        .then(({ errors, data }) => {
          reloadPageByID('')
        })
        .catch((err) => {})
      setFieldCKData()
    }
    if (dataContentHitory) {
      reload({ idContent: idItem })
        .then(({ errors, data }) => {
          reloadPageByID('')
        })
        .catch((err) => {})
      setFieldCKData()
    } else {
      formInfo.resetFields()
      setCKcontent('')
    }
    setIsWarning(false)
    setShowUpdate(false)
    setActive(null)
  }

  const setFieldCKData = () => {
    if (dataPageById?.getPageById) {
      setCKcontent(dataPageById?.getPageById?.content || '')
    } else setCKcontent('')
  }

  useEffect(() => {
    // setFieldInfoData()
    setFieldCKData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPageById])

  const [callCreatePage] = useCreatePageMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.createPage?._id) {
        messageToast.success({
          message: t('managePages.notiCreatePageSuccess')
        })
        setCKcontent('')
        formInfo.resetFields()
        handleLoadGrid()
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
  const [callUpdatePage] = useUpdatePageMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.updatePage?._id) {
        messageToast.success({
          message: t('managePages.notiUpdatePageSuccess')
        })
        handleLoadGrid()
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
  const [callCreatePageHistory] = useCreateContentHistoryMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.createContentHistory?._id) {
        messageToast.success({
          message: t('managePages.notiCreateVersionSuccess')
        })
        reload({ idContent: idItem })
      }
    },
    onError: (error) => {
      messageToast.error({
        message: error?.message
          ? error?.message
          : t('managePages.notiCreateVersionFaild')
      })
    }
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [callDelete, { data: dataDelete, loading, error }] =
    useDeleteContentHistoryMutation({
      fetchPolicy: 'no-cache',
      onCompleted: async (dataDelete) => {
        if (dataDelete?.deleteContentHistory) {
          messageToast.success({
            message: t('success.notiSuccess'),
            duration: 2
          })
          reload({ idContent: idItem })
        } else {
          messageToast.warning({
            message: (
              <span className='text-danger' style={{ fontWeight: 'bold' }}>
                {t('category.notiCannotDelete')}
              </span>
            ),
            duration: 0
          })
        }
      },
      onError: (error) => {
        messageToast.error({
          message: error?.message ? error?.message : t('error.can_not_delete'),
          duration: 2
        })
      }
    })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [callRenameVersion, { data: rename }] = useRenameVersionMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (rename) => {
      if (rename?.renameVersion) {
        messageToast.success({
          message: t('managePages.msgRenameSuccess'),
          duration: 2
        })
        setId(null)
        reload({ idContent: idItem })
      } else {
        messageToast.warning({
          message: (
            <span className='text-danger' style={{ fontWeight: 'bold' }}>
              {t('managePages.msgRenameFailed')}
            </span>
          ),
          duration: 0
        })
      }
    },
    onError: (error) => {
      messageToast.error({
        message: error?.message ? error?.message : t('error.can_not_delete'),
        duration: 2
      })
    }
  })

  // const handleChangeSlug: any = async (e: any) => {
  //   if (!currentPages?.currentPages?._id) {
  //     const title = e.target.value
  //     const newSlug = await generateSlug(title)
  //     formInfo.setFieldsValue({
  //       slug: newSlug
  //     })
  //   }
  // }
  const handleLoadGrid = () => {
    let finded = null
    const findedCT_Pages = dataPagesGroup.find(
      (i: PagesType) => i.route === '/cms-other-pages'
    )

    finded = findedCT_Pages
    if (finded?.type === 'his') {
      history.push(`/manage-page${finded.route}`)
    } else {
      window.location.href = `${window.location.origin}/manage-page${finded?.route}`
    }
  }
  const handleBackGrid = (action: string) => {
    if (IsWarning) {
      Modal.confirm({
        wrapClassName: 'waringModal',
        title: t('managePages.titleWarning'),
        centered: true,
        type: ConfirmType.Warning,
        okText: t('managePages.btnOK'),
        cancelText: t('managePages.btnCancel'),
        content: t('managePages.msgWarning'),
        onOk: () => {
          if (action === 'back') handleLoadGrid()
          else if (action === 'cancel') {
            setId(null)
            setAllForm()
          }
        }
      })
    } else {
      if (action === 'back') handleLoadGrid()
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      else action === 'cancel'
      setId(null)
      setAllForm()
    }
  }

  const onSubmit = () => {
    validateFields()
      .then((values) => {
        const { title, description, keywords, slug } = values
        const input = {
          title,
          description,
          keywords,
          slug: slug !== '' ? slug : undefined,
          isAddToMainMenu: isMainMenu,
          isAddToFooterMenu: isFooterMenu,
          content: ckcontent
        }
        if (dataPageById) {
          const queryValue = {
            variables: {
              id: dataPageById.getPageById._id,
              input
            }
          }
          callUpdatePage(queryValue)
        } else {
          const queryValue = {
            variables: {
              input: {
                ...input
              }
            }
          }
          callCreatePage(queryValue)
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err, 'err'))
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSaveVersion = () => {
    validateFields()
      .then((values) => {
        const { title, description, keywords, slug } = values
        const input = {
          title,
          description,
          keywords,
          slug: slug !== '' ? slug : undefined,
          isAddToMainMenu: isMainMenu,
          isAddToFooterMenu: isFooterMenu,
          content: ckcontent
        }

        callCreatePageHistory({
          variables: {
            input: {
              type: EnumContentHistoryType.Page,
              idPage: dataPageById?.getPageById?._id,
              dataPage: input
            }
          }
        })
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err, 'err'))
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleUpdateVersion = () => {
    validateFields()
      .then((values) => {
        const { title, description, keywords, slug } = values
        const input = {
          title,
          description,
          keywords,
          slug,
          isAddToMainMenu: isMainMenu,
          isAddToFooterMenu: isFooterMenu,
          content: ckcontent
        }
        const queryValue = {
          variables: {
            id: dataPageById.getPageById._id,
            input
          }
        }
        Modal.confirm({
          wrapClassName: 'deleteModal',
          title: t('managePages.msgRestoreVersion'),
          centered: true,
          type: ConfirmType.Confirm,
          okText: t('managePages.btnOK'),
          cancelText: t('managePages.btnCancel'),
          content: JSON.parse(valueVersion).name
            ? JSON.parse(valueVersion).name
            : `${t('managePages.version')} ${JSON.parse(valueVersion).version}`,
          onOk: () => callUpdatePage(queryValue)
        })
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err, 'err'))
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDelete = useCallback(async (data) => {
    Modal.confirm({
      wrapClassName: 'deleteModal',
      title: t('managePages.msgDeleteVersion'),
      centered: true,
      type: ConfirmType.Error,
      okText: t('managePages.btnOK'),
      cancelText: t('managePages.btnCancel'),
      // content: data.name ? data.name : `${t('managePages.version')} ${data.version}`,
      tags: [
        {
          key: data._id,
          label: data.name
            ? data.name
            : `${t('managePages.version')} ${data.version}`
        }
      ],
      onOk: () =>
        callDelete({
          variables: {
            id: data?._id
          }
        })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleRenameVersion = useCallback(async (data, value) => {
    Modal.confirm({
      wrapClassName: 'deleteModal',
      title: t('managePages.msgRenameVersion'),
      centered: true,
      type: ConfirmType.Confirm,
      okText: t('managePages.btnOK'),
      cancelText: t('managePages.btnCancel'),
      content: value,
      onOk: () => {
        callRenameVersion({
          variables: {
            id: data?._id,
            name: value
          }
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const handleChange = (value: any) => {
  //   setValueVersion(value)
  //   setIsWarning(true)
  //   setShowUpdate(true)
  //   reloadPageByID(valueVersion)
  // }
  return (
    <div className='form-add' style={{ height: '100%', overflow: 'auto' }}>
      <Form
        form={formInfo}
        layout={FormLayout.Horizontal}
        className='add-form-page'
      >
        <Row>
          <div className='tile-page'>
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
                    handleBackGrid('back')
                  }}
                />
                {dataPageById?.getPageById
                  ? dataPageById?.getPageById.title
                  : t('managePages.titleNewPage')}
              </span>
            </h3>
          </div>

          <Col span='XL9 L9 M9 S9'>
            <div className='form-item'>
              <Row>
                <div className='formTitle'>
                  <Form.Item
                    name='title'
                    label={t('managePages.gridTitle')}
                    labelStyle={{
                      width: '100px',
                      display: 'flex',
                      flex: 'none'
                    }}
                    rules={[
                      {
                        required: true,
                        message: t('managePages.msgTitleMissing')
                      }
                    ]}
                    style={{ width: '100%' }}
                  >
                    <Input
                      // onBlur={handleChangeSlug}
                      autoFocus
                      placeholder={t('managePages.holderTitle')}
                      onChange={() => {
                        setIsWarning(true)
                      }}
                    />
                  </Form.Item>
                  <div className='flexCheckbox'>
                    <div style={{ marginLeft: '10px' }}>
                      <Form.Item name='isAddToMainMenu'>
                        <Checkbox
                          checked={isMainMenu}
                          onChange={(e) => {
                            setIsMainMenu(e.target.checked)
                            setIsWarning(true)
                          }}
                        >
                          {t('managePages.addToMainMenu')}
                        </Checkbox>
                      </Form.Item>
                    </div>
                    <div style={{ marginLeft: '10px' }}>
                      <Form.Item>
                        <Checkbox
                          checked={isFooterMenu}
                          onChange={(e) => {
                            setIsFooterMenu(e.target.checked)
                            setIsWarning(true)
                          }}
                        >
                          {t('managePages.addToFooterMenu')}
                        </Checkbox>
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <Form.Item
                  name='description'
                  label={t('managePages.gridDescription')}
                  labelStyle={{ width: '100px', display: 'flex', flex: 'none' }}
                  style={{ marginBottom: '15px' }}
                >
                  <Input
                    placeholder={t('managePages.holderDescription')}
                    onChange={() => {
                      setIsWarning(true)
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name='keywords'
                  label={t('managePages.gridKeyword')}
                  labelStyle={{ width: '100px', display: 'flex', flex: 'none' }}
                  style={{ marginBottom: '15px' }}
                >
                  <Input
                    placeholder={t('managePages.holderKeyword')}
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
                      message: t('managePages.msgSlugHasSpecialCharacter')
                    }
                  ]}
                  label='Slug'
                  labelStyle={{ width: '100px', display: 'flex', flex: 'none' }}
                >
                  {dataPageById ? (
                    <Input placeholder={t('managePages.holderSlug')} readOnly />
                  ) : (
                    <Input
                      placeholder={t('managePages.holderSlug')}
                      onChange={() => {
                        setIsWarning(true)
                      }}
                    />
                  )}
                </Form.Item>
              </Row>
            </div>
            <div className='form-item'>
              {mounted && (
                <div style={{ height: '100%' }}>
                  <Row>
                    <Form.Item
                      name='ckcontent'
                      label={t('managePages.gridContent')}
                      labelStyle={{ width: '150px', textAlign: 'left' }}
                      rules={[
                        {
                          required: true,
                          message: t('managePages.msgContentMissing')
                        }
                      ]}
                      style={{ width: '100%', display: 'inherit' }}
                      className='cms-ck ck-editor__editable'
                    >
                      <CKEditor
                        type=''
                        name='content'
                        editor={Editor}
                        data={ckcontent || ''}
                        config={editorConfig}
                        width='100%'
                        onChange={(event: any, editor: any) => {
                          setCKcontent(editor.getData())
                        }}
                        onFocus={() => setIsWarning(true)}
                      />
                    </Form.Item>
                  </Row>
                </div>
              )}
            </div>
          </Col>
          {/* <Col span='XL3 L3 M3 S3'>
            <div className={!dataPageById?.getPageById ? 'hideButton' : 'form-item'}>
              <div className='versionTitle'>
                <b className='card-title'>{t('managePages.selectVersion')}</b>
                <Button
                  iconName={<SaveSapIcon />}
                  style={{ marginRight: 10, minWidth: 70 }}
                  onClick={() => handleUpdateVersion()}
                  // disabled={isShowUpdate === false}
                  className={!dataPageById?.getPageById || isShowUpdate === false ? 'hideButton' : ''}
                >
                  {t('managePages.btnUpdateVersion')}
                </Button>
              </div>

              <div
                id='scrollableDiv'
                style={{
                  marginTop: '5px',
                  height: 300,
                  overflow: 'auto',
                  overflowX: 'hidden',
                  border: '1px solid #b8bbbe',
                  boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
                }}
              >
                <List
                  dataSource={dataContentHitory?.getContentHistory}
                  renderItem={(item, index) => (
                    <List.Item key={index} className='clickItem'>
                      <div
                        className={`clickItemVersion ${active === index ? 'active' : ''}`}
                        onClick={((e) => {
                          setValueVersion(JSON.stringify(item))
                          setIsWarning(true)
                          setShowUpdate(true)
                          setId(null)
                          setActive(index)
                          reloadPageByID(valueVersion)
                        })}
                      >
                        {id === index
                          ? <input id='myText'
                            type='text'
                            className={active === index ? 'active' : ''}
                            style={{ border: 'none', background: 'transparent', outline: 0, width: '220px' }}
                            onChange={(e) => {
                              setValue(e.target.value)
                              setIsWarning(true)
                            }}
                            autoFocus
                            value={value}
                            onKeyDown={(e) => e.key === "Enter" && handleRenameVersion(item, value)}
                          // onBlur={() => { handleRenameVersion(item, value) }}
                          />
                          : <div className='textRedundant'>{item.name ? item.name : `${t('managePages.version')} ${item.version}`}</div>
                        }
                        <div className='textcreatedAt'>{item.updatedAt && item.updatedBy.username ? `${moment(item.updatedAt).format('HH:mm DD/MM/YYYY')} - ${item.updatedBy.username}` : `${moment(item.createdAt).format('HH:mm DD/MM/YYYY')} - ${item.createdBy.username}`}</div>
                      </div>
                      <div className='buttonVersion'>
                        <Button
                          noFill
                          onClick={() => {
                            setId((prev) => prev === index ? null : index)
                            setValue(item.name ? item.name : `${t('managePages.version')} ${item.version}`)
                          }}
                          iconName={<EditSapIcon />}
                          className='btn-edit-item-grid'
                        />
                        <Button
                          noFill
                          onClick={() => {
                            handleDelete(item)
                          }}
                          iconName={<DeleteSapIcon style={{ color: '#BB0000' }} />}
                        />
                      </div>
                    </List.Item>
                  )}
                />
              </div>

            </div>
          </Col > */}
        </Row>
        <div
          className='w-100 position-absolute bg-white  shadow-lg p-2'
          style={{ left: 0, bottom: 0 }}
        >
          <div style={{ marginTop: -20 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                background: 'white'
              }}
            >
              <Button
                iconName={<DeclineSapIcon />}
                buttonType={ButtonType.Negative}
                style={{ marginRight: 10, minWidth: 70 }}
                onClick={() => handleBackGrid('cancel')}
              >
                {t('manageAboutUs.btnCancel')}
              </Button>
              {/* <Button
                iconName={<AddActivity2SapIcon />}
                style={{ marginRight: 10, minWidth: 70 }}
                onClick={() => handleSaveVersion()}
                disabled={!dataPageById?.getPageById}
                className={!dataPageById?.getPageById ? 'hideButton' : ''}
              >
                {t('managePages.btnSaveVersion')}
              </Button> */}
              <Button
                style={{ minWidth: 70 }}
                onClick={() => onSubmit()}
                iconName={<SaveSapIcon />}
              >
                {t('manageAboutUs.btnSave')}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default FormAddPage
