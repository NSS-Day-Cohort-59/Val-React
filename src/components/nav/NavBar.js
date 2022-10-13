import { Link } from 'react-router-dom'
import './NavBar.css'

export const NavBar = () => {
  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link" to="/halloween">
          Halloween
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/christmas">
          Christmas
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/thanksgiving">
          Thanksgiving
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/new">
          New Decoration
        </Link>
      </li>
    </ul>
  )
}
