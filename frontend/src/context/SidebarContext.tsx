"use client";

import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";

const SidebarContext = createContext<{ isDashboardActive: boolean }>({
	isDashboardActive: false,
});

export const SidebarProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const pathname = usePathname() || "";

	const dashboardRoutes = [
		"/",
		"/pesanan-baru",
		"/pesanan-dibatalkan",
		"/pesanan-dikirim",
		"/pesanan-diproses",
		"/pesanan-selesai",
	];

	const isDashboardActive = dashboardRoutes.includes(pathname);

	return (
		<SidebarContext.Provider value={{ isDashboardActive }}>
			{children}
		</SidebarContext.Provider>
	);
};

export const useSidebar = () => useContext(SidebarContext);
