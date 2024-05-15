import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EditCredentials() {
    const [data, setData] = useState({
        oldEmail: "",
        newEmail: "",
        oldPassword: "",
        newPassword: "",
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
    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_MONGO_BASE_URL}/logout`);
            window.location.reload(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${process.env.REACT_APP_MONGO_BASE_URL}/updateCredentials`, data)
            if (response.data.success) {
                handleLogout();
                toast.success(response.data.message, {
                    autoClose: 1000,
                    onClose: () => window.location.reload(false),
                })
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response.data.message, {
                autoClose: 1000,
            })
        }
    }

    return (
        <>
            <div className="wrapper vh-100">
                <div className="row align-items-center h-100 ">
                    <form onSubmit={handleSubmit} className="col-lg-4 col-md-4 col-10 mx-auto text-center">
                        <div
                            className="navbar-brand mx-auto mt-2 flex-fill text-center"
                        >
                            <svg
                                version="1.1"
                                id="logo"
                                className="navbar-brand-img brand-md"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 120 120"
                                xmlSpace="preserve"
                            >
                                <g>
                                    <polygon className="st0" points="78,105 15,105 24,87 87,87 	" />
                                    <polygon className="st0" points="96,69 33,69 42,51 105,51 	" />
                                    <polygon className="st0" points="78,33 15,33 24,15 87,15 	" />
                                </g>
                            </svg>
                        </div>
                        <h1 className="h6 mb-3">Change Credentials</h1>
                        <div className="row">
                            <div className="form-group col-lg-6">
                                <label htmlFor="inputEmail1" className="sr-only">
                                    Old Email address
                                </label>
                                <input
                                    type="email"
                                    id="inputEmail1"
                                    className="form-control form-control-lg"
                                    placeholder="Old Email address"
                                    name="oldEmail"
                                    value={data.oldEmail}
                                    onChange={handleChange}
                                    required
                                    autofocus
                                />
                            </div>
                            <div className="form-group col-lg-6">
                                <label htmlFor="inputEmail2" className="sr-only">
                                    New Email address
                                </label>
                                <input
                                    type="email"
                                    id="inputEmail2"
                                    className="form-control form-control-lg"
                                    placeholder="New Email address"
                                    name="newEmail"
                                    value={data.newEmail}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-lg-6">
                                <label htmlFor="inputPassword1" className="sr-only">
                                    Old Password
                                </label>
                                <input
                                    type="password"
                                    id="inputPassword1"
                                    className="form-control form-control-lg"
                                    placeholder="Old Password"
                                    name="oldPassword"
                                    value={data.oldPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-lg-6">
                                <label htmlFor="inputPassword2" className="sr-only">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="inputPassword2"
                                    className="form-control form-control-lg"
                                    placeholder="New Password"
                                    name="newPassword"
                                    value={data.newPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">
                            Update Credentials
                        </button>
                        <p className="mt-5 mb-3 text-muted">© 2024</p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditCredentials