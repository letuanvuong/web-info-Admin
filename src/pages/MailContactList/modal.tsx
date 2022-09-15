import { DeclineSapIcon } from '@digihcs/icons'
import { Button, FieldForm as Form, Modal } from '@digihcs/innos-ui3'
import { FooterRef } from '@digihcs/innos-ui3/es/footer/interface'
import { ButtonType } from '@digihcs/util/lib/enums/ButtonType'
import { FormLayout } from '@digihcs/util/lib/enums/FormLayout'
import {
  forwardRef,
  RefObject,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import { MailContact } from 'src/graphql-definition/webinfo-service.generated'

import './styles.less'

interface Props {
  refetchGridData: () => void
}

type MessagesPassing = {
  currentMessage: MailContact | null
}
export interface ModalMessageRefs {
  openModalMessage: () => void
  setCurrentMessage: (data: MessagesPassing) => void
}

const MessageModal = forwardRef<ModalMessageRefs, Props>(
  ({ refetchGridData }, ref) => {
    const { t } = useTranslation()
    const [currentMessage, setCurrentMessage] = useState<any>()

    const [visible, setVisible] = useState<boolean>(false)
    const [form] = Form.useForm()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { resetFields, validateFields } = form
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const footerRef: RefObject<FooterRef> = useRef()
    useImperativeHandle(ref, () => ({
      openModalMessage,
      setCurrentMessage
    }))

    const closeModal = () => {
      resetFields()
      setVisible(false)
    }
    const openModalMessage = () => setVisible(true)

    const footerBtn = (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px 10px 0',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          onClick={() => {
            closeModal()
          }}
          iconName={<DeclineSapIcon />}
          buttonType={ButtonType.Neutral}
        >
          {t('mailContact.btnExit')}
        </Button>
      </div>
    )
    return (
      <Modal
        centered
        width={500}
        // maskClosable
        // footer={
        // <Footer ref={footerRef} visible>
        //   <Button
        //     onClick={() => {
        //       closeModal()
        //     }}
        //     iconName={<DeclineSapIcon />}
        //     buttonType={ButtonType.Neutral}
        //   >
        //     {t('mailContact.btnExit')}
        //   </Button>
        // </Footer>
        // }
        footer={footerBtn}
        visible={visible}
        onCancel={closeModal}
        title={currentMessage?.fullName}
        // wrapClassName='category_modal'
      >
        <div>
          <Form
            form={form}
            layout={FormLayout.Vertical}
            className='mail-contact-list'
          >
            <Form.Item name='phoneNumber'>
              <p>
                <span className='text-title'>
                  {t('mailContact.textPhone')}
                  {': '}
                </span>

                {currentMessage?.phoneNumber}
              </p>
            </Form.Item>
            <Form.Item name='email'>
              <p>
                <span className='text-title'>
                  {t('mailContact.textEmail')}
                  {': '}
                </span>
                {currentMessage?.email}
              </p>
            </Form.Item>
            <Form.Item name='subject'>
              <p>
                <span className='text-title'>
                  {t('mailContact.textSubject')}
                  {': '}
                </span>
                {currentMessage?.subject}
              </p>
            </Form.Item>
            <Form.Item name='topic'>
              <p>
                <span className='text-title'>
                  {t('mailContact.textTopic')}
                  {': '}
                </span>
                {currentMessage?.topic}
              </p>
            </Form.Item>
            <Form.Item name='service'>
              <p>
                <span className='text-title'>
                  {t('mailContact.textService')}
                  {': '}
                </span>
                {currentMessage?.service?.title}
              </p>
            </Form.Item>
            <Form.Item name='message'>
              <p>
                <span className='text-title'>
                  {t('mailContact.textMessage')}
                  {': '}
                </span>
                <span>{currentMessage?.message}</span>
              </p>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    )
  }
)

MessageModal.displayName = 'MessageModal'

export default MessageModal
