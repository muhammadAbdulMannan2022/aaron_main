import React from 'react'

import Navbar from './sections/NavBar/Navbar'
import { Hero } from './sections/hero/Hero'
import { Features } from './sections/features/Features'
import HowToImprove from './sections/HowToImprove/HowToImprove'
import Pricing from './sections/priceing/Priceing'
import { Testimonials } from './sections/testimonials/Testimonials'


export default function LandingLayout() {
  return (
    <div className='bg-main-bg'>
      <Navbar />
      <Hero />
      <Features />
      <HowToImprove />
      <Pricing />
      <Testimonials />
    </div>
  )
}
