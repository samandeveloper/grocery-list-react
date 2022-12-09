import React, { useEffect } from 'react'

const Alert = ({type,msg, removeAlert,list}) => {  
  //we want to remove any type of alert after 3s so we should use useEffect
  useEffect(()=>{
    const timeout = setTimeout(()=>{
      removeAlert()
    },3000)
    return (()=>clearTimeout(timeout))
  },[list]) //every time it is change i'll get the new set of timeout
  return <p className={`alert alert-${type}`}>{msg}</p>  //Note: we have alert-success and alert-danger className (depends on the type)
}

export default Alert
