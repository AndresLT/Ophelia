import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { Factura } from '../../models/Factura';
import { FacturacionService } from '../../services/facturacion.service';
import { Cliente } from '../../models/Cliente';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  facturas: Factura[] = []
  clientes: Cliente[] = []

  showFilterRow: boolean = true;
  showHeaderFilter: boolean;
  currentFilter: any;
  applyFilterTypes: any;
  saleAmountHeaderFilter: any;
  constructor(public facturacionServ: FacturacionService) {
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
    this.getFacturas()
    // this.getClientes()
  }

  private static getOrderDay(rowData) {
    return (new Date(rowData.OrderDate)).getDay();
  }

  calculateFilterExpression(value, selectedFilterOperations, target) {
    const column = this as any;
    if (target === 'headerFilter' && value === 'weekends') {
      return [[FacturasComponent.getOrderDay, '=', 0], 'or', [FacturasComponent.getOrderDay, '=', 6]];
    }
    return column.defaultCalculateFilterExpression.apply(this, arguments);
  }

  orderHeaderFilter(data) {
    data.dataSource.postProcess = (results) => {
      results.push({
        text: 'Weekends',
        value: 'weekends',
      });
      return results;
    };
  }

  clearFilter() {
    this.dataGrid.instance.clearFilter();
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

  getFacturas(){
    this.facturacionServ.getFacturas().subscribe((res:any) => {
      this.facturas = res.facturas
      console.log(this.facturas);
      
    })
  }

  getClientes(){
    this.facturacionServ.getClientes().subscribe((res:any) => {
      this.clientes = res.clientes;
    })
  }

}
