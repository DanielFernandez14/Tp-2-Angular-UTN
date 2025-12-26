import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descuento',
  standalone: true,
})
export class DescuentoPipe implements PipeTransform {

  transform(precio: number, porcentaje: number = 0): number {
    if(precio === null || isNaN(precio) || porcentaje === null || isNaN(porcentaje)) {
      return precio
  }
  const precio_final = precio - (precio * porcentaje /100)
  return Math.round (precio_final * 100) / 100;
  }
}
