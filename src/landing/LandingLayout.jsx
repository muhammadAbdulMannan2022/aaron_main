import React from 'react'

import Navbar from './sections/NavBar/Navbar'
import { Hero } from './sections/hero/Hero'
import { Features } from './sections/features/Features'
import HowToImprove from './sections/HowToImprove/HowToImprove'
import Pricing from './sections/priceing/Priceing'
import { Testimonials } from './sections/testimonials/Testimonials'
import SubscribeS from './sections/SubButton/SubscribeS'
import { FAQ } from './sections/Faq/FAQ'
import { Footer } from './sections/footer/Footer'


export default function LandingLayout() {
  return (
    <div className='bg-main-bg'>
      <Navbar />
      <Hero />
      <Features />
      <HowToImprove />
      <Pricing />
      <Testimonials />
      <SubscribeS />
      <FAQ />
      <Footer />
    </div>
  )
}
