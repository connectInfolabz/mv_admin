import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Sidebar from "../Common/Sidebar";
import axios from "axios";

function Home() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_MONGO_BASE_URL}/getCounts`);
            const counts = response.data.counts;
            setData(counts);
        } catch (error) {
            console.error(error);
            setData({});
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Header />
            <Sidebar />
            <main role="main" className="main-content">
                <div className="container-fluid">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="row">
                            <div className="col-md-4 mb-4">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <span className="h2 mb-0">
                                                    {data?.doneEventCount ? data?.doneEventCount : 0}
                                                </span>
                                                <p className="small text-muted mb-0">Events Done</p>
                                            </div>
                                            <div className="col-auto">
                                                <span className="fe fe-32 fe-shopping-bag text-muted mb-0" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <span className="h2 mb-0">
                                                    {data?.admissionInquiryCount
                                                        ? data?.admissionInquiryCount
                                                        : 0}
                                                </span>
                                                <p className="small text-muted mb-0">
                                                    Admission Inquiry
                                                </p>
                                            </div>
                                            <div className="col-auto">
                                                <span className="fe fe-32 fe-clipboard text-muted mb-0" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 mb-4">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <span className="h2 mb-0">
                                                    {data?.contactUsCount ? data?.contactUsCount : 0}
                                                </span>
                                                <p className="small text-muted mb-0">Contat Us</p>
                                            </div>
                                            <div className="col-auto">
                                                <span className="fe fe-32 fe-users text-muted mb-0" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

export default Home;
