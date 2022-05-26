import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Cliente } from '../models/Cliente';
import { TouchSequence } from 'selenium-webdriver';
import { Factura } from '../models/Factura';
import { DetalleFactura } from '../models/DetalleFactura';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  constructor(private http: HttpClient) { }

  getFacturas(){
    return this.http.get(environment.apiUrl + "api/Facturacion/GetFacturas")
  }

  getDetalleFactura(idFactura: number){
    return this.http.get(environment.apiUrl + "api/Facturacion/GetDetalleFactura/" + idFactura)
  }

  crearCliente(cliente: Cliente){
    return this.http.post(environment.apiUrl + "api/facturacion/CrearCliente",cliente)
  }

  getClientes(){
    return this.http.get(environment.apiUrl + "api/Facturacion/GetClientes")
  }

  crearFactura(factura: Factura){
    return this.http.post(environment.apiUrl + "api/facturacion/CrearFactura",factura)
  }

  crearDetalleFactura(detalleFactura: DetalleFactura[]){
    return this.http.post(environment.apiUrl + "api/facturacion/CrearDetalleFactura",detalleFactura)
  }
}
