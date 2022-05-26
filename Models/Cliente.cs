using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace Ophelia.Models
{
    [Table("Cliente")]
    public partial class Cliente
    {
        public Cliente()
        {
            facturas = new HashSet<Factura>();
        }

        [Key]
        [Column("id")]
        public int id { get; set; }
        [Required]
        [Column("nombre")]
        [StringLength(255)]
        public string nombre { get; set; }
        [Column("edad")]
        public int edad { get; set; }

        [InverseProperty(nameof(Factura.IdClienteNavigation))]
        public virtual ICollection<Factura> facturas { get; set; }
    }
}
