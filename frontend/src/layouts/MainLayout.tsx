"use client";

import React, { ReactNode } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { SidebarProvider } from "../context/SidebarContext";

interface MainLayoutProps {
	children: ReactNode;
	className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
	return (
		<SidebarProvider>
			{" "}
			<div className={`flex h-screen overflow-hidden ${className}`}>
				<Sidebar />

				<div className="flex flex-col flex-1">
					<Header />

					<main className="flex-1 p-6 bg-gray-100 overflow-y-auto mt-[80px] ml-[256px]">
						{children}
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
};

export default MainLayout;
