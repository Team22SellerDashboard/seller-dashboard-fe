import staplerImg from "../assets/images/stapler.png";
import ordnerImg from "../assets/images/ordner.png";
import buyer1Img from "../assets/images/buyer1.png";
import buyer2Img from "../assets/images/buyer2.png";

export const PesananDikirimData = {
	data: Array.from({ length: 100 }, (_, index) => ({
		id: index + 1,
		name:
			index % 2 === 0
				? "Stapler Besar BANTEX"
				: "Ordner BANTEX Lever Arch File PVC A4 7 cm",
		variation: index % 2 === 0 ? "Warna Putih" : "Warna Biru",
		price: `Rp${(Math.random() * 100000).toFixed(0)}`,
		quantity: Math.floor(Math.random() * 10) + 1,
		total: `Rp${(Math.random() * 100000).toFixed(0)}`,
		orderNumber: `#24082${index}MV${String.fromCharCode(
			65 + (index % 26)
		)}${String.fromCharCode(65 + ((index + 1) % 26))}${String.fromCharCode(
			65 + ((index + 2) % 26)
		)}`,
		imageUrl: index % 2 === 0 ? staplerImg : ordnerImg,
		buyerUsername: index % 2 === 0 ? "buyer1" : "buyer2",
		buyerImageUrl: index % 2 === 0 ? buyer1Img : buyer2Img,
		status: index % 2 === 0 ? "Perlu Dikirim" : "Telah Dikirim",
		deadlineDate: `2024-09-${(index % 30) + 1}`,
		pickupDate: index % 2 === 0 ? "" : `2024-09-${(index % 30) + 2}`,
	})),
	page: 1,
	limit: 10,
	total: 100,
	totalPages: 10,
};
