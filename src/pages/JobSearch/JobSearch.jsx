import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../../common/Spinner/Spinner'
import { userData } from '../userSlice'

const JobSearch = () => {
    const userRdxData = useSelector(userData)

  return (
    <div className='jobvacancies-container'>
      <div className='title-container'>
        <h1>Ofertas de empleo</h1>
        
      </div>
    </div>
  )
}

export default JobSearch
