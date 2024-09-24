"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "../globals.css";
import PesananLayout from "../../layouts/PesananLayout";
import PesananDiprosesItem, {
	PesananDiprosesItemProps,
} from "../../components/PesananDiprosesItem";
import EmptyPesananDiprosesIcon from "../../assets/icons/EmptyPesananDiproses.svg";
import { PesananDiprosesData } from "../../data/PesananDiprosesData"; // Mock data import

const PesananDiprosesPage: React.FC = () => {
	const [activeButton, setActiveButton] = useState("Semua"); // Track the active button
	const [pesananDiprosesData, setPesananDiprosesData] = useState<
		PesananDiprosesItemProps["item"][]
	>([]);
	const [filteredData, setFilteredData] = useState<
		PesananDiprosesItemProps["item"][]
	>([]);
	const [currentPage, setCurrentPage] = useState(PesananDiprosesData.page);
	const [totalPages, setTotalPages] = useState(PesananDiprosesData.totalPages);
	const [loading, setLoading] = useState(true);

	const commonButtonStyles =
		"inline-flex justify-between w-full rounded-lg shadow-sm px-6 py-2 bg-gradient-to-r from-[#009EA9] to-[#0F6C72] text-white text-sm font-medium";

	const handleButtonClick = (button: string) => {
		setActiveButton(button);
		if (button === "Semua") {
			setFilteredData(pesananDiprosesData);
		} else if (button === "Telah Diproses") {
			const processedData = pesananDiprosesData.filter(
				(item) => item.status === "Diproses"
			);
			setFilteredData(processedData);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				// Uncomment this block when fetching from real API
				// const response = await axios.get(`http://localhost:8080/orders-processed?page=${currentPage}&limit=10`);
				// setPesananDiprosesData(response.data.data || []);
				// setFilteredData(response.data.data || []);
				// setTotalPages(response.data.totalPages || 1);
				// Fallback to mock data if the API is not available
			} catch (error) {
				console.error("Error fetching data", error);
				setPesananDiprosesData([]);
				setFilteredData([]);
			} finally {
				setLoading(false);
				const paginatedData = paginateData(
					PesananDiprosesData.data,
					currentPage,
					PesananDiprosesData.limit
				);
				setPesananDiprosesData(paginatedData);
				setFilteredData(paginatedData);
				setTotalPages(PesananDiprosesData.totalPages);
			}
		};

		fetchData();
	}, [currentPage]);

	const paginateData = (
		data: PesananDiprosesItemProps["item"][],
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
				<div className="flex items-center justify-between mb-5 space-x-4">
					<button
						onClick={() => handleButtonClick("Semua")}
						className={`${commonButtonStyles} ${
							activeButton === "Semua" ? "font-bold" : ""
						}`}>
						<span
							className={`flex-grow text-center ${
								activeButton === "Semua" ? "font-bold" : ""
							}`}>
							Semua
						</span>
					</button>

					<button
						onClick={() => handleButtonClick("Telah Diproses")}
						className={`${commonButtonStyles} ${
							activeButton === "Telah Diproses" ? "font-bold" : ""
						}`}>
						<span
							className={`flex-grow text-center ${
								activeButton === "Telah Diproses" ? "font-bold" : ""
							}`}>
							Telah Diproses
						</span>
					</button>
				</div>

				{loading ? (
					<div className="text-center py-10">Loading...</div>
				) : filteredData.length === 0 ? (
					// Empty state
					<div className="flex flex-col justify-center items-center py-24">
						<Image
							src={EmptyPesananDiprosesIcon}
							alt="Empty"
							width={150}
							height={150}
						/>
						<p className="text-[#0F6C72] text-lg mt-4">
							Tidak ada pesanan yang sedang diproses
						</p>
					</div>
				) : (
					<>
						<div>
							{filteredData.map((item) => (
								<PesananDiprosesItem key={item.id} item={item} />
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

export default PesananDiprosesPage;
