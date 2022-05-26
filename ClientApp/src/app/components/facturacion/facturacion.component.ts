import { Component, OnInit } from '@angular/core';
import { FacturacionService } from '../../services/facturacion.service';
import { Factura, FacturaCliente } from '../../models/Factura';
import { Producto } from '../../models/Producto';
import { ProductosService } from '../../services/productos.service';
import { DetalleFactura } from '../../models/DetalleFactura';
import { Cliente } from '../../models/Cliente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {
  facturas: Factura[] = []
  factura: Factura
  facturaCliente: FacturaCliente

  detalleFactura: DetalleFactura[] = []

  productos: Producto[] = []
  productosFactura: Producto[] = []

  clientes: Cliente[] = []
  nombresClientes: string[] = []
  constructor(public facturacionServ: FacturacionService, public productosServ: ProductosService) {
    this.factura = new Factura  
    this.factura.valor = 0
    this.facturaCliente = new FacturaCliente
  }

  ngOnInit() {
    this.getFacturas()
    this.getProductos()
    this.getClientes()
    // this.inicializarValores()
  }

  getFacturas(){
    this.facturacionServ.getFacturas().subscribe((res: any) => {
      this.facturas = res.facturas
      console.log('Facturas', this.facturas);
      
    })
  }

  getProductos(){
    
    this.productosServ.getProductos().subscribe((res:any) => {
      this.productos = this.inicializarValores(res.productos)
      
    })
    
  }

  inicializarValores(productos: Producto[]){
    productos.forEach(producto => {
      producto.cantidadFactura = 0
      producto.valorFactura = 0
    });
    return productos
    
  }

  agregarProducto(index: number){
    this.productos[index].cantidadFactura += 1
    this.productos[index].valorFactura = this.productos[index].cantidadFactura * this.productos[index].valor
    this.factura.valor += this.productos[index].valor
  }

  quitarProducto(index: number){
    if(this.productos[index].cantidadFactura == 0){

    }else{
      this.productos[index].cantidadFactura -= 1
      this.productos[index].valorFactura = this.productos[index].cantidadFactura * this.productos[index].valor
      this.factura.valor -= this.productos[index].valor
    }
  }

  getClientes(){
    this.facturacionServ.getClientes().subscribe((res:any) => {
      this.clientes = res.clientes
      this.nombresClientes = res.nombresClientes

    })
  }

  finalizarFactura(){
    Swal.showLoading()
    console.log('Datos iniciales',this.facturaCliente);
    if(this.factura.valor>0){
      if(this.facturaCliente.Cliente){

        let cliente = new Cliente 
        cliente = this.clientes.find(cliente => cliente.nombre == this.facturaCliente.Cliente)
        this.factura.idCliente = cliente.id
        console.log('Factura final',this.factura);
        this.facturacionServ.crearFactura(this.factura).subscribe((res: any) =>{
          
          console.log('res',res);
          
        })
        this.getFacturas()
        this.llenarFactura()
      }else{
        Swal.fire({
          text: 'Debes seleccionar un cliente',
          icon: 'warning'
        })
      }
    }else{
      Swal.fire({
        text: 'La lista de productos se encuentra vacía',
        icon: 'warning'
      })
    }
  }

  llenarFactura(){
    this.detalleFactura = []
    this.productos.forEach(producto =>{
      if(producto.cantidadFactura>0){
        let item = new DetalleFactura
        item.idProducto = producto.id
        item.cantidad = producto.cantidadFactura
        item.valor = producto.cantidadFactura * producto.valor

        this.detalleFactura.push(item)
      }
    })
    console.log('Detalle de factura', this.detalleFactura);
    this.facturacionServ.crearDetalleFactura(this.detalleFactura).subscribe((res:any) => {
      Swal.fire({
        title: res.title,
        text: res.text,
        icon: res.icon
      })
      if(res.icon == "success"){
        this.detalleFactura = []
        this.facturaCliente = new FacturaCliente;
        this.resetValores()
      }
      console.log('res',res);
      
    })
    
  }

  resetValores(){
    for(let i = 0; i<this.productos.length; i++){
      this.productos[i].cantidadFactura = 0
      this.productos[i].valorFactura = 0
    }
    this.factura.valor = 0
    this.facturaCliente.Cliente = ""
  }
}
