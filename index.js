const express = require("express");
const cors = require("cors");
const app = express();
const { Pool } = require("pg");
app.use(express.json());
app.use(cors());

app.listen(3000, console.log("SERVIDOR ENCENDIDO EN PUERTO 3000"));

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "likeme",
  password: "postgres",
  port: 5432,
  allowExitOnIdle: true,
});

app.get("/posts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.log("Error de servidor");
    res.status(500).json({ message: "Error de servidor" });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, img, descripcion } = req.body;
    const likes = 0;
    const result = await pool.query(
      "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING id",
      [titulo, img, descripcion, likes]
    );
    const object = {
      id: result.rows[0].id,
      titulo: titulo,
      img: img,
      descripcion: descripcion,
      likes: likes,
    };
    res.json(object);
  } catch (error) {
    console.log("Error de servidor");
    res.status(500).json({ message: "Error de servidor" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      console.log("No se encontró el post");
      res.status(404).json({ message: "No se encontró el post" });
    } else {
      console.log("Post eliminado correctamente");
      res.status(200).json({ message: "Post eliminado correctamente" });
    }
  } catch (error) {
    console.log("Error de servidor");
    res.status(500).json({ message: "Error de servidor" });
  }
});

app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "UPDATE posts SET likes = likes + 1 WHERE id = $1",
      [id]
    );
    if (result.rowCount === 0) {
      console.log("No se encontró el post");
      res.status(404).json({ message: "No se encontró el post" });
    } else {
      console.log("Like añadido");
      res.status(200).json({ message: "Like añadido correctamente" });
    }
  } catch (error) {
    console.log("Error de servidor");
    res.status(500).json({ message: "Error de servidor" });
  }
});
