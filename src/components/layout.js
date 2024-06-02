import { Link } from "react-router-dom"

export function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom box-shadow">
            <div className="container">
                <Link className="navbar-brand" to="/">Сотрудники</Link>

                <Link className="navbar-brand" to="/projects">Проекты</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    {/* <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                    </ul> */}
                </div>
            </div>
        </nav>
    )
}

export function Footer() {

    return (
        <div className="text-center p-4 border-top">
            Sibers
        </div>
    )
}
