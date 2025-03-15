import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        drawBorder: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
}

interface BarChartProps {
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string
    }[]
  }
}

export function BarChart({ data }: BarChartProps) {
  return (
    <div className="h-[300px] w-full">
      <Bar options={options} data={data} />
    </div>
  )
} 