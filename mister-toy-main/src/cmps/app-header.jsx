import { Link, NavLink } from 'react-router-dom'


export function AppHeader() {

    return (
        <header className="app-header main-layout full">
            <Link className="logo" to="/">
                <div>Toys!</div>
            </Link>
            <nav className='nav-links'>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
        </header>
    )
}
