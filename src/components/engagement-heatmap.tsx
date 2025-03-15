

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"


// Mock data for the heatmap
const generateHeatmapData = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const hours = Array.from({ length: 24 }, (_, i) => i);

    // Generate random data
    const data: Record<string, Record<number, number>> = {};

    days.forEach((day) => {
        data[day] = {};
        hours.forEach((hour) => {
            // Higher engagement during business hours
            const isBusinessHour = hour >= 9 && hour <= 17;
            const isWeekday = day !== "Sat" && day !== "Sun";

            // Generate a value between 0-4 with higher probability during business hours
            let value = 0;
            if (isBusinessHour && isWeekday) {
                value = Math.floor(Math.random() * 5); // 0-4
                // Boost some hours to show patterns
                if (hour === 10 || hour === 14) {
                    value = Math.min(value + 2, 4);
                }
            } else {
                value = Math.floor(Math.random() * 2); // 0-1
            }

            data[day][hour] = value;
        }); // <-- Fixed missing closing parenthesis
    });

    return data;
};

const heatmapData = generateHeatmapData()

// Color scale for the heatmap
const getColor = (value: number): string => {
    const colors = [
        "bg-gray-100", // 0
        "bg-blue-100", // 1
        "bg-blue-300", // 2
        "bg-blue-500", // 3
        "bg-blue-700", // 4
    ]

    return colors[value] || colors[0]
}

export default function EngagementHeatmap() {
    const [view, setView] = useState<"reminders" | "responses">("responses")

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <Label>View</Label>
                    <Select value={view} onValueChange={(value) => setView(value as "reminders" | "responses")}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select view" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="reminders">Reminders Sent</SelectItem>
                            <SelectItem value="responses">Client Responses</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="text-xs text-muted-foreground">Less</div>
                    <div className="flex">
                        {[0, 1, 2, 3, 4].map((value) => (
                            <div key={value} className={`h-4 w-4 ${getColor(value)} border border-gray-200`} />
                        ))}
                    </div>
                    <div className="text-xs text-muted-foreground">More</div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                    {/* Hours header */}
                    <div className="flex">
                        <div className="w-12"></div> {/* Empty cell for day labels */}
                        <div className="flex flex-1">
                            {Array.from({ length: 24 }, (_, i) => (
                                <div key={i} className="flex-1 text-center text-xs text-muted-foreground">
                                    {i === 0 ? "12am" : i === 12 ? "12pm" : i > 12 ? `${i - 12}pm` : `${i}am`}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Heatmap grid */}
                    <div className="mt-1">
                        {Object.keys(heatmapData).map((day) => (
                            <div key={day} className="flex items-center h-8 mb-1">
                                <div className="w-12 text-xs font-medium">{day}</div>
                                <div className="flex flex-1">
                                    {Array.from({ length: 24 }, (_, hour) => (
                                        <div
                                            key={hour}
                                            className={`flex-1 h-8 ${getColor(heatmapData[day][hour])} border border-white rounded-sm`}
                                            title={`${day} ${hour}:00 - Engagement: ${heatmapData[day][hour]}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 text-sm text-muted-foreground">
                        <p>
                            {view === "responses"
                                ? "This heatmap shows when clients are most likely to respond to reminders."
                                : "This heatmap shows when most reminders are sent."}
                        </p>
                        <p className="mt-1">Tip: Send reminders during high-engagement hours to improve response rates.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

