import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/Producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = []

  showFilterRow: boolean = true;
  showHeaderFilter: boolean;
  currentFilter: any;
  applyFilterTypes: any;

  constructor(public productosServ: ProductosService) {
    this.applyFilterTypes = [{
      key: 'auto',
      name: 'Immediately',
    }, {
      key: 'onClick',
      name: 'On Button Click',
    }];
    this.currentFilter = this.applyFilterTypes[0].key;
   }

  ngOnInit() {
    this.getProductos()
  }

  getProductos(){
    this.productosServ.getProductos().subscribe((res: any)=>{
      this.productos = res.productos
    })
  }

}
