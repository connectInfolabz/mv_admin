import React, { useState } from "react";
import Header from "../../Common/Header";
import Sidebar from "../../Common/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddFacilities() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        facilityName: "",
        facilityDesc: "",
        facilityPics: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length <= 3) {
            setData((prevData) => ({
                ...prevData,
                facilityPics: files,
            }));
        } else {
            toast.error("You can only upload up to 3 images", {
                autoClose: 1000,
            });
            data.facilityPics = [];
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (data.facilityPics.length === 0) {
            toast.error("Please select at least one image", {
                autoClose: 1000,
            });
            return;
        }


        data.facilityPics.forEach((file, index) => {
            formData.append(`facilityPics`, file);
        });

        for (const key in data) {
            if (key !== "facilityPics") {
                formData.append(key, data[key]);
            }
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_MONGO_BASE_URL}/addFacility`,
                formData
            );
            console.log(response.data);
            toast.success("Facility Added Successfully", {
                autoClose: 1500,
                onClose: () => navigate("/viewFacilities"),
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
                                    <strong className="card-title">Add Facility</strong>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="facilityName">Facility Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="facilityName"
                                                    placeholder="Facility Name"
                                                    name="facilityName"
                                                    value={data.facilityName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="facilityPics">Facility Pictures</label>
                                                <div className="custom-file">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="custom-file-input"
                                                        id="facilityPics"
                                                        name="facilityPics"
                                                        onChange={handleFileChange}
                                                        required
                                                        multiple
                                                    />
                                                    <label
                                                        className="custom-file-label"
                                                        htmlFor="facilityPics"
                                                    >
                                                        Choose files
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="facilityDesc">Desctiption</label>
                                            <textarea
                                                className="form-control"
                                                id="facilityDesc"
                                                rows="3"
                                                placeholder="Add Description about the facility"
                                                name="facilityDesc"
                                                value={data.facilityDesc}
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

export default AddFacilities;
