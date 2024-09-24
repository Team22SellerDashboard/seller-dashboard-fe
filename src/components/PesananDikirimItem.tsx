import React from "react";
import Image, { StaticImageData } from "next/image";

export interface PesananDikirimItemProps {
	item: {
		id: number;
		name: string;
		variation: string;
		price: string;
		quantity: number;
		total: string;
		orderNumber: string;
		imageUrl: StaticImageData;
		buyerUsername: string;
		buyerImageUrl: StaticImageData;
		status: string;
		deadlineDate: string;
		pickupDate: string;
	};
	page?: number;
	limit?: number;
	total?: number;
	totalPages?: number;
}

const PesananDikirimItem: React.FC<PesananDikirimItemProps> = ({ item }) => {
	return (
		<div className="border p-4 rounded-lg mb-4 bg-white shadow-sm">
			<div className="flex items-center mb-4">
				<Image
					src={item.buyerImageUrl}
					alt={item.buyerUsername}
					className="w-8 h-8 rounded-full mr-4"
				/>
				<p className="text-[#182958] text-sm">{item.buyerUsername}</p>
				<p className="text-[#0F6C72] text-sm ml-auto">{item.status}</p>{" "}
			</div>

			<div className="flex items-start">
				<Image
					src={item.imageUrl}
					alt={item.name}
					className="w-20 h-20 object-cover mr-4"
				/>
				<div className="flex-1">
					<p className="text-[#182958] text-lg">{item.name}</p>
					<p className="text-[#182958] text-sm">Variasi: {item.variation}</p>
				</div>
				<div className="flex flex-col items-end">
					<p className="text-[#182958] text-sm">x {item.quantity}</p>
					<p className="text-[#182958] text-lg">{item.price}</p>
				</div>
			</div>

			<div className="flex flex-col items-end mt-4">
				<p className="text-[#182958] text-lg">Total Pesanan: {item.total}</p>
			</div>

			<div className="flex justify-between items-center mt-4">
				<div className="border-t border-gray-300 w-full"></div>
			</div>

			<div className="flex justify-between items-center mt-4">
				<p className="text-[#182958] text-sm">
					{item.status === "Perlu Dikirim" ? (
						<>
							Mohon mengatur jadwal pengiriman sebelum tanggal{" "}
							{item.deadlineDate} untuk menghindari keterlambatan pengiriman
						</>
					) : item.status === "Telah Dikirim" ? (
						<>Paket dipick up pada {item.pickupDate}</>
					) : null}
				</p>

				<button className="bg-[#02B7C3] text-white px-8 py-2 rounded-md shadow-md">
					Lihat Rincian Pick-Up
				</button>
			</div>

			<div className="flex justify-between items-center mt-4">
				<div className="border-t border-gray-300 w-full"></div>
			</div>

			<div className="flex justify-between items-center mt-4">
				<p className="text-[#182958] text-sm">No. Pesanan:</p>
				<p className="text-[#182958] text-sm">{item.orderNumber}</p>
			</div>
		</div>
	);
};

export default PesananDikirimItem;
