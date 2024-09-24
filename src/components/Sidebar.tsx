"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import IconTutorial from "../assets/icons/Tutorial.svg";
import IconDashboard from "../assets/icons/Home.svg";
import IconChat from "../assets/icons/Chat.svg";
import IconTransaction from "../assets/icons/Transaction.svg";
import IconReview from "../assets/icons/Review.svg";
import IconProduct from "../assets/icons/Products.svg";
import IconLoan from "../assets/icons/Loan.svg";
import IconOffer from "../assets/icons/Offer.svg";
import IconEye from "../assets/icons/Eye.svg";
import IconShare from "../assets/icons/Share.svg";
import ArrowDown from "../assets/icons/UpArrow.svg";
import { useSidebar } from "../context/SidebarContext";

const Sidebar = () => {
	const pathname = usePathname();
	const { isDashboardActive } = useSidebar();

	const getLinkClass = (href: string) =>
		pathname === href || (href === "/" && isDashboardActive)
			? "flex items-center gap-4 p-2 rounded-md border-l-4 border-[#128CA6] text-gray-700"
			: "flex items-center gap-4 p-2 hover:bg-gray-100 rounded-md text-gray-700";

	const getSubLinkClass = (href: string) =>
		pathname === href
			? "block p-2 text-[#128CA6] rounded-md"
			: "block p-2 hover:bg-gray-100 rounded-md text-gray-700";

	return (
		<div className="h-full w-64 bg-white shadow-md fixed top-[80px] left-0 overflow-y-auto">
			<div className="p-4 bg-white shadow-md border-b border-gray-200">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Image
							src={IconTutorial}
							alt="Tutorial"
							className="w-8 h-8 bg-[#E1F5F9] rounded-full p-1"
						/>
						<span className="text-black text-lg font-semibold">Tutorial</span>
					</div>
					<div className="flex gap-2">
						<Image
							src={IconEye}
							alt="View"
							className="w-6 h-6 cursor-pointer"
						/>
						<Image
							src={IconShare}
							alt="Share"
							className="w-6 h-6 cursor-pointer"
						/>
					</div>
				</div>
			</div>

			<nav className="flex flex-col p-4 space-y-2">
				<Link href="/" className={getLinkClass("/")}>
					<Image src={IconDashboard} alt="Dashboard" className="w-6 h-6" />
					<span className="text-black">Dashboard</span>
				</Link>

				<Link href="/chat" className={getLinkClass("/chat")}>
					<Image src={IconChat} alt="Chat" className="w-6 h-6" />
					<span>Chat</span>
				</Link>

				<div>
					<div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer text-gray-700">
						<div className="flex items-center gap-4">
							<Image
								src={IconTransaction}
								alt="Transaction"
								className="w-6 h-6"
							/>
							<span>Transaksi</span>
						</div>
						<Image src={ArrowDown} alt="Arrow Down" className="w-4 h-4" />
					</div>
					<div className="ml-10 mt-2 space-y-1">
						<Link href="/orders" className={getSubLinkClass("/orders")}>
							Pesanan
						</Link>
						<Link href="/cashier" className={getSubLinkClass("/cashier")}>
							PaDi Kasir
						</Link>
						<Link href="/fees" className={getSubLinkClass("/fees")}>
							Biaya Transaksi
						</Link>
						<Link href="/export" className={getSubLinkClass("/export")}>
							Export Data Pesanan
						</Link>
					</div>
				</div>

				<Link href="/reviews" className={getLinkClass("/reviews")}>
					<Image src={IconReview} alt="Review" className="w-6 h-6" />
					<span>Ulasan</span>
				</Link>

				<div>
					<div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer text-gray-700">
						<div className="flex items-center gap-4">
							<Image src={IconProduct} alt="Product" className="w-6 h-6" />
							<span>Produk</span>
						</div>
						<Image src={ArrowDown} alt="Arrow Down" className="w-4 h-4" />
					</div>
					<div className="ml-10 mt-2 space-y-1">
						<Link
							href="/product-data"
							className={getSubLinkClass("/product-data")}>
							Data Produk
						</Link>
						<Link
							href="/add-product"
							className={getSubLinkClass("/add-product")}>
							Tambah Produk
						</Link>
						<Link
							href="/bulk-add-product"
							className={getSubLinkClass("/bulk-add-product")}>
							Tambah Produk Bulk
						</Link>
					</div>
				</div>

				<div>
					<div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer text-gray-700">
						<div className="flex items-center gap-4">
							<Image src={IconLoan} alt="Loan" className="w-6 h-6" />
							<span>Pinjaman</span>
						</div>
						<Image src={ArrowDown} alt="Arrow Down" className="w-4 h-4" />
					</div>
					<div className="ml-10 mt-2 space-y-1">
						<Link
							href="/available-loans"
							className={getSubLinkClass("/available-loans")}>
							Tersedia
						</Link>
						<Link
							href="/ongoing-loans"
							className={getSubLinkClass("/ongoing-loans")}>
							Pinjaman Berlangsung
						</Link>
					</div>
				</div>

				<Link href="/offers" className={getLinkClass("/offers")}>
					<Image src={IconOffer} alt="Offer" className="w-6 h-6" />
					<span>Penawaran</span>
				</Link>
			</nav>
		</div>
	);
};

export default Sidebar;
