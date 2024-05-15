import React, { useState } from "react";
import Header from "../../Common/Header";
import Sidebar from "../../Common/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddDepartment() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        departmentName: "",
        details: "",
        image: "",
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
            image: file,
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
                `${process.env.REACT_APP_MONGO_BASE_URL}/addDepartment`,
                formData
            );
            console.log(response.data);
            toast.success("Department Added Successfully", {
                autoClose: 1500,
                onClose: () => navigate("/viewDepartment"),
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
                                    <strong className="card-title">Add Department</strong>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="deptName">Department Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="deptName"
                                                    placeholder="Department Name"
                                                    name="departmentName"
                                                    value={data.departmentName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="deptPic">Department Picture</label>
                                                <div className="custom-file">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="custom-file-input"
                                                        id="deptPic"
                                                        name="image"
                                                        onChange={handleFileChange}
                                                        required
                                                    />
                                                    <label
                                                        className="custom-file-label"
                                                        htmlFor="deptPic"
                                                    >
                                                        Choose file
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="deptDetail">Desctiption</label>
                                            <textarea
                                                className="form-control"
                                                id="deptDetail"
                                                rows="3"
                                                placeholder="Add Description about the department"
                                                name="details"
                                                value={data.details}
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
    );
}

export default AddDepartment;
