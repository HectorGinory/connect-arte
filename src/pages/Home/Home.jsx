import React from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'

const Home = () => {
  
  const userRdxData = useSelector(userData)

  return (
    <div>
      
    </div>
  )
}

export default Home
