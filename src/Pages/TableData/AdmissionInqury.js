import React, { useEffect, useState } from "react";
import Header from "../../Common/Header";
import Sidebar from "../../Common/Sidebar";
import DataTable from "react-data-table-component";
import axios from "axios";
import { toast } from "react-toastify";

function AdmissionInqury() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_MONGO_BASE_URL}/getAdmissioninquiry`);
                const addmissionInquiry = response.data.addmissionInquiry.reverse();
                setData(addmissionInquiry);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                toast.error(error.response.data.message, {
                    autoClose: 1000,
                });
                // Handle error
            }
        };
        fetchData();
    }, []);

    const columns = [
        {
            name: "Child Name",
            selector: (row) => row.childName,
            sortable: true,
        },
        {
            name: "DOB",
            selector: (row) => new Date(row.childDOB).toLocaleDateString(),
            sortable: true,
        },
        {
            name: "Class",
            selector: (row) => row.cClass,
            sortable: true,
        },
        {
            name: "Address",
            selector: (row) => row.address,
            sortable: true,
            wrap: true,
        },
        {
            name: "Email",
            selector: (row) => row.parentEmail,
            sortable: true,
            wrap: true,
        },
        {
            name: "Phone",
            selector: (row) => row.parentPhone,
            sortable: true,
            wrap: true,
        },
        {
            name: "Stream",
            selector: (row) => row.stream,
            sortable: true,
            wrap: true,
        },
        {
            name: "Gender",
            selector: (row) => row.gender,
            sortable: true,
            wrap: true,
        },
        {
            name: "Timestamp",
            selector: (row) => new Date(row.timestamp).toLocaleString(),
            sortable: true,
            wrap: true,
        },
    ];

    return (
        <>
            <Header />
            <Sidebar />
            <main role="main" className="main-content">
                <div className="container-fluid">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <DataTable
                            title="Admission Inquiry"
                            columns={columns}
                            data={data}
                            striped
                            highlightOnHover
                            pointerOnHover
                            pagination
                            responsive
                        />
                    )}
                </div>
            </main>
        </>
    )
}

export default AdmissionInqury