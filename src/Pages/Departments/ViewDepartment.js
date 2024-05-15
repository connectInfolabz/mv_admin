import React, { useEffect, useState } from "react";
import Header from "../../Common/Header";
import Sidebar from "../../Common/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ViewDepartment() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_MONGO_BASE_URL}/getDepartment`);
            const data = response.data.department;
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

    const handleDelete = async (departmentId) => {
        try {
            await axios.post(`${process.env.REACT_APP_MONGO_BASE_URL}/deleteDepartment`, {
                departmentId,
            });
            toast.success("Department Deleted Successfully!!", {
                autoClose: 1500,
            });
            fetchData();
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 1500,
            });
        }
    };

    const confirmDelete = (departmentId) => {
        console.log(departmentId);
        const deleteToastId = toast(
            <div>
                <p>Are you sure you want to delete this department?</p>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        toast.dismiss(deleteToastId); // Dismiss the confirmation toast
                        handleDelete(departmentId); // Handle delete operation
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
                    <div className="row my-4">
                        <div className="col-md-12 mb-4">
                            <div className="card shadow">
                                <div className="card-header">
                                    <strong className="card-title">Departments</strong>
                                    <Link
                                        className="float-right btn btn-sm btn-primary "
                                        to={"/addDepartment"}
                                    >
                                        Add Department
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <div className="list-group list-group-flush my-n3">
                                        {loading ? (
                                            <div className="text-center">
                                                <div className="spinner-grow mr-3" style={{ width: '3rem', height: '3rem' }} role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>

                                            </div>
                                        ) : data ? (
                                            data.map((dataItem, index) => (
                                                <div className="list-group-item" key={dataItem._id}>
                                                    <div className="row align-items-center">
                                                        <div className="col-auto">
                                                            <img
                                                                alt="department"
                                                                src={`${process.env.REACT_APP_MONGO_BASE_URL}/images/departmentPics/${dataItem.image}`}
                                                                className="rounded"
                                                                width={40}
                                                                height={40}
                                                                style={{ objectFit: "cover" }}
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <small>
                                                                <strong>{dataItem.departmentName}</strong>
                                                            </small>
                                                            <div className="mb-2 text-muted small">
                                                                {dataItem.details}
                                                            </div>
                                                        </div>
                                                        <div className="col-auto pr-0">
                                                            <button className="btn btn-danger" onClick={() => confirmDelete(dataItem._id)}>

                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">No Data Found</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ViewDepartment;
