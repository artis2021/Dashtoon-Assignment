import React from 'react'
import './Home.css'
import Navbar from './Navbar'
import { IoLogoGithub } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const Home : React.FC = () => {
  return (
    <div className='Home'>
        <Navbar />
        <div className="content">
            <h1>Welcome to <span>Comic Generator</span></h1>
            <p>Comic Generator is a web app that generates comic from a given prompt. It uses the power of <span>HuggingFace API</span> to generate comic from a given prompt. It is a fun project that I made as an assignment for the <span>Dashtoon.</span></p>
            <Link className='button' to="/start">Start comicing</Link>
        </div>

        <Link className='contribute' to="https://github.com/artis2021/Dashtoon-Assignment"><IoLogoGithub className='icon' /> Contribute to this project</Link>
    </div>
  )
}

export default Home