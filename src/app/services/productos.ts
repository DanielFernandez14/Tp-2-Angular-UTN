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
      nombre: 'Producto A',
      precio: 100,
      descripcion: 'Descripción del Producto A',
      fechaAlta: new Date(2025, 0, 10).toISOString(),    
    },
    {
      id: 2,
      nombre: 'Producto B',
      precio: 200,
      descripcion: 'Descripción del Producto B',
      fechaAlta: new Date(2025, 1, 20).toISOString(),    
    },
    {
      id: 3,
      nombre: 'Producto C',
      precio: 300,
      descripcion: 'Descripción del Producto C',
      fechaAlta: new Date(2025, 2, 30).toISOString(),    
    }
  ]

  private productosSubject = new BehaviorSubject<Producto[]>([...this.inicial]);

  private nextId = Math.max(...this.inicial.map(product => product.id)) + 1;

  constructor() {}

  getProductos() : Observable<Producto[]> {
    return this.productosSubject.asObservable();
  }

  addProduct (producto_parcial: Partial<Producto>){
    const productos_actuales = this.productosSubject.getValue();
    const new_id = this.nextId ++
    const new_producto: Producto = {
      id: new_id,
      nombre: producto_parcial.nombre || '',
      precio: producto_parcial.precio ?? 0,
      descripcion: producto_parcial.descripcion,
      fechaAlta: producto_parcial.fechaAlta || new Date().toISOString(),
    }

    this.productosSubject.next([... productos_actuales, new_producto])
  }

  deleteProducto (product_id: number){
    const productos_filtrados = this.productosSubject.getValue().filter(product => product.id !== product_id)
    
    this.productosSubject.next(productos_filtrados)
  }

  reset (){
    this.productosSubject.next([...this.inicial])
    this.nextId = Math.max(...this.inicial.map(product => product.id)) + 1;
  }
}
