
import React from "react"

import { cn } from "@/lib/utils"
import { CheckCircle, AlertCircle } from "lucide-react"

type TimelineItemProps = {
    id: string
    title: string
    date: string
    icon: React.ElementType
    iconColor?: string
    description?: string
    status?: string
}

export default function Timeline({ items }: { items: TimelineItemProps[] }) {
    return (
        <div className="space-y-6">
            {items.map((item, index) => (
                <div key={item.id} className="relative flex gap-4">
                    {index !== items.length - 1 && (
                        <div className="absolute left-[19px] top-[30px] bottom-0 w-[2px] bg-gray-100" />
                    )}

                    <div
                        className={cn(
                            "rounded-full p-2 h-10 w-10 flex items-center justify-center",
                            item.iconColor || "text-gray-500",
                        )}
                    >
                        {React.createElement(item.icon, { className: "h-5 w-5" })}
                    </div>

                    <div className="flex-1 space-y-1 pt-1">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{item.title}</p>
                            {item.status && (
                                <div className="flex items-center text-xs">
                                    {item.status === "opened" ? (
                                        <span className="flex items-center text-green-600">
                      <CheckCircle className="mr-1 h-3 w-3" /> Opened
                    </span>
                                    ) : item.status === "not_opened" ? (
                                        <span className="flex items-center text-yellow-600">
                      <AlertCircle className="mr-1 h-3 w-3" /> Not opened
                    </span>
                                    ) : null}
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                        {item.description && (
                            <p className="text-sm text-muted-foreground mt-1 border-l-2 border-gray-200 pl-3 py-1">
                                {item.description}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

