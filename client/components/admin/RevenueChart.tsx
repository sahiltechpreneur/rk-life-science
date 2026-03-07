"use client"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js"

import { Bar } from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export default function RevenueChart() {

    const data = {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun"
        ],
        datasets: [
            {
                label: "Revenue",
                data: [12000, 19000, 8000, 15000, 22000, 30000],
                backgroundColor: "#22c55e"
            }
        ]
    }

    return (

        <div className="bg-white p-6 rounded shadow">

            <h3 className="text-lg font-bold mb-4">
                Revenue Analytics
            </h3>

            <Bar data={data} />

        </div>

    )

}