using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Ophelia.Models
{
    [Table("Producto")]
    public partial class Producto
    {
        public Producto()
        {
            DetalleFacturas = new HashSet<DetalleFactura>();
            VentasProductosAños = new HashSet<VentasProductosAño>();
        }

        [Key]
        [Column("id")]
        public int id { get; set; }
        [Required]
        [Column("nombre")]
        [StringLength(255)]
        public string nombre { get; set; }
        [Column("inventario")]
        public int inventario { get; set; }
        [Column("valor")]
        public int valor { get; set; }

        [InverseProperty(nameof(DetalleFactura.IdProductoNavigation))]
        public virtual ICollection<DetalleFactura> DetalleFacturas { get; set; }
        [InverseProperty(nameof(VentasProductosAño.IdProductoNavigation))]
        public virtual ICollection<VentasProductosAño> VentasProductosAños { get; set; }
    }
}
