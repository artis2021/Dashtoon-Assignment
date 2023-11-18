import React from 'react'
import './Error.css'
import { Link } from 'react-router-dom'

const Error : React.FC = () => {
  return (
    <div className='Error'>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to='/'>Go back to home</Link>
    </div>
  )
}

export default Error