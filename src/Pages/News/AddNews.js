import React, { useState } from "react";
import Header from "../../Common/Header";
import Sidebar from "../../Common/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddNews() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        newsPic: "",
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setData({
            ...data,
            newsPic: file,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("newsPic", data.newsPic);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_MONGO_BASE_URL}/addNews`,
                formData
            );
            console.log(response.data);
            toast.success("News Added Successfully", {
                autoClose: 1500,
                onClose: () => navigate("/viewNews"),
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
                                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-group mb-3">
                                        <div className="form-group mb-3">
                                            <label htmlFor="customFile">Add News Image</label>
                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="custom-file-input"
                                                    id="customFile"
                                                    onChange={handleFileChange}
                                                    name="newsPic"
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
    )
}

export default AddNews