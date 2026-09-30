// app.js
import express from 'express';
import cors from 'cors';
import pengeluaranRoutes from './routes/pengeluaran.js';
import { pool } from './db.js'; // <-- 1. Tambahkan import pool di sini

const app = express();

app.use(cors());
app.use(express.json());

// 2. Tambahkan route /kategori di bawah express.json()
app.get('/kategori', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nama FROM kategori ORDER BY nama');
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ pesan: 'Gagal mengambil kategori' });
  }
});

// Daftarkan prefix /pengeluaran
app.use('/pengeluaran', pengeluaranRoutes);

export default app;