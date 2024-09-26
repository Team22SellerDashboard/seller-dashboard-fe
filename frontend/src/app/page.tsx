"use client";

import "./globals.css";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import OrderCard from "../components/OrderCard";
import PromoImage from "../assets/images/Promo.png";
import InfoIcon from "../assets/icons/Info.svg";

export default function DashboardPage() {
	interface OrderData {
		order_state: string;
		total_order: number;
	}

	const [orderCounts, setOrderCounts] = useState({
		pesanan_diproses: 0,
		pesanan_baru: 0,
		pesanan_dibatalkan: 0,
		pesanan_dikirim: 0,
		pesanan_selesai: 0,
	});

	useEffect(() => {
		const fetchOrderCounts = async () => {
			try {
				const baseURL = process.env.NEXT_PUBLIC_BASE || "";
				console.log(baseURL);
				const response = await axios.get(baseURL);
				const data: OrderData[] = response.data.data.count || [];

				const counts = {
					pesanan_baru:
						data.find((item) => item.order_state === "")?.total_order || 0,
					pesanan_diproses:
						data.find((item) => item.order_state === "processed")
							?.total_order || 0,
					pesanan_dikirim:
						data.find((item) => item.order_state === "sent")?.total_order || 0,
					pesanan_selesai:
						data.find((item) => item.order_state === "done")?.total_order || 0,
					pesanan_dibatalkan:
						data.find((item) => item.order_state === "cancelled")
							?.total_order || 0,
				};

				setOrderCounts(counts);
			} catch (error) {
				console.error("Error fetching order counts:", error);
			}
		};

		fetchOrderCounts();
	}, []);

	return (
		<MainLayout>
			<div className="p-6">
				<div className="flex flex-col items-center space-y-6">
					<div className="w-full max-w-[1200px]">
						<Image
							src={PromoImage}
							alt="Promo"
							className="w-full h-auto mb-6"
						/>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="col-span-2 bg-white shadow-lg p-6 rounded-md">
								<h2 className="text-black text-lg font-semibold mb-4">
									Yang Perlu Dilakukan
								</h2>
								<p className="text-sm text-gray-500">
									Hal-hal yang perlu Anda pantau untuk jaga kepuasan pembeli
								</p>
								<div className="grid grid-cols-3 gap-4 mt-4">
									<OrderCard
										title="Pesanan Baru"
										count={orderCounts.pesanan_baru}
										linkTo="/pesanan-baru"
									/>
									<OrderCard
										title="Pesanan Diproses"
										count={orderCounts.pesanan_diproses}
										linkTo="/pesanan-diproses"
									/>
									<OrderCard
										title="Pesanan Dikirim"
										count={orderCounts.pesanan_dikirim}
										linkTo="/pesanan-dikirim"
									/>
									<OrderCard
										title="Pesanan Selesai"
										count={orderCounts.pesanan_selesai}
										linkTo="/pesanan-selesai"
									/>
									<OrderCard
										title="Pesanan Dibatalkan"
										count={orderCounts.pesanan_dibatalkan}
										linkTo="/pesanan-dibatalkan"
									/>
								</div>
							</div>

							<div className="bg-white shadow-lg p-6 rounded-md h-full">
								<h2 className="text-black text-lg font-semibold mb-4">
									Info Penting
								</h2>
								<div className="space-y-4">
									<div
										className="flex items-start p-4 rounded-md"
										style={{ backgroundColor: "#FDE9D0" }}>
										<Image src={InfoIcon} alt="Info" className="w-5 h-5 mr-2" />
										<p className="text-black text-sm">testing monet</p>
									</div>

									<div
										className="flex items-start p-4 rounded-md"
										style={{ backgroundColor: "#FDE9D0" }}>
										<Image src={InfoIcon} alt="Info" className="w-5 h-5 mr-2" />
										<p className="text-black text-sm">
											Batas waktu respon pesanan 2 × 24 jam (hari kerja ; Senin
											s.d. Jumat) untuk semua pilihan kurir sebelum dibatalkan
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
}
