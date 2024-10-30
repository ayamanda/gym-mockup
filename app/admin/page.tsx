"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Users,
  DollarSign,
  MessageSquare,
  TrendingUp,
  Activity,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardStats {
  totalMembers: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  pendingMessages: number;
}

const defaultStats: DashboardStats = {
  totalMembers: 0,
  activeSubscriptions: 0,
  monthlyRevenue: 0,
  pendingMessages: 0,
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>(defaultStats);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch members
        const membersSnapshot = await getDocs(collection(db, "members"));
        const totalMembers = membersSnapshot.size;

        // Fetch subscriptions
        const subscriptionsSnapshot = await getDocs(collection(db, "subscriptions"));
        const activeSubscriptions = subscriptionsSnapshot.docs.filter(
          doc => doc.data().status === "active"
        ).length;

        // Fetch messages
        const messagesSnapshot = await getDocs(collection(db, "messages"));
        const pendingMessages = messagesSnapshot.docs.filter(
          doc => !doc.data().read
        ).length;

        // Calculate revenue (simplified)
        const monthlyRevenue = activeSubscriptions * 49.99; // Basic plan price

        setStats({
          totalMembers,
          activeSubscriptions,
          monthlyRevenue,
          pendingMessages,
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: "Total Members",
      value: stats.totalMembers,
      icon: <Users className="h-6 w-6" />,
      color: "text-blue-500",
    },
    {
      title: "Active Subscriptions",
      value: stats.activeSubscriptions,
      icon: <Activity className="h-6 w-6" />,
      color: "text-green-500",
    },
    {
      title: "Monthly Revenue",
      value: `$${stats.monthlyRevenue.toFixed(2)}`,
      icon: <DollarSign className="h-6 w-6" />,
      color: "text-yellow-500",
    },
    {
      title: "Pending Messages",
      value: stats.pendingMessages,
      icon: <MessageSquare className="h-6 w-6" />,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome to your FitMax admin dashboard. Here's today's summary.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
              </div>
              <div className={`${stat.color}`}>{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Revenue Overview</h3>
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={revenueData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}