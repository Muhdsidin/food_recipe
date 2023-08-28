import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function ProtectHome() {
    const navigate = useNavigate()
  useEffect(()=>{
    const data = localStorage.getItem("token")
    if(!data){
        return navigate("/login")
    }
  },[])
  
    return<Outlet />
}

export default ProtectHome
