"use client";

import React, { ReactNode } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import OrderNavbar from "../components/OrderNavbar";
import { SidebarProvider } from "../context/SidebarContext";

interface PesananLayoutProps {
	children: ReactNode;
}

const PesananLayout: React.FC<PesananLayoutProps> = ({ children }) => {
	return (
		<SidebarProvider>
			{" "}
			<div className="flex h-screen overflow-hidden">
				<Sidebar />

				<div className="flex flex-col flex-1">
					<Header />

					<div className="mt-[80px] ml-[256px]">
						<OrderNavbar />
					</div>

					<main className="flex-1 p-6 bg-gray-100 overflow-y-auto ml-[256px]">
						{children}
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
};

export default PesananLayout;
