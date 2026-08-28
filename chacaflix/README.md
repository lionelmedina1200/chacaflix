# Chacaflix

Plataforma estilo Netflix para publicar las clases grabadas del colegio, organizadas por materia.

## Cómo correrlo localmente

```bash
npm install
npm run dev
```

Después abrí la URL que te muestre la terminal (por defecto `http://localhost:5173`).

## Cómo cargar tus videos reales

Toda la data de materias y clases está en `src/App.jsx`, en el array `SUBJECTS` al principio del archivo.
Cada clase tiene esta forma:

```js
{ id: "m1", title: "Ecuaciones lineales", prof: "Prof. García", duration: "38 min", desc: "...", videoUrl: null }
```

- Mientras `videoUrl` esté en `null`, la tarjeta muestra un aviso de "todavía no cargaste el video".
- En cuanto le pongas una URL real (por ejemplo un link directo a un `.mp4`, o un video alojado en tu propio servidor), se reproduce automáticamente en el modal.

## Estructura del proyecto

```
chacaflix/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx     -> punto de entrada de React
    ├── App.jsx      -> toda la app (datos + componentes)
    └── index.css    -> estilos globales base
```

## Deploy

Se puede subir gratis a Vercel, Netlify o GitHub Pages corriendo `npm run build` y publicando la carpeta `dist/`.
