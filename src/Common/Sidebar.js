import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <>
            <aside
                className="sidebar-left border-right bg-white shadow"
                id="leftSidebar"
                data-simplebar
            >
                <Link

                    className="btn collapseSidebar toggle-btn d-lg-none text-muted ml-2 mt-3"
                    data-toggle="toggle"
                >
                    <i className="fe fe-x">
                        <span className="sr-only" />
                    </i>
                </Link>
                <nav className="vertnav navbar navbar-light">
                    {/* nav bar */}
                    <div className="w-100 mb-4 d-flex">
                        <Link
                            className="navbar-brand mx-auto mt-2 flex-fill text-center"
                            to={"/"}
                        >
                            
                        <img src="./logos.png" alt="logo" className="w-50"/>
                        </Link>
                    </div>
                    <ul className="navbar-nav flex-fill w-100 mb-2">
                        <li className="nav-item dropdown">
                            <Link class="nav-link" to={"/"}>
                                <i className="fe fe-home fe-16" />
                                <span className="ml-3 item-text">Dashboard</span>
                            </Link>
                        </li>
                    </ul>
                    <p className="text-muted nav-heading mt-4 mb-1">
                        <span>Management</span>
                    </p>
                    <ul className="navbar-nav flex-fill w-100 mb-2">
                        <li class="nav-item w-100">
                            <Link class="nav-link" to={"/viewActivities"}>
                                <i class="fe fe-calendar fe-16"></i>
                                <span class="ml-3 item-text">Activities</span>
                            </Link>
                        </li>
                        <li class="nav-item w-100">
                            <Link class="nav-link" to={"/viewDepartment"}>
                                <i className="fe fe-layers fe-16" />
                                <span class="ml-3 item-text">Department</span>
                            </Link>
                        </li>
                        <li class="nav-item w-100">
                            <Link class="nav-link" to={"/viewEvents"}>
                                <i className="fe fe-credit-card fe-16" />
                                <span class="ml-3 item-text">Events</span>
                            </Link>
                        </li>
                        <li class="nav-item w-100">
                            <Link class="nav-link" to={"/viewFacilities"}>
                                <i className="fe fe-grid fe-16" />
                                <span class="ml-3 item-text">Facilities</span>
                            </Link>
                        </li>
                        <li class="nav-item w-100">
                            <Link class="nav-link" to={"/viewGalleryData"}>
                                <i className="fe fe-pie-chart fe-16" />
                                <span class="ml-3 item-text">Gallery</span>
                            </Link>
                        </li>
                        <li class="nav-item w-100">
                            <Link class="nav-link" to={"/viewNews"}>
                                <i className="fe fe-book fe-16" />
                                <span class="ml-3 item-text">News</span>
                            </Link>
                        </li>
                        <li class="nav-item w-100">
                            <Link class="nav-link" to={"/viewStaff"}>
                                <i className="fe fe-file fe-16" />
                                <span class="ml-3 item-text">Staff</span>
                            </Link>
                        </li>
                        <li class="nav-item w-100">
                            <Link class="nav-link" to={"/viewContactus"}>
                                <i className="fe fe-shield fe-16" />
                                <span class="ml-3 item-text">Contact Us</span>
                            </Link>
                        </li>
                        <li class="nav-item w-100">
                            <Link class="nav-link" to={"/viewAdmissionInquiry"}>
                                <i className="fe fe-layout fe-16" />
                                <span class="ml-3 item-text">Admission Inqury</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;
