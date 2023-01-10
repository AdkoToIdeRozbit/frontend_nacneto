import { Link, useMatch, useResolvedPath } from "react-router-dom"
import logo_svg from "../svgs/logo.svg"

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="logo">
        <img src={logo_svg} alt='logo' />
      </Link>
      <ul>
        <CustomLink to="/nacenit">Naceniť</CustomLink>
        <CustomLink to="/info">Informácie</CustomLink>
      </ul>

      <button>Sign up</button>

    </nav>
  )
}

export function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
