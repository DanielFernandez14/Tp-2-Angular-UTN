import { Component } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/productos';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DescuentoPipe } from '../../pipes/descuento-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-productos',
  imports: [CommonModule, DescuentoPipe, FormsModule],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})
export class ListaProductos {
  products: Producto[] = [];
  loading: boolean = true;
  porcentaje_descuento: number = 10;
  private sub?: Subscription;

  searchTerm: string = '';

  showForm: boolean = false;
  formNombre: string = '';
  formDescripcion: string = '';
  formPrecio: number | null = null;

  readonly imagenGenerica: string = '/ultimate%20celu.jpg';

  constructor(private ProductoService: ProductoService) {}

  ngOnInit() {
    this.sub = this.ProductoService.getProductos().subscribe((productos_lista) => {
      this.products = productos_lista;
      this.loading = false;
    });
  }

  onSearch(value: string) {
    this.searchTerm = value;
  }

  get filteredProducts(): Producto[] {
    const term = this.normalize(this.searchTerm);

    if (!term) return this.products;

    return this.products.filter((p) => {
      const nombre = this.normalize(p.nombre);
      const desc = this.normalize(p.descripcion);
      return nombre.includes(term) || desc.includes(term);
    });
  }

  private normalize(value: string | null | undefined): string {
    return (value ?? '')
      .toString()
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  eliminar(product_id: number) {
    const producto = this.products.find((p) => p.id === product_id);
    const ok = window.confirm(
      `¿Seguro que querés eliminar ${producto ? `"${producto.nombre}"` : 'este producto'}?`
    );
    if (!ok) return;
    this.ProductoService.deleteProducto(product_id);
  }

  limpiar() {
    if (this.products.length === 0) return;
    const ok = window.confirm(`Vas a eliminar ${this.products.length} producto(s). ¿Confirmás?`);
    if (!ok) return;
    this.products.forEach((product) => this.ProductoService.deleteProducto(product.id));
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) this.resetForm();
  }

  resetForm() {
    this.formNombre = '';
    this.formDescripcion = '';
    this.formPrecio = null;
  }

  agregarDesdeForm() {
    const nombre = this.formNombre.trim();
    const descripcion = this.formDescripcion.trim();
    const precio = Number(this.formPrecio);

    if (!nombre) return;
    if (!Number.isFinite(precio) || precio <= 0) return;

    this.ProductoService.addProduct({
      nombre,
      descripcion,
      precio,
      fechaAlta: new Date().toISOString(),
      imagenUrl: this.imagenGenerica,
    });

    this.resetForm();
    this.showForm = false;
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
