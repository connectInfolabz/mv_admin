import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

function Header() {
    const handleSidebar = () => {
        document.getElementById("body").classList.toggle("collapsed");
    };
    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_MONGO_BASE_URL}/logout`);
            toast.success('Logout Successful', {
                autoClose: 1500,
                onClose: () => window.location.reload(false),
            });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <nav className="topnav navbar navbar-light">
                <button
                    type="button"
                    className="navbar-toggler text-muted mt-2 p-0 mr-3 collapseSidebar"
                    onClick={handleSidebar}
                >
                    <i className="fe fe-menu navbar-toggler-icon" />
                </button>
                <ul className="nav">
                    <li className="nav-item dropdown">
                        <div
                            className="nav-link dropdown-toggle text-muted pr-0"

                            id="navbarDropdownMenuLink"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <span className="avatar avatar-sm mt-2">
                                <img
                                    src="./assets/avatars/face-1.jpg"
                                    alt="..."
                                    className="avatar-img rounded-circle"
                                />
                            </span>
                        </div>
                        <div
                            className="dropdown-menu dropdown-menu-right"
                            aria-labelledby="navbarDropdownMenuLink"
                        >
                            <Link className="dropdown-item" to={"/editCredentials"}>
                                Edit Credentials
                            </Link>
                            <Link className="dropdown-item" onClick={handleLogout}>
                                Logout
                            </Link>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Header;
