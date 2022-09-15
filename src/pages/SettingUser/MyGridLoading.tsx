import { Preloader } from '@digihcs/innos-ui3'
import { Size } from '@digihcs/util/lib/enums/Size'

const MyGridLoading = () => (
  <div
    style={{
      width: '100%',
      height: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Preloader size={Size.S} />
  </div>
)

export default MyGridLoading
