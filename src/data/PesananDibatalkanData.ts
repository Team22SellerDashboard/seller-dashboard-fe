import staplerImg from "../assets/images/stapler.png";
import ordnerImg from "../assets/images/ordner.png";
import buyer1Img from "../assets/images/buyer1.png";
import buyer2Img from "../assets/images/buyer2.png";

export const PesananDibatalkanData = {
	data: Array.from({ length: 100 }, (_, index) => ({
		id: index + 1,
		name:
			index % 2 === 0
				? "Stapler Besar BANTEX"
				: "Ordner BANTEX Lever Arch File PVC A4 7 cm",
		variation: index % 2 === 0 ? "Warna Putih" : "Warna Biru",
		cancelationOrderNumber: `#24082${index}MV${String.fromCharCode(
			65 + (index % 26)
		)}${String.fromCharCode(65 + ((index + 1) % 26))}${String.fromCharCode(
			65 + ((index + 2) % 26)
		)}`,
		imageUrl: index % 2 === 0 ? staplerImg : ordnerImg,
		buyerUsername: index % 2 === 0 ? "buyer1" : "buyer2",
		buyerImageUrl: index % 2 === 0 ? buyer1Img : buyer2Img,
		status: index % 2 === 0 ? "Dibatalkan" : "Menunggu Respon",
		askedBy: index % 2 === 0 ? "Pembeli" : "Penjual",
		reason:
			index % 2 === 0
				? "Ingin memasukkan/mengubah kode voucher"
				: "Tidak sesuai dengan deskripsi",
		paymentMethod: index % 2 === 0 ? "Belum Bayar" : "Transfer Bank",
		cancelationDate: `2024-08-${(index % 30) + 1}`,
	})),
	page: 1,
	limit: 10,
	total: 100,
	totalPages: 10,
};
