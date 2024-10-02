import { Router } from 'express';
import { getConnection } from './db';


const router = Router();

// Obtener todos los elementos
router.get('/items', async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const rows = await conn.query('SELECT * FROM items');
    res.json(rows);
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.end();
  }
});

// Crear un nuevo elemento
router.post('/items', async (req, res) => {
  const { name, description } = req.body;
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.query(
      'INSERT INTO items (name, description) VALUES (?, ?)',
      [name, description]
    );
    res.json({ id: result.insertId.toString(), name, description });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.end();
  }
});

// Actualizar un elemento
router.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  let conn;
  try {
    conn = await getConnection();
    await conn.query(
      'UPDATE items SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );
    res.json({ id, name, description });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.end();
  }
});

// Eliminar un elemento
router.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  let conn;
  try {
    conn = await getConnection();
    await conn.query('DELETE FROM items WHERE id = ?', [id]);
    res.json({ message: `Item with id ${id} deleted` });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.end();
  }
});

export default router;
