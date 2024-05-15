import React, { useEffect, useState } from "react";
import Header from "../../Common/Header";
import Sidebar from "../../Common/Sidebar";
import DataTable from "react-data-table-component";
import axios from "axios";

function ContactUs() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Phone",
            selector: (row) => row.phone,
            sortable: true,
        },
        {
            name: "Subject",
            selector: (row) => row.subject,
            sortable: true,
        },
        {
            name: "Message",
            selector: (row) => <p className="py-1">{row.message}</p>,
            sortable: true,
            wrap: true,
        },
        {
            name: "Timestamp",
            selector: (row) => new Date(row.timestamp).toLocaleString(),
            sortable: true,
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_MONGO_BASE_URL}/getContactUs`);
                const contactUsData = response.data.contactUs;
                setData(contactUsData);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                // Handle error
            }
        };
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
                        <DataTable
                            title="Contact Us"
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
    );
}

export default ContactUs;
