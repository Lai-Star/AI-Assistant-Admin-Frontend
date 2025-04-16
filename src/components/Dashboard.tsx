import React from 'react';
import Layout from "@/layouts/Layout"; // The '.tsx' extension is optional and usually omitted.

const Dashboard: React.FC = () => {
    return (
        <Layout>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Welcome to your dashboard! This is where you can manage your settings and view your data.</p>
        </Layout>
    );
};

export default Dashboard;