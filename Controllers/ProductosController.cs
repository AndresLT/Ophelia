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
    public class ProductosController : Controller
    {
        private DataDbContext _db;

        public ProductosController(DataDbContext db)
        {
            this._db = db;
        }

        [HttpGet]
        public ActionResult GetProductos()
        {
            var cons = _db.Productos.ToList();
            return Json(new { productos = cons });
        }

        [HttpPost]
        public ActionResult CrearProducto([FromBody] Producto producto)
        {
            var cons = _db.Productos.Where(x => x.nombre == producto.nombre).FirstOrDefault();
            if(cons != null)
            {
                Producto nuevoProducto = new Producto();
                nuevoProducto = producto;

                _db.Productos.Add(nuevoProducto);
                _db.SaveChanges();

                return Json(new { icon = "success", text = "Producto creado exitosamente." });
            }
            else
            {
                return Json(new { icon = "error", text = "Ya existe un producto con este nombre." });
            }
        }

        [HttpPost]
        public ActionResult EliminarProducto([FromBody] Producto producto)
        {
            var cons = _db.Productos.Where(x => x.id == producto.id).FirstOrDefault();
            if(cons != null)
            {
                _db.Productos.Remove(producto);
                _db.SaveChanges();

                return Json(new { icon = "success", text = "Producto eliminado exitosamente." });
            }
            else
            {
                return Json(new { icon = "error", text = "Error al intentar eliminar el producto." });
            }
        }

        [HttpPost]
        public ActionResult ActualizarProducto([FromBody] Producto producto)
        {
            var cons = _db.Productos.Where(x => x.id == producto.id).FirstOrDefault();
            if (cons != null)
            {
                cons = producto;

                _db.SaveChanges();

                return Json(new { icon = "success", text = "Producto actualizado exitosamente." });
            }
            else
            {
                return Json(new { icon = "error", text = "Error al actualizar el producto." });
            }
        }
    }
}
