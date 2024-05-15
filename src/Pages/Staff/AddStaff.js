import React, { useState } from "react";
import Header from "../../Common/Header";
import Sidebar from "../../Common/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddStaff() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        staffPic: "",
        designation: "",
        about: "",
        dateOfJoining: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData({
            ...data,
            staffPic: file,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_MONGO_BASE_URL}/addStaff`,
                formData
            );
            console.log(response.data);
            toast.success("Member Added Successfully", {
                autoClose: 1500,
                onClose: () => navigate("/viewStaff"),
            });
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message, {
                autoClose: 1500,
            });
        }
    };

    return (
        <>
            <Header />
            <Sidebar />
            <main role="main" className="main-content">
                <div className="container-fluid">
                    <div className="row my-4 d-flex justify-content-center align-items-center w-100">
                        <div className="card-deck">
                            <div className="card shadow mb-4">
                                <div className="card-header">
                                    <strong className="card-title">Add Staff Member</strong>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="name">Member Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="Member Name"
                                                    name="name"
                                                    value={data.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="staffPic">Member Picture</label>
                                                <div className="custom-file">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="custom-file-input"
                                                        id="staffPic"
                                                        name="staffPic"
                                                        onChange={handleFileChange}
                                                        required
                                                    />
                                                    <label
                                                        className="custom-file-label"
                                                        htmlFor="staffPic"
                                                    >
                                                        Choose file
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="designation">Member Designation</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="designation"
                                                    placeholder="ex. Teacher etc."
                                                    name="designation"
                                                    value={data.designation}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="dateOfJoining">Date of Joining</label>
                                                <div className="input-group">
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="dateOfJoining"
                                                        name="dateOfJoining"
                                                        max={new Date().toISOString().split("T")[0]}
                                                        value={data.dateOfJoining}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="deptDetail">About Member</label>
                                            <textarea
                                                className="form-control"
                                                id="deptDetail"
                                                rows="3"
                                                placeholder="Add Description about the member"
                                                name="about"
                                                value={data.about}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AddStaff