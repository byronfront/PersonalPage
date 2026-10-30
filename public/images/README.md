# Imágenes

## Retrato

Coloca aquí tres archivos con el mismo nombre base y activa el retrato en `src/content/profile.ts`:

```
public/images/byron-cardona-800.avif
public/images/byron-cardona-800.webp
public/images/byron-cardona-1400.webp
```

```ts
portrait: {
  src: "/images/byron-cardona",
  width: 1400,
  height: 1750,
  focus: "50% 30%",
}
```

Proporción recomendada: 4:5. `focus` es el `object-position` CSS.

## Proyectos

`public/images/projects/{slug}/cover.webp` y, si hace falta, más archivos en la misma carpeta. Las rutas se declaran en `src/content/projects.ts`.
