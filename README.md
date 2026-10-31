# Game Shop

Tienda web de videojuegos. El proyecto está construido con HTML, CSS y
JavaScript sin framework para que cada integrante pueda aportar una sección
de forma independiente.

## Estructura

```text
index.html                 Página principal
product.html               Detalle de un producto
cart.html                  Carrito
account.html               Cuenta de usuario
main.css                   Estilos globales
main.js                    JavaScript global
Features/                  Estilos específicos por funcionalidad
```

## Flujo de trabajo

`main` debe mantenerse estable. Cada tarea se desarrolla en una rama propia
creada desde `main`:

```bash
git switch main
git pull origin main
git switch -c feature/nombre-de-la-tarea
```

Ejemplos de nombres:

```text
feature/home-page
feature/catalog
feature/product-page
feature/cart
feature/account
```

Al terminar, sube la rama y abre un Pull Request hacia `main`:

```bash
git add .
git commit -m "Añade estructura del catálogo"
git push -u origin feature/catalog
```

No se debe hacer `push` directamente a `main`. Antes de fusionar, otra
persona debe revisar el Pull Request y comprobar la página en el navegador.

## Convenciones

- Usa HTML semántico (`header`, `nav`, `main`, `section`, `article` y `footer`).
- Usa nombres de clases en minúsculas y `kebab-case`.
- Mantén los estilos específicos dentro de `Features/`.
- Usa `main.css` solo para estilos globales compartidos.
- No uses estilos inline.
- Añade `alt` descriptivo a las imágenes.
- Si una tarea requiere modificar un archivo compartido, indícalo en el Pull
  Request para coordinarlo con el resto del equipo.

## Comprobación local

Abre `index.html` en un navegador o usa una extensión de servidor local de
VS Code. Revisa los enlaces, la consola del navegador y la vista móvil antes
de crear el Pull Request.
