"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import type { Task } from "@/lib/data-store"

interface TaskChartProps {
  tasks: Task[]
  isLoading: boolean
}

export function TaskChart({ tasks, isLoading }: TaskChartProps) {
  const statusData = [
    {
      name: "Completed",
      value: tasks.filter((t) => t.status === "completed").length,
      color: "hsl(var(--chart-3))",
    },
    {
      name: "In Progress",
      value: tasks.filter((t) => t.status === "in-progress").length,
      color: "hsl(var(--chart-4))",
    },
    {
      name: "Todo",
      value: tasks.filter((t) => t.status === "todo").length,
      color: "hsl(var(--chart-1))",
    },
  ]

  const priorityData = [
    {
      name: "High",
      value: tasks.filter((t) => t.priority === "high").length,
      color: "hsl(var(--chart-5))",
    },
    {
      name: "Medium",
      value: tasks.filter((t) => t.priority === "medium").length,
      color: "hsl(var(--chart-4))",
    },
    {
      name: "Low",
      value: tasks.filter((t) => t.priority === "low").length,
      color: "hsl(var(--chart-2))",
    },
  ]

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="h-5 bg-muted animate-pulse rounded w-32" />
            <div className="h-4 bg-muted animate-pulse rounded w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted animate-pulse rounded" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="h-5 bg-muted animate-pulse rounded w-32" />
            <div className="h-4 bg-muted animate-pulse rounded w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted animate-pulse rounded" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Task Status Distribution</CardTitle>
          <CardDescription>Overview of task completion status</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              completed: { label: "Completed", color: "hsl(var(--chart-3))" },
              inProgress: { label: "In Progress", color: "hsl(var(--chart-4))" },
              todo: { label: "Todo", color: "hsl(var(--chart-1))" },
            }}
            className="h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Priority Distribution</CardTitle>
          <CardDescription>Tasks grouped by priority level</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              high: { label: "High", color: "hsl(var(--chart-5))" },
              medium: { label: "Medium", color: "hsl(var(--chart-4))" },
              low: { label: "Low", color: "hsl(var(--chart-2))" },
            }}
            className="h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]}>
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
