import React from 'react'
import Birthdate from './Birthdate'
import Address from './Address'
import AboutMe from './AboutMe'
import { useAdmin } from '@/context/AdminProvider'

const PageThree = () => { // display information based on the admin settings
  const {settings} = useAdmin()
  console.log('user admin admin settings:', settings)
  // need to map and choose which ones to dislpay
  return (
    <>
      {settings.birthdate===3 &&
        <Birthdate />
      }
      {settings.address===3 &&
        <Address />
      }
      {settings.aboutme===3 &&
        <AboutMe />
      }
      {/* <Address />
      <AboutMe /> */}
    
    </>
  )
}

export default PageThree