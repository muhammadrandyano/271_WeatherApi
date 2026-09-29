const response = await axios.get(url);
        const data = response.data;

        // Pengecekan jika lokasi tidak ditemukan
        if (!data.features || data.features.length === 0) {
            return res.status(404).json({
                message: "Lokasi tidak ditemukan"
            });
        }