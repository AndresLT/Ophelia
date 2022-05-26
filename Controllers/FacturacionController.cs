using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ophelia.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ophelia.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FacturacionController : Controller
    {
        private DataDbContext _db;

        public FacturacionController(DataDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public ActionResult GetFacturas()
        {
            var cons = _db.Facturas.ToList();

            return Json(new { facturas = cons });
        }

        [HttpGet("{idFactura}")]
        public ActionResult GetDetalleFactura(int idFactura)
        {
            var cons = _db.DetalleFacturas.Where(x => x.idFactura == idFactura).ToList();

            return Json(new { detalleFactura = cons });
        }

        [HttpPost]
        public ActionResult CrearCliente([FromBody] Cliente cliente)
        {
            var cons = _db.Clientes.Where(x => x.nombre == cliente.nombre).FirstOrDefault();
            if(cons != null)
            {
                return Json(new { icon = "error", text = "Ya existe un cliente con este nombre." });
            }
            else
            {
                _db.Clientes.Add(cliente);
                _db.SaveChanges();

                return Json(new { icon = "success", text = "Usuario creado exitosamente." });
            }
        }

        [HttpGet]
        public ActionResult GetClientes()
        {
            var cons = _db.Clientes.ToList();
            var consNombres = cons.Select(x => x.nombre).ToList();
            return Json(new { clientes = cons, nombresClientes = consNombres });
        }

        [HttpPost]
        public ActionResult CrearFactura([FromBody] Factura factura)
        {
            factura.fecha = DateTime.Now;
            _db.Facturas.Add(factura);
            _db.SaveChanges();

            return Json(new { icon = "success", text = "Factura creada exitosamente." });
        }

        [HttpPost]
        public ActionResult CrearDetalleFactura([FromBody] List<DetalleFactura> detalleFactura)
        {
            foreach (DetalleFactura detalle in detalleFactura)
            {
                var cons = _db.Productos.Where(x => x.id == detalle.idProducto).FirstOrDefault();
                var inventarioRestante = cons.inventario - detalle.cantidad;
                if (inventarioRestante <= 5 && inventarioRestante > 0)
                {
                    cons.inventario = inventarioRestante;

                    var ultimaFactura = _db.Facturas.LastOrDefault();
                    detalle.idFactura = ultimaFactura.id;
                    _db.DetalleFacturas.Add(detalle);
                }
                else if (inventarioRestante > 5)
                {
                    cons.inventario = inventarioRestante;

                    var ultimaFactura = _db.Facturas.OrderBy(x=>x.id).LastOrDefault();
                    detalle.idFactura = ultimaFactura.id;
                    _db.DetalleFacturas.Add(detalle);

                }
                else
                {
                    var fact = _db.Facturas.OrderBy(x => x.id).LastOrDefault();
                    _db.Facturas.Remove(fact);
                    return Json(new { icon = "error", title = "Error al crear factura.", text = "El inventario no puede ser menor a 0." });

                }
            }
            _db.SaveChanges();
            return Json(new { icon = "success", title="" , text = "Factura generada exitosamente." });
        }

    }
}
