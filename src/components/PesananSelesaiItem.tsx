import React from "react";
import Image, { StaticImageData } from "next/image";

export interface PesananSelesaiItemProps {
	item: {
		id: number;
		name: string;
		variation: string;
		price: string;
		quantity: number;
		total: string;
		arrivalDate: string;
		arrivalHourDate: string;
		orderNumber: string;
		imageUrl: StaticImageData;
		buyerUsername: string;
		buyerImageUrl: StaticImageData;
		status: string;
	};
	page?: number;
	limit?: number;
	total?: number;
	totalPages?: number;
}

const PesananSelesaiItem: React.FC<PesananSelesaiItemProps> = ({ item }) => {
	return (
		<div className="border p-4 rounded-lg mb-4 bg-white shadow-sm">
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center">
					<Image
						src={item.buyerImageUrl}
						alt={item.buyerUsername}
						className="w-8 h-8 rounded-full mr-4"
					/>
					<p className="text-[#182958] text-sm">{item.buyerUsername}</p>
				</div>
				<p className="text-[#0F6C72] text-sm font-semibold">{item.status}</p>
			</div>

			<div className="flex items-start">
				<Image
					src={item.imageUrl}
					alt={item.name}
					className="w-20 h-20 object-cover mr-4"
				/>
				<div className="flex-1">
					<p className="text-[#182958] text-lg font-semibold">{item.name}</p>
					<p className="text-[#182958] text-sm">Variasi: {item.variation}</p>
				</div>
				<div className="text-right">
					<p className="text-[#182958] text-sm">x {item.quantity}</p>
					<p className="text-[#182958] text-lg font-semibold">{item.price}</p>
				</div>
			</div>

			<div className="flex justify-between items-center mt-4">
				<p className="text-[#182958] text-sm font-semibold">Total Pesanan:</p>
				<p className="text-[#182958] text-lg font-semibold">{item.total}</p>
			</div>

			<div className="border-t border-gray-300 my-4"></div>

			<div className="flex justify-between items-center mt-4">
				<p className="text-[#182958] text-sm">
					Telah tiba pada {item.arrivalDate} Pukul {item.arrivalHourDate}
				</p>
				<button className="bg-[#02B7C3] text-white px-8 py-2 rounded-md shadow-md">
					Lihat Penilaian Toko
				</button>
			</div>

			<div className="border-t border-gray-300 my-4"></div>

			<div className="flex justify-between items-center">
				<p className="text-[#182958] text-sm">No. Pesanan:</p>
				<p className="text-[#182958] text-sm font-semibold">
					{item.orderNumber}
				</p>
			</div>
		</div>
	);
};

export default PesananSelesaiItem;
