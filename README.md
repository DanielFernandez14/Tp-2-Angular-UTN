# TP 2 — Angular UTN

Aplicación en Angular que gestiona una lista de productos (celulares) usando un **servicio** con datos simulados (array local), aplicando **pipes estándar** (`currency`, `date`) y un **pipe personalizado** (`descuento`) para calcular el precio final con descuento. Incluye búsqueda, formulario de alta y eliminación con confirmación.

> **Autor:** Daniel Matías Fernández

---

## Funcionalidades principales

- **Servicio `ProductoService`**
  - `getProductos()` → retorna la lista como `Observable<Producto[]>`.
  - `addProduct(...)` → agrega un producto **al inicio** de la lista.
  - `deleteProducto(id)` → elimina un producto por ID.
  - `reset()` → restablece la lista inicial.
- **Componente `ListaProductos`**
  - Inyección del servicio y carga inicial con `ngOnInit`.
  - Estado de carga (`loading`).
  - Buscador por nombre/descripcion (normalizado: minúsculas + sin tildes).
  - Formulario para agregar un producto nuevo.
  - Confirmación nativa (`window.confirm`) al eliminar y al limpiar lista.
- **Pipes**
  - `currency:'ARS'` para precios.
  - `date:'dd/MM/yyyy'` para fecha de alta.
  - Pipe personalizado `descuento` para precio final con porcentaje configurable.

---

## Tecnologías

- Angular (standalone components)
- TypeScript
- RxJS (`BehaviorSubject`, `Observable`)
- HTML + CSS

---

##  Instalación y ejecución

### 1: Clonar el repositorio
```bash
git clone <https://github.com/DanielFernandez14/Tp-2-Angular-UTN> 
```

### 2) Instalar dependencias
```
npm install
```


### 3) Levantar en desarrollo
```
ng serve
```