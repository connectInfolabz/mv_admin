import React, { useEffect, useState } from "react";
import Header from "../../Common/Header";
import Sidebar from "../../Common/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ViewActivities() {
    const [data, setData] = useState([]);
    const [activeVideo, setActiveVideo] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {

            const response = await axios.post(`${process.env.REACT_APP_MONGO_BASE_URL}/getActivity`);
            const data = response.data.activity;
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
        const videos = document.querySelectorAll("video");

        const handleVideoPlay = (event) => {
            const currentVideoId = event.target.dataset.id;
            setActiveVideo(currentVideoId);
            videos.forEach((video) => {
                if (video !== event.target && !video.paused) {
                    video.pause(); // Pause other videos if they are playing
                }
            });
        };

        videos.forEach((video) => {
            video.addEventListener("play", handleVideoPlay);
            return () => {
                video.removeEventListener("play", handleVideoPlay);
            };
        });
    }, []);

    const handleDelete = async (videoId) => {
        try {
            await axios.post(`${process.env.REACT_APP_MONGO_BASE_URL}/deleteActivity`, {
                videoId,
            });
            toast.success("Activity Deleted Successfully!!", {
                autoClose: 1500,
            });
            fetchData()
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 1500,
            });
        }
    };

    const confirmDelete = (videoId) => {
        const deleteToastId = toast(
            <div>
                <p>Are you sure you want to delete this Video?</p>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        toast.dismiss(deleteToastId); // Dismiss the confirmation toast
                        handleDelete(videoId); // Handle delete operation
                    }}
                >
                    Confirm
                </button>
                <span className="mx-2">{" "}</span>
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
                    <Link to={"/addActivity"} className="btn btn-primary">
                        Add Activity
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
                        ) : data ? (data.map((dataItem, index) => (
                            <div className="col-6 col-lg-3" key={dataItem._id}>
                                <div className="card shadow mb-4">
                                    <div className="card-body">
                                        <div className="chart-widget mb-4">
                                            <video
                                                width="100%"
                                                height="100%"
                                                controls
                                                autoPlay={activeVideo === dataItem._id}
                                                data-id={dataItem._id}
                                                style={{
                                                    width: "100%",
                                                    height: "200px",
                                                }}
                                            >
                                                <source
                                                    src={`${process.env.REACT_APP_MONGO_BASE_URL}/images/activityPics/${dataItem.activityVideo}`} // Use the base URL for the server
                                                    type="video/mp4"
                                                />
                                            </video>
                                        </div>
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
                        ))) : <p className=" h3 text-center">No activities found</p>}
                    </div>
                </div>
            </main>
        </>
    );
}

export default ViewActivities;
