const feature = data.features[0];

        // Format respon agar sesuai dengan kebutuhan UI
        res.json({
            place_name: feature.place_name || "-",
            matching_text: feature.matching_text || feature.text || "-",
            tipe: feature.place_type ? feature.place_type[0] : "-",
            koordinat: feature.geometry ? feature.geometry.coordinates : []
        });