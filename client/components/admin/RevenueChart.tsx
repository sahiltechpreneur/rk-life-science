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
                backgroundColor: "#10b981",
                borderRadius: 6,
                barPercentage: 0.7,
                categoryPercentage: 0.8
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    boxWidth: 10,
                    font: {
                        size: 11
                    }
                }
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
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">
                Revenue Overview
            </h3>
            <div className="h-64">
                <Bar 
                    data={data} 
                    options={options}
                />
            </div>
        </div>
    )
}