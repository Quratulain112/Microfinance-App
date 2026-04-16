import React from 'react'
import HeroSec from '../components/Layout/HeroSec'
import Categories from '../components/Layout/Categories'
import LoanCalculator from '../components/Layout/Calculator'
import About from '../components/Layout/About'
import Footer from '../components/Layout/Footer'

const HomePage = () => {
  return (
    <>
      <HeroSec />
      <Categories />
      <LoanCalculator />
      <About />
    </>
  )
}

export default HomePage