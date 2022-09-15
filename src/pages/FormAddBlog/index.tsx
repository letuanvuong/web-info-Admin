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
  TypeImage,
  useCreateBlogMutation,
  useGetBlogByIdQuery,
  useGetBlogPaginationQuery,
  useGetMapBlogRelatedsByBlogQuery,
  useUpdateBlogMutation
} from 'src/graphql-definition/webinfo-service.generated'
import { REGEX_SLUG } from 'src/utils/function'
import UploadImage from 'src/utils/reviewbeforeuploadsinglefile'
import { backendUrlFile, uploadFile } from 'src/utils/uploadFile'

import ButtonAction from '../CMSHome/ButtonAction'
import dataBlogsGroup from '../ManageBlog/directories.json'
import { BlogsType } from '../ManageBlog/type'
import IcdPhuField, { IcdData } from './IcdPhuField'

import './styles.less'

function FormAddBlog() {
  const editorRef = useRef<any>(null)
  const { CKEditor, Editor } = editorRef.current || {}
  const { t } = useTranslation()
  const [formInfo] = Form.useForm()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { resetFields, validateFields } = formInfo
  const [ckcontent, setCKcontent] = useState('')
  const [IsWarning, setIsWarning] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { idItem }: { idItem: string } = useParams()
  const history: any = useHistory()
  const [selectedValues, setSelectedValues] = useState<IcdData[]>([])
  // upload single file
  const [imageUrl, setImageUrl] = useState<any>()
  const singleImageRef = useRef<any>()
  const singleFileRef = useRef<any>()
  const { data: dataBlogById, refetch } = useGetBlogByIdQuery({
    fetchPolicy: 'no-cache',
    variables: {
      id: idItem
    }
  })
  const { data: dataBlogRelatedByBlog } = useGetMapBlogRelatedsByBlogQuery({
    variables: {
      idBlog: idItem
    }
  })
  const { data: dataBlogs } = useGetBlogPaginationQuery({
    fetchPolicy: 'no-cache',
    variables: {
      page: 1,
      filter: [],
      sort: [{ fieldSort: 'publishAt', sort: -1 }],
      idsDefault:
        dataBlogRelatedByBlog?.getMapBlogRelatedsByBlog?.map(
          (e) => e?.idBlogRelated
        ) || []
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

  const reloadBlogByID = () => {
    if (dataBlogById) {
      // setImageUrl(dataBlogById?.getBlogById?.mainPhoto || null)
      singleImageRef.current = dataBlogById?.getBlogById?.mainPhoto || null
      const { title, sortContent, content, keywords, slug, priority } =
        dataBlogById.getBlogById
      formInfo.setFieldsValue({
        mainPhoto: dataBlogById?.getBlogById.mainPhoto || null,
        title,
        sortContent,
        content,
        keywords,
        priority,
        slug,
        idsBlogRelated:
          dataBlogRelatedByBlog?.getMapBlogRelatedsByBlog?.map(
            (e) => e?.idBlogRelated
          ) || []
      })
      setSelectedValues([])
    }
  }

  useEffect(() => {
    reloadBlogByID()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dataBlogById?.getBlogById,
    dataBlogRelatedByBlog?.getMapBlogRelatedsByBlog
  ])

  const setAllForm = async () => {
    if (dataBlogById) {
      refetch({ id: idItem })
        .then(({ errors, data }) => {
          reloadBlogByID()
        })
        .catch((err) => {})
      setFieldCKData()
    } else {
      formInfo.resetFields()
      setCKcontent('')
      setImageUrl(null)
    }
  }

  const setFieldCKData = () => {
    if (dataBlogById?.getBlogById) {
      setCKcontent(dataBlogById?.getBlogById?.content || '')
    } else setCKcontent('')
  }

  useEffect(() => {
    setFieldCKData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataBlogById])

  const [callCreateBlog] = useCreateBlogMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.createBlog?._id) {
        messageToast.success({
          message: t('manageBlog.notiCreateSuccess')
        })
      }
      setCKcontent('')
      formInfo.resetFields()
      setImageUrl({})
      singleImageRef.current = null
      handleLoadGrid()
    },
    onError: (error) => {
      messageToast.error({
        message: error?.message
          ? error?.message
          : t('manageBlog.notiCreateFaild')
      })
    }
  })
  const handleLoadGrid = () => {
    let finded = null
    const findedCT_Blogs = dataBlogsGroup.find(
      (i: BlogsType) => i.route === '/blog-list'
    )

    finded = findedCT_Blogs
    if (finded?.type === 'his') {
      history.push(`/manage-blog${finded.route}`)
    } else {
      window.location.href = `${window.location.origin}/manage-blog${finded?.route}`
    }
  }

  const handlebBackGrid = (action: string) => {
    if (IsWarning) {
      Modal.confirm({
        wrapClassName: 'waringModal',
        title: t('manageBlog.titleWarning'),
        centered: true,
        type: ConfirmType.Warning,
        okText: t('manageBlog.btnOK'),
        cancelText: t('manageBlog.btnCancel'),
        content: t('manageBlog.msgWarning'),
        onOk: () => {
          if (action === 'back') handleLoadGrid()
          else if (action === 'cancel') {
            setAllForm()
          }
          singleFileRef.current = null
          setIsWarning(false)
        }
      })
    } else {
      if (action === 'back') handleLoadGrid()
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      else action === 'cancel'
      setAllForm()
    }
  }
  const [callUpdateBlog] = useUpdateBlogMutation({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      if (data?.updateBlog?._id) {
        messageToast.success({
          message: t('manageBlog.notiUpdateSuccess')
        })
      }
      setImageUrl({})
      singleImageRef.current = null
      handleLoadGrid()
    },
    onError: (error) => {
      messageToast.error({
        message: error?.message
          ? error?.message
          : t('manageBlog.notiUpdateFaild')
      })
    }
  })

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
            const {
              title,
              sortContent,
              keywords,
              idsBlogRelated,
              slug,
              priority
            } = values
            const input = {
              mainPhoto: singleLinkImage,
              title,
              sortContent,
              content: ckcontent,
              keywords,
              slug: slug !== '' ? slug : undefined,
              priority: priority ? +priority : null
            }
            if (dataBlogById) {
              const queryValue = {
                variables: {
                  id: dataBlogById.getBlogById._id,
                  input,
                  idsBlogRelated
                }
              }
              callUpdateBlog(queryValue)
            } else {
              const queryValue = {
                variables: {
                  input: {
                    ...input
                  },
                  idsBlogRelated
                }
              }

              callCreateBlog(queryValue)
            }
          }
        )
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err, 'err'))
  }
  return (
    <div className='form-add' style={{ height: '100%', overflow: 'auto' }}>
      <div className='tile-blog'>
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
                handlebBackGrid('back')
              }}
            />
            {dataBlogById?.getBlogById
              ? dataBlogById?.getBlogById?.title
              : t('manageBlog.titleNewBlog')}
          </span>
        </h3>
      </div>
      <Form
        form={formInfo}
        layout={FormLayout.Vertical}
        className='add_blog_form'
      >
        <Row>
          <Col span='XL9 L9 M9 S9'>
            <div className='form-item'>
              <Row>
                <Form layout={FormLayout.Horizontal} form={formInfo}>
                  <Form.Item
                    name='title'
                    rules={[
                      {
                        required: true,
                        message: t('manageBlog.msgTitleMissing')
                      }
                    ]}
                    label={t('manageBlog.gridBlogTitle')}
                    labelStyle={{ width: 110, marginRight: 20 }}
                  >
                    <Input
                      style={{ width: '500px' }}
                      placeholder={t('manageBlog.holderBlogTitle')}
                      onChange={() => {
                        setIsWarning(true)
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name='sortContent'
                    rules={[
                      {
                        required: true,
                        message: t('manageBlog.msgSortContentMissing')
                      }
                    ]}
                    label={t('manageBlog.labelDescription')}
                    labelStyle={{ width: 110, marginRight: 20 }}
                  >
                    <TextArea
                      placeholder={t('manageBlog.holderSortContent')}
                      rows={3}
                      onChange={() => {
                        setIsWarning(true)
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name='keywords'
                    label={t('manageBlog.textKeyWord')}
                    labelStyle={{ width: 110, marginRight: 20 }}
                  >
                    <Input
                      placeholder={t('manageBlog.holderKeyWord')}
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
                        message: t('manageBlog.msgSlugHasSpecialCharacter')
                      }
                    ]}
                    label='Slug'
                    labelStyle={{ width: 110, marginRight: 20 }}
                  >
                    {dataBlogById ? (
                      <Input
                        placeholder={t('manageBlog.holderSlug')}
                        readOnly
                      />
                    ) : (
                      <Input
                        placeholder={t('manageBlog.holderSlug')}
                        onChange={() => {
                          setIsWarning(true)
                        }}
                      />
                    )}
                  </Form.Item>
                  <Form.Item
                    name='priority'
                    label={t('manageBlog.textPriority')}
                    labelStyle={{ width: 110, marginRight: 20 }}
                  >
                    <Input.Number
                      style={{ width: '500px' }}
                      placeholder={t('manageBlog.holderPriority')}
                      onChange={() => {
                        setIsWarning(true)
                      }}
                    />
                  </Form.Item>
                </Form>
              </Row>
            </div>

            {mounted && (
              <div style={{ height: '100%' }}>
                <Row>
                  <div className='ckeditor-content'>
                    <span className='blog-content-title'>
                      {t('manageBlog.labelContent')}
                    </span>
                    <div style={{ paddingTop: 12 }}>
                      <Form.Item
                        name='ckcontent'
                        style={{ width: '100%' }}
                        rules={[
                          {
                            required: true,
                            message: t('manageBlog.msgContentMissing')
                          }
                        ]}
                      >
                        <CKEditor
                          type=''
                          name='ContentEditor'
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
                    </div>
                  </div>
                </Row>
              </div>
            )}
            <div className='form-item'>
              <Row>
                <Form layout={FormLayout.Horizontal} form={formInfo}>
                  <Form.Item
                    name='idsBlogRelated'
                    label={t('manageBlog.labelBlogRelated')}
                    labelStyle={{ width: 110, marginRight: 20 }}
                  >
                    <IcdPhuField
                      options={dataBlogs?.getBlogPagination?.data || []}
                      onChange={() => {
                        setIsWarning(true)
                      }}
                      selectedValues={selectedValues}
                      setSelectedValues={setSelectedValues}
                      style={{ height: 32, width: '100%' }}
                    />
                  </Form.Item>
                </Form>
              </Row>
            </div>
          </Col>
          <Col span='XL3 L3 M3 S3'>
            <div className='form-image'>
              <span className='blog-image-title'>
                {t('manageBlog.labelImage')}
              </span>
              <Row>
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
                  {t('manageBlog.clickImage')}
                </p>
              </Row>
            </div>
          </Col>
        </Row>
        <div
          className='w-100 position-absolute bg-white  shadow-lg p-2'
          style={{ left: 0, bottom: 0 }}
        >
          <div style={{ marginTop: -20 }}>
            <ButtonAction
              onSubmit={() => onSubmit()}
              onCancel={() => {
                handlebBackGrid('cancel')
              }}
            />
          </div>
        </div>
      </Form>
    </div>
  )
}

export default FormAddBlog
