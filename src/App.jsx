import { useState, useEffect } from 'react'
import HomePage from './components/HomePage'
import ImmersiveAdvertisingPage from './components/ImmersiveAdvertisingPage'
import IndustrialSolutionsPage from './components/IndustrialSolutionsPage'
import AISolutionsPage from './components/AISolutionsPage'
import JewellerySolutionsPage from './components/JewellerySolutionsPage'
import ProductPage from './components/ProductPage'
import './App.css'


function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  if (currentPath === '/jewellery-solutions') {
    return <JewellerySolutionsPage />
  }

  if (currentPath === '/immersive-advertising') {
    return <ImmersiveAdvertisingPage />
  }

  if (currentPath === '/immersive-industrial') {
    return <IndustrialSolutionsPage />
  }

  if (currentPath === '/ai-solutions') {
    return <AISolutionsPage />
  }

  if (currentPath === '/product') {
    return <ProductPage />
  }

  return <HomePage />
}

export default App