import { EmployeeSapIcon } from '@digihcs/icons/lib/sap'
import { CommonHisComponent } from '@digihcs/innos-ui3'
import React, { useContext } from 'react'
import { AppConfigContext, AuthContext } from 'src/context'

import './index.less'

const Dashboard: React.FC = () => {
  const { authState } = useContext(AuthContext)
  const { appConfigState } = useContext(AppConfigContext)
  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <div style={{ height: '100%' }} >
        <CommonHisComponent.WelcomePage
          // title={
          //   authState.currentUser?.employee?.chucDanh?.TenChucDanh ||
          //   'Chưa xác định'
          // }
          avatar={<EmployeeSapIcon/> as any}
          name={authState.currentUser?.employee?.TenNhanVien || 'Unknown'}
          className='dashboard-component'
        />
      </div>
      <span
        style={{
          position: 'absolute',
          bottom: 10,
          left: 20,
          fontSize: 14,
          fontWeight: 'bold'
        }}
      >
        {`v${appConfigState?.appInfo?.versionFE}/v${appConfigState?.appInfo?.versionBE}`}
      </span>
    </div>
  )
}

export default Dashboard
