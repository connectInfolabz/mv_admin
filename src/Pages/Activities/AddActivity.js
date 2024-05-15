import React, { useState } from "react";
import Header from "../../Common/Header";
import Sidebar from "../../Common/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddActivity() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        activityVideo: "", 
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setData({
            ...data,
            activityVideo: file,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("activityVideo", data.activityVideo);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_MONGO_BASE_URL}/addActivity`,
                formData
            );
            console.log(response.data);
            toast.success("Activity Added Successfully", {
                autoClose: 1500,
                onClose: () => navigate("/viewActivities"),
            });
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 1500,
            })
            console.error(error);
        }
    };
    return (
        <>
            <Header />
            <Sidebar />
            <main role="main" className="main-content">
                <div className="container-fluid">
                    <div className="row my-4">
                        <div className="col-md-12 mb-4">
                            <div className="card shadow">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit} className="form-group mb-3">
                                        <div className="form-group mb-3">
                                            <label htmlFor="customFile">Add Video of Activity</label>
                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    accept="video/*"
                                                    className="custom-file-input"
                                                    id="customFile"
                                                    onChange={handleFileChange}
                                                    name="activityVideo"
                                                    required
                                                />
                                                <label
                                                    className="custom-file-label"
                                                    htmlFor="customFile"
                                                >
                                                    Choose file
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-group mb-3">
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        </div>
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

export default AddActivity;
