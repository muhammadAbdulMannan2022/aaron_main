import React from 'react'

import Navbar from './sections/NavBar/Navbar'
import { Hero } from './sections/hero/Hero'
import { Features } from './sections/features/Features'


export default function LandingLayout() {
  return (
    <div className='bg-main-bg'>
      <Navbar />
      <Hero />
      <Features />
    </div>
  )
}
