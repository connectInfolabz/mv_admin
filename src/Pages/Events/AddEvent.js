import React, { useState } from "react";
import Header from "../../Common/Header";
import Sidebar from "../../Common/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddEvent() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        eventName: "",
        eventDesc: "",
        dateOfEvent: "",
        eventImgs: [],
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
        if (files.length <= 5) {
            setData((prevData) => ({
                ...prevData,
                eventImgs: files,
            }));
        } else {
            toast.error("You can only upload up to 5 images", {
                autoClose: 1000,
            })
            data.eventImgs = [];
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.eventImgs.length === 0) {
            toast.error("Please select at least one image", {
                autoClose: 1000,
            });
            return;
        }

        const formData = new FormData();

        data.eventImgs.forEach((file, index) => {
            formData.append(`eventImgs`, file);
        });

        for (const key in data) {
            if (key !== "eventImgs") {
                formData.append(key, data[key]);
            }
        }
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_MONGO_BASE_URL}/addEvent`,
                formData
            );
            console.log(response.data);
            toast.success("Event Added Successfully", {
                autoClose: 1500,
                onClose: () => navigate("/viewEvents"),
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
                                    <strong className="card-title">Add Event</strong>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="eventName">Event Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="eventName"
                                                    placeholder="Event Name"
                                                    name="eventName"
                                                    value={data.eventName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="eventPic">Event Pictures</label>
                                                <div className="custom-file">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="custom-file-input"
                                                        id="eventPic"
                                                        name="eventImgs"
                                                        onChange={handleFileChange}
                                                        multiple
                                                        required
                                                    />
                                                    <label
                                                        className="custom-file-label"
                                                        htmlFor="eventPic"
                                                    >
                                                        Choose files
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="eventDesc">Desctiption</label>
                                            <textarea
                                                className="form-control"
                                                id="eventDesc"
                                                rows="3"
                                                placeholder="Add Description about the department"
                                                name="eventDesc"
                                                value={data.eventDesc}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="dateOfEvent">Date of Event</label>
                                            <div className="input-group">
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="dateOfEvent"
                                                    name="dateOfEvent"
                                                    value={data.dateOfEvent}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
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

export default AddEvent;
