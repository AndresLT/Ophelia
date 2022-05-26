using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Ophelia.Models
{
    [Table("Factura")]
    public partial class Factura
    {
        public Factura()
        {
            DetalleFacturas = new HashSet<DetalleFactura>();
        }

        [Key]
        [Column("id")]
        public int id { get; set; }
        [Column("idCliente")]
        public int? idCliente { get; set; }
        [Column("fecha")]
        public DateTime fecha { get; set; }
        [Column("valor")]
        public int valor { get; set; }

        [ForeignKey(nameof(idCliente))]
        [InverseProperty(nameof(Cliente.facturas))]
        public virtual Cliente IdClienteNavigation { get; set; }
        [InverseProperty(nameof(DetalleFactura.IdFacturaNavigation))]
        public virtual ICollection<DetalleFactura> DetalleFacturas { get; set; }
    }
}
