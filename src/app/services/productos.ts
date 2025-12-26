import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private inicial: Producto[] = [
    {
      id: 1,
      nombre: 'iPhone 15 (128 GB)',
      precio: 1999900,
      descripcion: 'Apple iPhone 15, 6.1", USB-C, cámara 48 MP.',
      fechaAlta: new Date(2025, 0, 10).toISOString(),
      imagenUrl:
        'https://upload.wikimedia.org/wikipedia/commons/4/48/Apple_iPhone_15.jpg',
    },
    {
      id: 2,
      nombre: 'iPhone 15 Pro (128 GB)',
      precio: 1160000,
      descripcion: 'Apple iPhone 15 Pro, titanio, chip A17 Pro, Action Button.',
      fechaAlta: new Date(2025, 1, 20).toISOString(),
      imagenUrl:
        'https://upload.wikimedia.org/wikipedia/commons/1/19/Apple_iPhone_15_Pro.jpg',
    },
    {
      id: 3,
      nombre: 'Samsung Galaxy S24 (128 GB)',
      precio: 1589205,
      descripcion: 'Samsung Galaxy S24, 6.2", cámara triple, gama alta compacta.',
      fechaAlta: new Date(2025, 2, 30).toISOString(),
      imagenUrl:
        'https://upload.wikimedia.org/wikipedia/commons/c/c3/Samsung_Galaxy_S24.jpg',
    },
    {
      id: 4,
      nombre: 'Samsung Galaxy S24 Ultra (256 GB)',
      precio: 2190000,
      descripcion: 'Samsung Galaxy S24 Ultra, S Pen, zoom avanzado, tope de gama.',
      fechaAlta: new Date(2025, 3, 12).toISOString(),
      imagenUrl:
        'https://upload.wikimedia.org/wikipedia/commons/8/8e/Samsung_Galaxy_S24_Ultra.jpg',
    },
    {
      id: 5,
      nombre: 'Google Pixel 8 (128 GB)',
      precio: 1903668,
      descripcion: 'Google Pixel 8, enfoque en foto + Android puro.',
      fechaAlta: new Date(2025, 4, 5).toISOString(),
      imagenUrl:
        'https://upload.wikimedia.org/wikipedia/commons/5/5c/Google_Pixel_8_Rose_front.jpg',
    },
  ];

  private productosSubject = new BehaviorSubject<Producto[]>([...this.inicial]);
  private nextId = Math.max(...this.inicial.map((product) => product.id)) + 1;

  constructor() {}

  getProductos(): Observable<Producto[]> {
    return this.productosSubject.asObservable();
  }

  addProduct(producto_parcial: Partial<Producto>) {
    const productos_actuales = this.productosSubject.getValue();
    const new_id = this.nextId++;

    const new_producto: Producto = {
      id: new_id,
      nombre: producto_parcial.nombre || '',
      precio: producto_parcial.precio ?? 0,
      descripcion: producto_parcial.descripcion,
      fechaAlta: producto_parcial.fechaAlta || new Date().toISOString(),
      imagenUrl: producto_parcial.imagenUrl,
    };

    this.productosSubject.next([new_producto, ...productos_actuales]);
  }

  deleteProducto(product_id: number) {
    const productos_filtrados = this.productosSubject
      .getValue()
      .filter((product) => product.id !== product_id);

    this.productosSubject.next(productos_filtrados);
  }

  reset() {
    this.productosSubject.next([...this.inicial]);
    this.nextId = Math.max(...this.inicial.map((product) => product.id)) + 1;
  }
}
