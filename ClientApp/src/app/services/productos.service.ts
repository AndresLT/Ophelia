import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  getProductos(){
    return this.http.get(environment.apiUrl + "api/Productos/GetProductos")
  }

  crearProducto(producto: Producto){
    return this.http.post(environment.apiUrl + "api/Productos/CrearProducto", producto)
  }

  eliminarProducto(producto: Producto){
    return this.http.post(environment.apiUrl + "api/Productos/EliminarProducto", producto)
  }

  actualizarProducto(producto: Producto){
    return this.http.post(environment.apiUrl + "api/Productos/ActualizarProducto", producto)
  }
}
