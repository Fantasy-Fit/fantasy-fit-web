import React from 'react'
import { useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();

    function getStarted() {
        navigate("/auth");
    }
    return (
        <nav className="container-fluid">
            <header className="p-3 text-bg-dark">
                <div className="container-fluid">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                                <use xlinkHref="#bootstrap"></use>
                            </svg>
                        </a>
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="/" className="nav-link px-2 text-secondary">Home</a></li>
                            <li><a href="#" className="nav-link px-2 text-white">About</a></li>
                            <li><a href="#" className="nav-link px-2 text-white">Features</a></li>
                        </ul>
                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" data-dashlane-rid="09ff1a6b08cc2083" data-form-type="">
                            <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" data-dashlane-rid="1c0fff4ef4502874" data-form-type="" />
                        </form>
                        <div className="text-end">
                            <button type="button" className="btn btn-outline-light me-2" onClick={() => getStarted()}>Login</button>
                            <button type="button" className="btn btn-warning">Sign-up</button>
                        </div>
                    </div>
                </div>
            </header>
        </nav>
    )
}

export default NavBar