const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/lokasi", async (req, res) => {
    // Ambil nama kota dari query parameter, default ke "Jakarta" jika kosong
    const kota = req.query.q || req.query.kota || "Jakarta";
    const apiKey = "TmW3n2IbOKaZxkghOoYB";

    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(kota)}.json?key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // Cek jika hasil pencarian ditemukan
        if (!data.features || data.features.length === 0) {
            return res.status(404).json({
                message: "Lokasi tidak ditemukan"
            });
        }

        const feature = data.features[0];

        // Format respon agar sesuai dengan kebutuhan UI
        res.json({
            place_name: feature.place_name || "-",
            matching_text: feature.matching_text || feature.text || "-",
            tipe: feature.place_type ? feature.place_type[0] : "-",
            koordinat: feature.geometry ? feature.geometry.coordinates : []
        });

    } catch (error) {
        console.error("Geocoding Error:", error.message);
        res.status(500).json({
            message: "Gagal mengambil data dari MapTiler"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});