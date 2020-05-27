// my_tattoo_collection/src/components/tattoos_collection.tsx

// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Import components
import { TattoosList } from './tattoos_list'

// Import styles
import './../css/tattoos_collection.css'

// Create tattoos component
export const Tattoos = () => {
  // Prepare states
  const [reference, setReference] = useState('')
  const [title, setTitle] = useState('')
  const [wheniwant, setWheniwant] = useState('')
  const [desirelevel, setDesireLevel] = useState('')
  const [tattoos, setTattoos] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch all tattoos on initial render
  useEffect(() => {
    fetchtattoos()
  }, [])

  // Fetch all tattoos
  const fetchtattoos = async () => {
    // Send GET request to 'tattoos/all' endpoint
    axios
      .get('http://localhost:4001/tattoos/all')
      .then(response => {
        // Update the tattoos state
        setTattoos(response.data)
        // Update loading state
        setLoading(false)
      })
      .catch(error => console.error(`There was an error retrieving the tattoo list: ${error}`))
  }

  // Reset all input fields
  const handleInputsReset = () => {
    setReference('')
    setTitle('')
    setWheniwant('')
    setDesireLevel('')
  }

  // Create new tattoo
  const handleTattooCreate = () => {
    // Send POST request to 'tattoos/create' endpoint
    axios
      .post('http://localhost:4001/tattoos/create', {
        reference: reference,
        title: title,
        wheniwant: wheniwant,
        desirelevel: desirelevel
      })
      .then(res => {
        console.log(res.data)
        // Fetch all tattoos to refresh
        // the tattoos on the tattoos list
        fetchtattoos()
      })
      .catch(error => console.error(`There was an error creating the ${title} tattoo: ${error}`))
  }

  // Submit new tattoo
  const handleTattooSubmit = () => {
    // Check if all fields are filled
    if (reference.length > 0 && title.length > 0 && wheniwant.length > 0 && desirelevel.length > 0) {
      // Create new tattoo
      handleTattooCreate()
      console.info(`tattoo ${title} by ${reference} added.`)
      // Reset all input fields
      handleInputsReset()
    }
  }

  // Remove tattoo
  const handleTattooRemove = (id: number, title: string) => {
    // Send PUT request to 'tattoos/delete' endpoint
    axios
      .put('http://localhost:4001/tattoos/delete', { id: id })
      .then(() => {
        console.log(`tattoo ${title} removed.`)
        // Fetch all tattoos to refresh
        // the tattoos on the tattoos list
        fetchtattoos()
      })
      .catch(error => console.error(`There was an error removing the ${title} tattoo: ${error}`))
  }

  // Reset tattoo list (remove all tattoos)
  const handleListReset = () => {
    // Send PUT request to 'tattoos/reset' endpoint
    axios.put('http://localhost:4001/tattoos/reset')
    .then(() => {
      // Fetch all tattoos to refresh
      // the tattoos on the tattoos list
      fetchtattoos()
    })
    .catch(error => console.error(`There was an error resetting the tattoo list: ${error}`))
  }
  return (
    <div className="tattoo-list-wrapper">
      {/* Form for creating new tattoo */}
      <div className="tattoo-list-form">
        <div className="form-wrapper" onSubmit={handleTattooSubmit}>
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="title">Enter title:</label>
              <input className="form-input" type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
            </fieldset>
            <fieldset>
              <label className="form-label" htmlFor="reference">Enter reference:</label>
              <input className="form-input" type="text" id="reference" name="reference" value={reference} onChange={(e) => setReference(e.currentTarget.value)} />
            </fieldset>
          </div>
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="wheniwant">Enter when you intend to make this tattoo:</label>
              <input className="form-input" type="text" id="wheniwant" name="wheniwant" value={wheniwant} onChange={(e) => setWheniwant(e.currentTarget.value)} />
            </fieldset>
            <fieldset>
              <label className="form-label" htmlFor="desirelevel">Enter your Desire Level for this tattoo:</label>
              <input className="form-input" type="text" id="desirelevel" name="desirelevel" value={desirelevel} onChange={(e) => setDesireLevel(e.currentTarget.value)} />
            </fieldset>
          </div>
        </div>
        <button onClick={handleTattooSubmit} className="btn btn-add">Add the tattoo</button>
      </div>
      {/* Render tattoos list component */}
      <TattoosList tattoos={tattoos} loading={loading} handleTattooRemove={handleTattooRemove} />
      {/* Show reset button if list contains at least one tattoo */}
      {tattoos.length > 0 && (
        <button className="btn btn-reset" onClick={handleListReset}>Reset tattoos list.</button>
      )}
    </div>
  )
}