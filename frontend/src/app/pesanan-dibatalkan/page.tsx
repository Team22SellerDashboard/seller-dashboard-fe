"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "../globals.css";
import PesananLayout from "../../layouts/PesananLayout";
import PesananDibatalkanItem, {
	PesananDibatalkanItemProps,
} from "../../components/PesananDibatalkanItem";
import { PesananDibatalkanData } from "../../data/PesananDibatalkanData";
import EmptyPesananDibatalkanIcon from "../../assets/icons/EmptyPesananDibatalkan.svg";

const PesananDibatalkanPage: React.FC = () => {
	const [activeButton, setActiveButton] = useState("Semua");
	const [loading, setLoading] = useState(true);
	const [pesananDibatalkanData, setPesananDibatalkanData] = useState<
		PesananDibatalkanItemProps["item"][]
	>([]);
	const [filteredData, setFilteredData] = useState<
		PesananDibatalkanItemProps["item"][]
	>([]);
	const [currentPage, setCurrentPage] = useState(PesananDibatalkanData.page);
	const [totalPages, setTotalPages] = useState(
		PesananDibatalkanData.totalPages
	);

	const commonButtonStyles =
		"inline-flex justify-between w-full rounded-lg shadow-sm px-6 py-2 bg-gradient-to-r from-[#009EA9] to-[#0F6C72] text-white text-sm font-medium";

	const handleButtonClick = (button: string) => {
		setActiveButton(button);
		if (button === "Semua") {
			setFilteredData(pesananDibatalkanData);
		} else if (button === "Dibatalkan") {
			const canceledData = pesananDibatalkanData.filter(
				(item) => item.status === "Dibatalkan"
			);
			setFilteredData(canceledData);
		} else if (button === "Menunggu Respon") {
			const awaitingResponseData = pesananDibatalkanData.filter(
				(item) => item.status === "Menunggu Respon"
			);
			setFilteredData(awaitingResponseData);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				// Uncomment this block when fetching from real API
				// const response = await axios.get(`http://localhost:8080/orders-cancelled?page=${currentPage}&limit=10`);
				// setPesananDibatalkanData(response.data.data || []);
				// setFilteredData(response.data.data || []);
				// setTotalPages(response.data.totalPages || 1);
			} catch (error) {
				console.error("Error fetching data", error);
				setPesananDibatalkanData([]);
				setFilteredData([]);
			} finally {
				// Fallback to mock data if the API is not available
				const paginatedData = paginateData(
					PesananDibatalkanData.data,
					currentPage,
					PesananDibatalkanData.limit
				);
				setPesananDibatalkanData(paginatedData);
				setFilteredData(paginatedData);
				setTotalPages(PesananDibatalkanData.totalPages);
				setLoading(false);
			}
		};

		fetchData();
	}, [currentPage]);

	const paginateData = (
		data: PesananDibatalkanItemProps["item"][],
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
						onClick={() => handleButtonClick("Menunggu Respon")}
						className={`${commonButtonStyles} ${
							activeButton === "Menunggu Respon" ? "font-bold" : ""
						}`}>
						<span
							className={`flex-grow text-center ${
								activeButton === "Menunggu Respon" ? "font-bold" : ""
							}`}>
							Menunggu Respon
						</span>
					</button>

					<button
						onClick={() => handleButtonClick("Dibatalkan")}
						className={`${commonButtonStyles} ${
							activeButton === "Dibatalkan" ? "font-bold" : ""
						}`}>
						<span
							className={`flex-grow text-center ${
								activeButton === "Dibatalkan" ? "font-bold" : ""
							}`}>
							Dibatalkan
						</span>
					</button>
				</div>
				{loading ? (
					<div className="text-center py-10">Loading...</div>
				) : filteredData.length === 0 ? (
					<div className="flex flex-col justify-center items-center py-24">
						<Image
							src={EmptyPesananDibatalkanIcon}
							alt="Empty"
							width={150}
							height={150}
						/>
						<p className="text-[#0F6C72] text-lg mt-4">
							Tidak ada pesanan yang dibatalkan
						</p>
					</div>
				) : (
					<>
						<div>
							{filteredData.map((item) => (
								<PesananDibatalkanItem key={item.id} item={item} />
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

export default PesananDibatalkanPage;
