import React, { createContext, useState } from 'react'

export const UserStore = createContext([])

export const UserStoreProvider = ({ children }: any) => {
  const [user, setUser] = useState(null)

  return <UserStore.Provider value={[user, setUser]}>{children}</UserStore.Provider>
}
