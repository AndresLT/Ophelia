using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Ophelia.Models
{
    [Table("Ventas_Productos_Año")]
    public partial class VentasProductosAño
    {
        [Key]
        [Column("id")]
        public int id { get; set; }
        [Column("idProducto")]
        public int? idProducto { get; set; }
        [Column("cantidad")]
        public int cantidad { get; set; }
        [Required]
        [Column("año")]
        [StringLength(5)]
        public string año { get; set; }

        [ForeignKey(nameof(idProducto))]
        [InverseProperty(nameof(Producto.VentasProductosAños))]
        public virtual Producto IdProductoNavigation { get; set; }
    }
}
