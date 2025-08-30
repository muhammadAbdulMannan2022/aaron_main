import React from 'react'

import Navbar from './sections/NavBar/Navbar'
import { Hero } from './sections/hero/Hero'


export default function LandingLayout() {
  return (
    <div className='bg-main-bg'>
      <Navbar />
      <Hero />
    </div>
  )
}
