import { Component } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/productos';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DescuentoPipe } from '../../pipes/descuento-pipe';

@Component({
  selector: 'app-lista-productos',
  imports: [CommonModule, DescuentoPipe],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})
export class ListaProductos {
  products: Producto[] = [];
  loading: boolean = true;
  porcentaje_descuento: number = 10; 
  private sub? : Subscription;

  constructor(private ProductoService: ProductoService) {}

  ngOnInit() {
    this.sub = this.ProductoService.getProductos().subscribe(
      (productos_lista) => {
        this.products = productos_lista;
        this.loading = false; 
      }
    )
  }
  eliminar(product_id: number){
    this.ProductoService.deleteProducto(product_id)
  }

  simularAgregarProducto(){
    this.ProductoService.addProduct(
    {
      nombre: 'Producto test',
      descripcion: 'Descripcion test',
      precio: 150,
      fechaAlta: new Date().toISOString(),
    }
  )
}

limpiar(){
    this.products.forEach((product ) => this.ProductoService.deleteProducto (product.id) )
  }
}

