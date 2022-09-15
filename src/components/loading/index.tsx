import { Preloader } from '@digihcs/innos-ui3'
import React from 'react'

const Loading: React.FC = () => (
  <div
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: 0.7
    }}
  >
    <Preloader size={50} color='lemonchiffon' />
  </div>
)

export default Loading
