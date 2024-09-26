"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PesananBaruIcon from "../assets/icons/PesananBaru.svg";
import PesananDiprosesIcon from "../assets/icons/PesananDiproses.svg";
import PesananDikirimIcon from "../assets/icons/PesananDikirim.svg";
import PesananDibatalkanIcon from "../assets/icons/PesananDibatalkan.svg";
import PesananSelesaiIcon from "../assets/icons/PesananSelesai.svg";
import PesananBaruActiveIcon from "../assets/icons/PesananBaruActive.svg";
import PesananDiprosesActiveIcon from "../assets/icons/PesananDiprosesActive.svg";
import PesananDikirimActiveIcon from "../assets/icons/PesananDikirimActive.svg";
import PesananDibatalkanActiveIcon from "../assets/icons/PesananDibatalkanActive.svg";
import PesananSelesaiActiveIcon from "../assets/icons/PesananSelesaiActive.svg";

const OrderNavbar: React.FC = () => {
	const pathname = usePathname();

	const navItems = [
		{
			href: "/pesanan-baru",
			label: "Pesanan Baru",
			icon: PesananBaruIcon,
			activeIcon: PesananBaruActiveIcon,
			size: { width: 35, height: 35 },
		},
		{
			href: "/pesanan-diproses",
			label: "Pesanan Diproses",
			icon: PesananDiprosesIcon,
			activeIcon: PesananDiprosesActiveIcon,
			size: { width: 47, height: 47 },
		},
		{
			href: "/pesanan-dikirim",
			label: "Pesanan Dikirim",
			icon: PesananDikirimIcon,
			activeIcon: PesananDikirimActiveIcon,
			size: { width: 33, height: 33 },
		},
		{
			href: "/pesanan-dibatalkan",
			label: "Pesanan Dibatalkan",
			icon: PesananDibatalkanIcon,
			activeIcon: PesananDibatalkanActiveIcon,
			size: { width: 37, height: 37 },
		},
		{
			href: "/pesanan-selesai",
			label: "Pesanan Selesai",
			icon: PesananSelesaiIcon,
			activeIcon: PesananSelesaiActiveIcon,
			size: { width: 40, height: 40 },
		},
	];

	return (
		<div className="w-full bg-white shadow border-b border-gray-200">
			<div className="flex justify-between items-center">
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<Link
							href={item.href}
							key={item.label}
							className={`flex-1 flex flex-col items-center py-2 ${
								isActive
									? "text-[#128CA6] font-semibold border-b-2 border-[#128CA6]"
									: "text-gray-500"
							}`}>
							<div
								className="flex items-center justify-center mb-1"
								style={{
									height: "50px",
									display: "flex",
									alignItems: "center",
								}}>
								<Image
									src={isActive ? item.activeIcon : item.icon}
									alt={item.label}
									width={item.size.width}
									height={item.size.height}
								/>
							</div>
							<span className="text-sm">{item.label}</span>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default OrderNavbar;
