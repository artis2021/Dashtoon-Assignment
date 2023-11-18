import { Link } from 'react-router-dom'
import './Navbar.css'
import { IoHomeOutline, IoPlayOutline } from 'react-icons/io5'

const Navbar = () => {
  return (
    <div className='Navbar'>
        <div className="logo">
            <h1>Comic Generator</h1>
        </div>
        <div className="links">
            <Link to="/"> <IoHomeOutline /> Home </Link>
            <Link to="/start"> <IoPlayOutline />Start comicing</Link>
        </div>
    </div>
  )
}

export default Navbar