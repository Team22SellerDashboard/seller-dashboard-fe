"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import FilterIcon from "../../assets/icons/Filter.svg";
import PesananLayout from "../../layouts/PesananLayout";
import PesananBaruItem from "../../components/PesananBaruItem";
import { PesananBaruItemProps } from "../../components/PesananBaruItem";
import { PesananBaruData } from "../../data/PesananBaruData";
import EmptyPesananBaruIcon from "../../assets/icons/EmptyPesananBaru.svg";

const PesananBaruPage: React.FC = () => {
	const [activeButton, setActiveButton] = useState("Semua");
	const [selectedDropdownOption, setSelectedDropdownOption] =
		useState<string>("Filter");
	const [pesananBaruData, setPesananBaruData] = useState<
		PesananBaruItemProps["item"][]
	>([]);
	const [filteredData, setFilteredData] = useState<
		PesananBaruItemProps["item"][]
	>([]);
	const [currentPage, setCurrentPage] = useState(PesananBaruData.page);
	const [totalPages, setTotalPages] = useState(PesananBaruData.totalPages);

	const commonButtonStyles =
		"inline-flex justify-between w-full rounded-lg shadow-sm px-4 py-2 bg-gradient-to-r from-[#009EA9] to-[#0F6C72] text-white text-sm font-medium";

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Uncomment when fetching from the real API
				// const response = await axios.get(`http://localhost:8080/baru/all?page=${currentPage}&limit=10`);
				// setPesananBaruData(response.data.data);
				// setFilteredData(response.data.data);
				// setTotalPages(response.data.totalPages);
				// console.log("Data fetched from API");
			} catch (error) {
				console.error("Error fetching data", error);
				setPesananBaruData([]);
			} finally {
				// Get mock data

				const paginatedData = paginateData(
					PesananBaruData.data,
					currentPage,
					PesananBaruData.limit
				);
				setPesananBaruData(paginatedData);
				setFilteredData(paginatedData);
				setTotalPages(PesananBaruData.totalPages);
			}
		};

		fetchData();
	}, [currentPage]);

	const handleButtonClick = (button: string) => {
		setActiveButton(button);
		setSelectedDropdownOption("");
		if (button === "Semua") {
			setFilteredData(pesananBaruData);
		}
	};

	const handleFilterSelect = (filter: string) => {
		setActiveButton("Filter");
		setSelectedDropdownOption("Filter");
		applyFilter(filter);
	};

	const applyFilter = (filter: string) => {
		let filtered = pesananBaruData;

		if (filter === "Terbaru selama 1 hari terakhir") {
			filtered = filterByDays(1);
		} else if (filter === "Terbaru selama 7 hari terakhir") {
			filtered = filterByDays(7);
		} else if (filter === "Terbaru selama 30 hari terakhir") {
			filtered = filterByDays(30);
		}

		setFilteredData(filtered);
	};

	const filterByDays = (days: number) => {
		const now = new Date();
		return pesananBaruData.filter((item) => {
			const deadlineDate = new Date(item.deadline);
			const diffTime = Math.abs(now.getTime() - deadlineDate.getTime());
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
			return diffDays <= days;
		});
	};

	const paginateData = (
		data: PesananBaruItemProps["item"][],
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
						className={`${commonButtonStyles} basis-1/2 ${
							activeButton === "Semua" ? "font-bold" : ""
						}`}>
						<span
							className={`flex-grow text-center ${
								activeButton === "Semua" ? "font-bold" : ""
							}`}>
							Semua
						</span>
						<svg
							className="h-5 w-5"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>

					<Menu as="div" className="relative inline-block text-left basis-1/2">
						<div>
							<Menu.Button
								className={`${commonButtonStyles} w-full ${
									activeButton === "Filter" ? "font-bold" : ""
								}`}>
								<span
									className={`flex-grow text-center ${
										activeButton === "Filter" ? "font-bold" : ""
									}`}>
									{selectedDropdownOption || "Filter"}{" "}
								</span>
								<Image src={FilterIcon} alt="Filter" className="w-5 h-5 mr-2" />
							</Menu.Button>
						</div>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95">
							<Menu.Items className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-[#575454] ring-1 ring-black ring-opacity-5 focus:outline-none">
								<div className="py-1">
									<Menu.Item>
										{({ active }: { active: boolean }) => (
											<a
												href="#"
												onClick={() =>
													handleFilterSelect("Terbaru selama 1 hari terakhir")
												}
												className={`${
													selectedDropdownOption ===
														"Terbaru selama 1 hari terakhir" || active
														? "font-bold bg-[#404040] text-white"
														: "text-white"
												} block px-4 py-2 text-sm border-b border-white text-center`}>
												Terbaru selama 1 hari terakhir
											</a>
										)}
									</Menu.Item>
									<Menu.Item>
										{({ active }: { active: boolean }) => (
											<a
												href="#"
												onClick={() =>
													handleFilterSelect("Terbaru selama 7 hari terakhir")
												}
												className={`${
													selectedDropdownOption ===
														"Terbaru selama 7 hari terakhir" || active
														? "font-bold bg-[#404040] text-white"
														: "text-white"
												} block px-4 py-2 text-sm border-b border-white text-center`}>
												Terbaru selama 7 hari terakhir
											</a>
										)}
									</Menu.Item>
									<Menu.Item>
										{({ active }: { active: boolean }) => (
											<a
												href="#"
												onClick={() =>
													handleFilterSelect("Terbaru selama 30 hari terakhir")
												}
												className={`${
													selectedDropdownOption ===
														"Terbaru selama 30 hari terakhir" || active
														? "font-bold bg-[#404040] text-white"
														: "text-white"
												} block px-4 py-2 text-sm text-center`}>
												Terbaru selama 30 hari terakhir
											</a>
										)}
									</Menu.Item>
								</div>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>

				{filteredData.length === 0 ? (
					<div className="flex flex-col justify-center items-center py-24">
						<Image
							src={EmptyPesananBaruIcon}
							alt="Empty Box"
							width={150}
							height={150}
						/>
						<p className="text-[#0F6C72] text-lg mt-4">
							Tidak ada pesanan baru
						</p>
					</div>
				) : (
					<>
						<div>
							{filteredData.map((item) => (
								<PesananBaruItem key={item.id} item={item} />
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

export default PesananBaruPage;
