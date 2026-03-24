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

interface RevenueChartProps {
    labels: string[];
    dataset: number[];
}

export default function RevenueChart({ labels, dataset }: RevenueChartProps) {

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Revenue (NPR)",
                data: dataset,
                backgroundColor: "#22c55e",
                borderRadius: 4
            }
        ]
    }

    return (

        <div className="bg-white p-6 rounded shadow relative w-full h-full">

            <h3 className="text-lg font-bold mb-4">
                Revenue Analytics
            </h3>

            <Bar 
                data={data} 
                options={{
                    responsive: true,
                    maintainAspectRatio: false
                }}
            />

        </div>

    )

}