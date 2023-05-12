import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { UserStore } from '../../stores'

const Authenticate = (props: any) => {
  const [user] = useContext(UserStore)

  if (!user) {
    return <Navigate to='/' />
  }

  return <>{props.children}</>
}

export default Authenticate
