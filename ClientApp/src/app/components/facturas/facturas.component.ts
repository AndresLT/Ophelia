import { Component, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { Factura } from '../../models/Factura';
import { FacturacionService } from '../../services/facturacion.service';
import { Cliente } from '../../models/Cliente';
import { DetalleFactura } from '../../models/DetalleFactura';
import { DxPopupModule, DxButtonModule, DxTemplateModule } from 'devextreme-angular';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  facturas: Factura[] = []
  clientes: Cliente[] = []

  facturaSeleccionada: Factura;
  idexFacturaSeleccionada=0;
  detallesFacturas: DetalleFactura[] = []
  detalleFacturaSeleccionada: DetalleFactura[] = []

  autoNavigateToFocusedRow = true;

  popupVisible = false;
  closeButtonOptions: any;
  
  showFilterRow: boolean = true;
  showHeaderFilter: boolean;
  currentFilter: any;
  applyFilterTypes: any;
  saleAmountHeaderFilter: any;
  constructor(public facturacionServ: FacturacionService,
              ) {
    const that = this
    this.applyFilterTypes = [{
      key: 'auto',
      name: 'Immediately',
    }, {
      key: 'onClick',
      name: 'On Button Click',
    }];
    this.currentFilter = this.applyFilterTypes[0].key;
    this.closeButtonOptions = {
      text: 'Cerrar',
      onClick(e) {
        that.popupVisible = false;
      },
    };
    this.facturaSeleccionada = new Factura
   }

  ngOnInit() {
    this.getFacturas()
    this.getDetallesFacturas()
  }

  getNombre(rowData){
    if(rowData.idCliente == 1){
      return "Hernando Quintero"
    }else if(rowData.idCliente == 2){
      return "Claudia Zamudio"
    }else if(rowData.idCliente == 3){
      return "Lizeth Carvajal"
    }else if(rowData.idCliente == 4){
      return "Victor Suarez"
    }else if(rowData.idCliente == 5){
      return "Sofía Ortega"
    }else if(rowData.idCliente == 6){
      return "Luis Puentes"
    }else if(rowData.idCliente == 7){
      return "Paula Rosales"
    }else if(rowData.idCliente == 8){
      return "Omar Torres"
    }else{
      return rowData.idCliente
    }
  }

  getNombreProducto(rowData){
    if(rowData.idProducto == 1){
      return "iPhone 11"
    }else if(rowData.idProducto == 2){
      return "Xiaomi 11"
    }else if(rowData.idProducto == 3){
      return "Samsung Galaxy S20"
    }else if(rowData.idProducto == 4){
      return "Xiaomi SmartBand 6"
    }else if(rowData.idProducto == 5){
      return "Huawei Band 6"
    }else if(rowData.idProducto == 6){
      return "Apple Watch SE"
    }else if(rowData.idProducto == 7){
      return "Apple Airpods Pro"
    }else if(rowData.idProducto == 8){
      return "Apple Earpods Lighting"
    }else if(rowData.idProducto == 9){
      return "Apple Earpods 3.5mm"
    }else if(rowData.idProducto == 10){
      return "Diadema JLB Tune	"
    }else if(rowData.idProducto == 11){
      return "Audifonos Samsung Galaxy"
    }else if(rowData.idProducto == 12){
      return "Xiaomi Airdots 3"
    }else if(rowData.idProducto == 13){
      return "Xbox One Series S 512GB"
    }else if(rowData.idProducto == 14){
      return "Nintendo Switch 32GB"
    }else{
      return rowData.idProducto
    }
  }

  getFacturas(){
    this.facturacionServ.getFacturas().subscribe((res:any) => {
      this.facturas = res.facturas
      
    })
  }

  getClientes(){
    this.facturacionServ.getClientes().subscribe((res:any) => {
      this.clientes = res.clientes;
    })
  }

  getDetallesFacturas(){
    this.facturacionServ.getDetallesFacturas().subscribe((res:any) =>{
      this.detallesFacturas = res.detallesFacturas
      
    })
  }

  asignarDetalles(rowData){
    this.detalleFacturaSeleccionada = []
    this.facturaSeleccionada = rowData.row.data
    
    this.detallesFacturas.forEach(detalle => {
      if(detalle.idFactura == this.facturaSeleccionada.id){
        this.detalleFacturaSeleccionada.push(detalle)
      }
    })
    this.popupVisible = true
  }

}
