import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../userSlice'
import { getVacancies } from '../../services/apiCalls'
import { useState } from 'react'
import ButtonIcon from '../../common/ButtonIcon/ButtonIcon'
import {AiOutlineLogin, AiOutlineArrowRight} from 'react-icons/ai'

import './Home.css'
const Home = () => {
  const userRdxData = useSelector(userData)
  const [vacancies, setVacancies] = useState([])

  useEffect(()=>{
    if(userRdxData.user.interests) {
      getVacancies(1, 10, userRdxData.user.interests.join('|'))
      .then((res) => {
        setVacancies(res.data.data);
      })
      .catch((error) => console.log(error));
    } else {
      getVacancies(1, 10, "")
      .then((res) => {
        setVacancies(res.data.data);
      })
      .catch((error) => console.log(error));
    }
  }, [])
  return (
    <div className='flex f-column home-container'>
      <h1>Bienvenid@ a Connect-arte!</h1>
      <p>Aquí te dejo algunas ofertas de empleo, que pueden interesarte!</p>
      {!userRdxData.user.username ?
      <p>Inicia sesión o registrate para poder aplicar a ellas</p> :
      <p>Añade más palabras a tu lista de intereses para tener ofertas más personalizadas</p>
      }
      <div className='vacancies-container'>
      {vacancies.map((vacancie, index) => {
        return (
          <div key={index} className='vacancie'>
          <div className='info-vacancie'>
          <p>{vacancie.charge_name} - {vacancie.location}</p>
          {!userRdxData.user.username ?
            <p> {vacancie.created_by.username}</p> :
            <a href={`user/${vacancie.created_by.username}`}>
              <p> {vacancie.created_by.username}</p>
            </a>
          }
          </div>
          <div className='btn-container'>
            {!userRdxData.user.username ?
            <>
            <ButtonIcon path={'login'} ReactIcon={AiOutlineLogin} text={'Inicia sesión'}/>
            </>:
            <>
            <ButtonIcon path={`vacancieDetail/${vacancie._id}`} ReactIcon={AiOutlineArrowRight} text={'Ir a la oferta'}/>
            </>
            }
          </div>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default Home
