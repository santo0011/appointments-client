import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import LogoBar from '../../components/layout/LogoBar';
import { useDispatch } from 'react-redux';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement, RadialLinearScale } from 'chart.js';
import { Line, Bar, Pie, Doughnut, Radar, Bubble } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement, RadialLinearScale
)

const AdminDashboard = () => {
    const dispatch = useDispatch();

    const [sideBar, setSideBar] = useState('')

    // handleSideBar
    const handleSideBar = (bar) => {
        const header = document.getElementById('changeHeader');

        if (header) {
            header.classList.toggle('nav_open', bar !== true);
        }
        setSideBar(bar)
    }

    // Line Chart
    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Monthly Sales',
                data: [34, 65, 34, 65, 34, 34, 34, 56, 23, 67, 23, 45],
                fill: false,
                borderColor: '#376799',
                borderWidth: 2,
            },
            {
                label: 'Monthly Sales',
                data: [78, 32, 34, 54, 65, 34, 54, 21, 54, 43, 45, 43],
                fill: false,
                borderColor: '#ff4f51',
                borderWidth: 2,
            },
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // Bar Chart
    const barChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 39, 80, 31, 56, 55, 40, 70, 65, 20, 75, 60],
                backgroundColor: 'rgb(0, 110, 255)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    };

    // pieData
    const pieData = {
        labels: ['Fruits', 'Vegetables', 'Grains'],
        datasets: [
            {
                label: 'Food Groups',
                data: [30, 40, 30],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
            },
        ],
    };

    // doughnutData
    const doughnutData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [300, 50, 100, 40, 120],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }
        ]
    };


    // raderData
    const raderData = {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [
            {
                label: 'My First Radar Dataset',
                data: [65, 59, 90, 81, 56, 55, 40],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
            }
        ]
    };

    // bubbleData
    const bubbleData = {
        labels: 'Bubble Chart',
        datasets: [
            {
                label: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                data: [
                    { x: 20, y: 30, r: 15 },
                    { x: 40, y: 10, r: 10 },
                    { x: 15, y: 50, r: 20 },
                    { x: 30, y: 25, r: 25 },
                    { x: 10, y: 20, r: 30 }
                ]
            }
        ]
    };



    return (
        <div className={`wrapper ${sideBar ? 'sidebar_minimize' : ''}`}>
            <div className="main-header">
                <LogoBar onIcon={handleSideBar} />
                <Navbar />
            </div>
            <Sidebar />
            <div className="main-panel">
                <div className="content">
                    <div className="page-inner">

                        <div className="row">
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">Line Chart</div>
                                    </div>
                                    <div className="card-body">
                                        <Line data={lineChartData} options={options} height={210} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">Bar Chart</div>
                                    </div>
                                    <div className="card-body">
                                        <Bar data={barChartData} options={options} height={210} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">Pie Chart</div>
                                    </div>
                                    <div className="card-body">
                                        <Pie data={pieData} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">Doughnut Chart</div>
                                    </div>
                                    <div className="card-body">
                                        <Doughnut data={doughnutData} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">Radar Chart</div>
                                    </div>
                                    <div className="card-body">
                                        <Radar data={raderData} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">Bubble Chart</div>
                                    </div>
                                    <div className="card-body">
                                        <Bubble data={bubbleData} height={300} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">Multiple Line Chart</div>
                                    </div>
                                    <div className="card-body">

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">Multiple Bar Chart</div>
                                    </div>
                                    <div className="card-body">

                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}


export default AdminDashboard;