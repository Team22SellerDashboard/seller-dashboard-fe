"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoPadiUMKM from "../assets/images/LogoPadiUMKM.png";
import IconProfile from "../assets/icons/Profil.svg";
import IconNotification from "../assets/icons/Notification.svg";
import IconMail from "../assets/icons/Mail.svg";

const Header = () => {
	return (
		<header className="fixed top-0 left-0 w-full bg-white h-[80px] shadow flex items-center justify-between px-6 z-50">
			<div className="flex items-center">
				<Link href="/">
					<Image
						src={LogoPadiUMKM}
						alt="Logo PaDi UMKM"
						className="w-[113px] h-[54px]"
					/>
				</Link>
			</div>

			<div className="flex items-center gap-4">
				<Link href="/notification">
					<Image
						src={IconNotification}
						alt="Bell Notification"
						className="w-8 h-8 mr-4"
					/>
				</Link>
				<Link href="/mail">
					<Image src={IconMail} alt="Mail" className="w-8 h-8" />
				</Link>

				<div className="h-14 border-l border-gray-300 mx-4"></div>

				<Link href="/profile">
					<Image src={IconProfile} alt="Profile" className="w-8 h-8" />
				</Link>
			</div>
		</header>
	);
};

export default Header;
