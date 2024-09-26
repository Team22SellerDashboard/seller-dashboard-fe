"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";

export interface PesananDibatalkanItemProps {
	item: {
		id: number;
		name: string;
		variation: string;
		cancelationOrderNumber: string;
		imageUrl: StaticImageData;
		buyerUsername: string;
		buyerImageUrl: StaticImageData;
		status: string;
		askedBy: string;
		reason: string;
		paymentMethod: string;
		cancelationDate: string;
	};
	page?: number;
	limit?: number;
	total?: number;
	totalPages?: number;
}

const PesananDibatalkanItem: React.FC<PesananDibatalkanItemProps> = ({
	item,
}) => {
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

			<div className="flex items-start mb-4">
				<Image
					src={item.imageUrl}
					alt={item.name}
					className="w-20 h-20 object-cover mr-4"
				/>
				<div className="flex-1">
					<p className="text-[#182958] text-lg font-semibold">{item.name}</p>
					<div className="grid grid-cols-2 gap-y-2">
						<p className="text-[#182958] text-sm">Diminta oleh</p>
						<p className="text-[#182958] text-sm font-semibold text-right">
							{item.askedBy}
						</p>
						<p className="text-[#182958] text-sm">Alasan</p>
						<p className="text-[#182958] text-sm font-semibold text-right">
							{item.reason}
						</p>
						<p className="text-[#182958] text-sm">Metode Pembayaran</p>
						<p className="text-[#182958] text-sm font-semibold text-right">
							{item.paymentMethod}
						</p>
					</div>
				</div>
			</div>

			<div className="border-t border-gray-300 my-4"></div>

			<div className="flex justify-between items-center mt-4">
				<p className="text-[#182958] text-sm">
					{item.status === "Dibatalkan" ? (
						<>Diminta pada {item.cancelationDate}</>
					) : item.status === "Menunggu Respon" ? (
						<>Diminta pada {item.cancelationDate}</>
					) : item.status === "Pengembalian Selesai" ? (
						<>Diminta pada {item.cancelationDate}</>
					) : null}
				</p>

				<button className="bg-[#02B7C3] text-white px-6 py-2 rounded-md shadow-md">
					{item.status === "Dibatalkan" ? (
						<>Rincian Pembatalan</>
					) : item.status === "Menunggu Respon" ? (
						<>Cek Status Pembatalan</>
					) : item.status === "Pengembalian Selesai" ? (
						<>Diminta pada {item.cancelationDate}</>
					) : null}
				</button>
			</div>

			<div className="border-t border-gray-300 my-4"></div>

			<div className="flex justify-between items-center">
				<p className="text-[#182958] text-sm">No. Pengajuan:</p>
				<p className="text-[#182958] text-sm font-semibold">
					{item.cancelationOrderNumber}
				</p>
			</div>
		</div>
	);
};

export default PesananDibatalkanItem;
