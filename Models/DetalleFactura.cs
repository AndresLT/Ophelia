using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Ophelia.Models
{
    [Table("Detalle_Factura")]
    public partial class DetalleFactura
    {
        [Key]
        [Column("id")]
        public int id { get; set; }
        [Column("idFactura")]
        public int? idFactura { get; set; }
        [Column("idProducto")]
        public int? idProducto { get; set; }
        [Column("cantidad")]
        public int cantidad { get; set; }
        [Column("valor")]
        public int valor { get; set; }

        [ForeignKey(nameof(idFactura))]
        [InverseProperty(nameof(Factura.DetalleFacturas))]
        public virtual Factura IdFacturaNavigation { get; set; }
        [ForeignKey(nameof(idProducto))]
        [InverseProperty(nameof(Producto.DetalleFacturas))]
        public virtual Producto IdProductoNavigation { get; set; }
    }
}
