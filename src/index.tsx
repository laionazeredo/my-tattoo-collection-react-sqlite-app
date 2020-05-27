// my_tattoo_collection/src/index.tsx

// Import deps
import React from 'react'
import { render } from 'react-dom'

// Import components
import { Tattoos } from './components/tattoos_collection'

// Import styles
import './css/styles.css'

// Find div container
const rootElement = document.getElementById('root')

// Render tattoos component in the DOM
render(<Tattoos />, rootElement)