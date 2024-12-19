"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/navbarBack";
import { Footer } from "@/components/general-footer";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import AdminSideBar from "@/components/adminsideBar"; // Assuming you have a custom Table component

interface Client {
    _id: string;
    FirstName: string;
    LastName: string;
    Region: string;
    PhoneNum: string;
    e_mail: string;
    isActive: boolean;
    oauth: boolean;
}

const ClientsPage = () => {
    const [clients, setClients] = useState<Client[]>([]); // State to store clients
    const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
    const [error, setError] = useState<string | null>(null); // State to store any error

    useEffect(() => {
        // Fetch clients from API
        const fetchClients = async () => {
            try {
                const response = await fetch("http://localhost:3001/admin/getClients");
                if (!response.ok) {
                    throw new Error("Failed to fetch clients");
                }
                const data = await response.json();
                setClients(data.clients);
            } catch (err: any) {
                console.error("Error fetching clients:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="min-h-screen text-black flex flex-col antialiased ">

            {/* Navbar Section */}
            <AdminSideBar/>

            {/* Main Content Section */}
            <main
                className="flex-grow flex justify-center items-center p-8">  {/* Centering both horizontally and vertically */}
                    <div className="w-full max-w-8xl flex justify-center">  {/* Center the card horizontally */}
                    <Card
                            className="p-8 shadow-lg border-none bg-white rounded-lg w-full max-w-7xl">  {/* Optional max width for card */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-extrabold mb-2 text-gray-800">Clients List</h1>
                            <p className="text-gray-500 text-lg font-semibold">Here is the list of all clients.</p>
                        </div>

                        {/* Table Section */}
                        {clients.length > 0 ? (
                            <div className="flex justify-center">
                                <Table className="mx-auto mt-4">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-xl font-black text-center">First Name</TableHead>
                                            <TableHead className="text-xl font-bold text-center">Last Name</TableHead>
                                            <TableHead className="text-xl font-bold text-center">Region</TableHead>
                                            <TableHead className="text-xl font-bold text-center">Phone
                                                Number</TableHead>
                                            <TableHead className="text-xl font-bold text-center">Email</TableHead>
                                            <TableHead className="text-xl font-bold text-center">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {clients.map((client) => (
                                            <TableRow key={client._id}>

                                                <TableCell
                                                    className="text-lg font-medium text-center">{client.FirstName}</TableCell>
                                                <TableCell
                                                    className="text-lg font-medium text-center">{client.LastName}</TableCell>
                                                <TableCell
                                                    className="text-lg font-medium text-center">{client.Region}</TableCell>
                                                <TableCell
                                                    className="text-lg font-medium text-center">{client.PhoneNum}</TableCell>
                                                <TableCell
                                                    className="text-lg font-medium text-center">{client.e_mail}</TableCell>
                                                <TableCell
                                                    className="text-lg font-medium text-center">{client.isActive ? "Active" : "Inactive"}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <p className="text-center text-gray-600 mt-4">No clients found.</p>
                        )}
                    </Card>
                </div>
            </main>

            {/* Footer Section */}
            <Footer/>
        </div>

    );
};

export default ClientsPage;
