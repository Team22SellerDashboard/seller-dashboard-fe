"use client";

import React from "react";
import Link from "next/link";

interface OrderCardProps {
	title: string;
	count: number;
	linkTo: string;
}

const OrderCard: React.FC<OrderCardProps> = ({ title, count, linkTo }) => {
	return (
		<Link
			href={linkTo}
			className="flex flex-col justify-between bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
			<div className="flex justify-between items-center">
				<span className="text-black text-base font-normal">{title}</span>
				<span className="text-lg text-gray-500">&#8250;</span>
			</div>
			<div className="text-black text-2xl font-bold mt-2">{count}</div>
		</Link>
	);
};

export default OrderCard;
