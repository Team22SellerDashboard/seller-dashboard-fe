"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "../globals.css";
import PesananLayout from "../../layouts/PesananLayout";
import PesananSelesaiItem, {
	PesananSelesaiItemProps,
} from "../../components/PesananSelesaiItem";
import { PesananSelesaiData } from "../../data/PesananSelesaiData";
import EmptyPesananSelesaiIcon from "../../assets/icons/EmptyPesananSelesai.svg";

const PesananSelesaiPage: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const [filteredData, setFilteredData] = useState<
		PesananSelesaiItemProps["item"][]
	>([]);
	const [currentPage, setCurrentPage] = useState(PesananSelesaiData.page);
	const [totalPages, setTotalPages] = useState(PesananSelesaiData.totalPages);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				// Uncomment this block when fetching from real API
				// const response = await axios.get(`http://localhost:8080/orders-completed?page=${currentPage}&limit=10`);
				// setFilteredData(response.data.data || []);
				// setTotalPages(response.data.totalPages || 1);
			} catch (error) {
				console.error("Error fetching data", error);
				setFilteredData([]);
			} finally {
				setLoading(false);
				// Fallback to mock data if the API is not available
				const paginatedData = paginateData(
					PesananSelesaiData.data,
					currentPage,
					PesananSelesaiData.limit
				);
				setFilteredData(paginatedData);
				setTotalPages(PesananSelesaiData.totalPages);
			}
		};

		fetchData();
	}, [currentPage]);

	const paginateData = (
		data: PesananSelesaiItemProps["item"][],
		page: number,
		limit: number
	) => {
		const startIndex = (page - 1) * limit;
		const endIndex = startIndex + limit;
		return data.slice(startIndex, endIndex);
	};

	const handlePageChange = (newPage: number) => {
		if (newPage > 0 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};

	const getPaginationRange = () => {
		let start = Math.max(currentPage - 1, 1);
		let end = Math.min(start + 2, totalPages);

		if (currentPage <= 3) {
			start = 1;
			end = 3;
		} else if (currentPage >= totalPages - 2) {
			start = totalPages - 2;
			end = totalPages;
		}

		return [...Array(end - start + 1)].map((_, index) => start + index);
	};

	return (
		<PesananLayout>
			<div className="p-4 pt-1">
				{loading ? (
					<div className="text-center py-10">Loading...</div>
				) : filteredData.length === 0 ? (
					<div className="flex flex-col justify-center items-center py-24">
						<Image
							src={EmptyPesananSelesaiIcon}
							alt="Empty pesanan selesai"
							width={150}
							height={150}
						/>
						<p className="text-[#0F6C72] text-lg mt-4">
							Tidak ada pesanan Anda yang sudah selesai
						</p>
					</div>
				) : (
					<>
						<div>
							{filteredData.map((item) => (
								<PesananSelesaiItem key={item.id} item={item} />
							))}
						</div>

						<div className="flex justify-center items-center mt-6 space-x-2">
							{currentPage > 3 && (
								<button
									onClick={() => handlePageChange(currentPage - 1)}
									className="bg-gray-200 text-gray-500 px-3 py-1 rounded-md">
									{"<"}
								</button>
							)}

							{getPaginationRange().map((pageNumber) => (
								<button
									key={pageNumber}
									onClick={() => handlePageChange(pageNumber)}
									className={`${
										currentPage === pageNumber
											? "bg-[#009EA9] text-white"
											: "bg-gray-200 text-gray-500"
									} px-3 py-1 rounded-md`}>
									{pageNumber}
								</button>
							))}

							{currentPage < totalPages - 2 && (
								<button
									onClick={() => handlePageChange(currentPage + 1)}
									className="bg-gray-200 text-gray-500 px-3 py-1 rounded-md">
									{">"}
								</button>
							)}
						</div>
					</>
				)}
			</div>
		</PesananLayout>
	);
};

export default PesananSelesaiPage;
