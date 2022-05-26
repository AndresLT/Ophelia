using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Ophelia.Models
{
    public partial class DataDbContext : DbContext
    {
        public DataDbContext()
        {
        }

        public DataDbContext(DbContextOptions<DataDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cliente> Clientes { get; set; }
        public virtual DbSet<DetalleFactura> DetalleFacturas { get; set; }
        public virtual DbSet<Factura> Facturas { get; set; }
        public virtual DbSet<Producto> Productos { get; set; }
        public virtual DbSet<VentasProductosAño> VentasProductosAños { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=DESKTOP-AIE1MOA\\SQLEXPRESS;Database=Ophelia;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS");

            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.Property(e => e.nombre).IsUnicode(false);
            });

            modelBuilder.Entity<DetalleFactura>(entity =>
            {
                entity.HasOne(d => d.IdFacturaNavigation)
                    .WithMany(p => p.DetalleFacturas)
                    .HasForeignKey(d => d.idFactura)
                    .HasConstraintName("FK__Detalle_F__idFac__403A8C7D");

                entity.HasOne(d => d.IdProductoNavigation)
                    .WithMany(p => p.DetalleFacturas)
                    .HasForeignKey(d => d.idProducto)
                    .HasConstraintName("FK__Detalle_F__idPro__412EB0B6");
            });

            modelBuilder.Entity<Factura>(entity =>
            {
                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.facturas)
                    .HasForeignKey(d => d.idCliente)
                    .HasConstraintName("FK__Factura__idClien__3D5E1FD2");
            });

            modelBuilder.Entity<Producto>(entity =>
            {
                entity.Property(e => e.nombre).IsUnicode(false);
            });

            modelBuilder.Entity<VentasProductosAño>(entity =>
            {
                entity.Property(e => e.año).IsUnicode(false);

                entity.HasOne(d => d.IdProductoNavigation)
                    .WithMany(p => p.VentasProductosAños)
                    .HasForeignKey(d => d.idProducto)
                    .HasConstraintName("FK__Ventas_Pr__idPro__4E88ABD4");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
