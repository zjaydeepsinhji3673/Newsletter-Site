import React from 'react'
import { Navigate} from 'react-router-dom'

export default function Protectedadmin({children}) {

  if(!localStorage.getItem('User_model')){
    return < Navigate to={'/admin/'} replace />
  }

  return children;
}
