import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((data) => {
            return {
                ...data,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${process.env.REACT_APP_MONGO_BASE_URL}/login`, data)
            console.log(response.data)
            if (response.data.success) {
                window.location.reload(false)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message, {
                autoClose: 1000,
            })
        }

    }
    return (
        <div className="wrapper vh-100">
            <div className="row align-items-center h-100">
                <form onSubmit={handleSubmit} className="col-lg-3 col-md-4 col-10 mx-auto text-center">
                    <div
                        className="navbar-brand mx-auto mt-2 flex-fill text-center"
                    >
                        <img src="./logos.png" alt="logo" className="w-50"/>
                    </div>
                    <h1 className="h6 mb-3">Sign in</h1>
                    <div className="form-group">
                        <label htmlFor="inputEmail" className="sr-only">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="inputEmail"
                            className="form-control form-control-lg"
                            placeholder="Email address"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            required
                            autofocus
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword" className="sr-only">
                            Password
                        </label>
                        <input
                            type="password"
                            id="inputPassword"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">
                        Login
                    </button>
                    <p className="mt-5 mb-3 text-muted">© 2024</p>
                </form>
            </div>
        </div>
    );
}

export default Login;
