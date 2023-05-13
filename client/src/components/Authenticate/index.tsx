import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { UserStore } from '../../stores'

const Authenticate = (props: any) => {
  const { options } = props
  const { mustLogin } = options
  const [user] = useContext(UserStore)

  if (mustLogin) {
    if (!user) {
      return <Navigate to='/' />
    }
  } else {
    if (user) {
      return <Navigate to='/' />
    }
  }

  return <>{props.children}</>
}

export default Authenticate
