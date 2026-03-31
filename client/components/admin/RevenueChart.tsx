"use client"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js"

import { Line } from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
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
                borderColor: "#10b981",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                borderWidth: 2,
                pointBackgroundColor: "#10b981",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#10b981",
                tension: 0.4,
                fill: true,
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        return `NPR ${context.raw.toLocaleString()}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value: any) => `NPR ${value.toLocaleString()}`
                }
            }
        }
    }

    return (
        <div className="relative w-full h-full">
            <Line data={data} options={options} />
        </div>
    )
}