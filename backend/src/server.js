import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "anggra-mua-backend" });
});

app.get("/api/services", (req, res) => {
  res.json([
    {
      id: 1,
      key: "wedding",
      label: "Wedding & Engagement",
      priceStart: "mulai 1.500.000"
    },
    {
      id: 2,
      key: "graduation",
      label: "Graduation Makeup",
      priceStart: "mulai 450.000"
    },
    {
      id: 3,
      key: "party",
      label: "Party & Event Makeup",
      priceStart: "mulai 600.000"
    }
  ]);
});

app.post("/api/bookings", (req, res) => {
  const { name, phone, serviceKey, eventDate, notes } = req.body || {};
  const errors = {};

  if (!name || String(name).trim().length < 3) {
    errors.name = "Nama minimal 3 karakter.";
  }

  if (!phone || !/^\d{10,15}$/.test(String(phone).replace(/\D/g, ""))) {
    errors.phone = "Nomor WhatsApp tidak valid (10-15 digit).";
  }

  if (!serviceKey || !["wedding", "graduation", "party"].includes(serviceKey)) {
    errors.serviceKey = "Pilih layanan yang tersedia.";
  }

  if (!eventDate || Number.isNaN(new Date(eventDate).getTime())) {
    errors.eventDate = "Tanggal acara tidak valid.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  return res.status(201).json({
    ok: true,
    message: "Booking berhasil dikirim.",
    data: {
      id: Date.now(),
      name: String(name).trim(),
      phone: String(phone).trim(),
      serviceKey,
      eventDate,
      notes: notes ? String(notes).trim() : ""
    }
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
