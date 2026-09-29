app.get("/api/lokasi", async (req, res) => {
    // Ambil nama kota dari query parameter, default ke "Jakarta" jika kosong
    const kota = req.query.q || req.query.kota || "Jakarta";
    const apiKey = "TmW3n2IbOKaZxkghOoYB";

    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(kota)}.json?key=${apiKey}`;
});
