import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { userData } from '../userSlice'
import { useState } from 'react'
import { useEffect } from 'react'
import { getContriesList } from '../../services/apiCalls'

const EditProfileInfo = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userRdxData = useSelector(userData) 

    const [user, setUser] = useState({})
    const [credentials, setCredentials] = useState({
        name: user.name,
        email: user.email,
        username: user.username,
        description: user.description,
        location: user.location
    })

    useEffect(()=> {
        getContriesList().then(res=>console.log(res))
    },[])
  return (
    <div className='flex align-c justify-c'>
        {/* <h1>Change your profile info</h1> */}
      <label>
        <p></p>
      </label>
    </div>
  )
}

export default EditProfileInfo
