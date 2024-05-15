import React, { useEffect, useState } from "react";
import Header from "../../Common/Header";
import Sidebar from "../../Common/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ViewStaff() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_MONGO_BASE_URL}/getStaff`);
            const data = response.data.staff;
            setData(data);
        } catch (error) {
            setData([]);
            console.error(error);
            toast.error(error.response.data.message, {
                autoClose: 1500,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (staffId) => {
        try {
            await axios.post(`${process.env.REACT_APP_MONGO_BASE_URL}/deleteStaff`, {
                staffId,
            });
            toast.success("Activity Deleted Successfully!!", {
                autoClose: 1500,
            });
            fetchData();
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 1500,
            });
        }
    };

    const confirmDelete = (staffId) => {
        const deleteToastId = toast(
            <div>
                <p>Are you sure you want to delete this staff member?</p>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        toast.dismiss(deleteToastId); // Dismiss the confirmation toast
                        handleDelete(staffId); // Handle delete operation
                    }}
                >
                    Confirm
                </button>
                <span className="mx-2"> </span>
                <button
                    className="btn btn-secondary ms-2"
                    onClick={() => toast.dismiss(deleteToastId)}
                >
                    Cancel
                </button>
            </div>,
            { autoClose: false, closeButton: false, position: "top-center" }
        );
    };

    return (
        <>
            <Header />
            <Sidebar />
            <main role="main" className="main-content">
                <div className="container-fluid">
                    <Link to={"/addStaff"} className="btn btn-primary">
                        Add Staff Member
                    </Link>
                    <div className="row my-4">
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 150px)', minWidth: '100%' }}>
                                <div className="text-center">
                                    <div className="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        ) : data ? (
                            data.map((dataItem, index) => (
                                <div className="col-6 col-lg-3" key={dataItem._id}>
                                    <div className="card shadow mb-4">
                                        <div className="card-body">
                                            <div className="chart-widget mb-4">
                                                <img
                                                    src={`${process.env.REACT_APP_MONGO_BASE_URL}/images/staffPics/${dataItem.staffPic}`}
                                                    className="img-fluid"
                                                    style={{ height: "200px", width: "100%", objectFit: "cover" }}
                                                    alt="staff"
                                                />
                                            </div>
                                            <h5 className="card-title">{dataItem.name}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{dataItem.designation}</h6>
                                            <hr />
                                            <p>Date of Joining: <br /> <strong>{new Date(dataItem.dateOfJoining).toDateString()}</strong> </p>
                                            <div className=" text-center">
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => confirmDelete(dataItem._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className=" h3 text-center">No activities found</p>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export default ViewStaff