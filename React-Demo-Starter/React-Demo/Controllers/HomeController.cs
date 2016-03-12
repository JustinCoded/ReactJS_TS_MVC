using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using React_Demo.Models;

namespace React_Demo.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View(GetData());
        }

        private List<Product> GetData()
        {
            var turboData = new List<Product>()
            {
                new Product{
                    Title = "Garrett Dual Ball Bearing GT2554R",
                    SKU = "GAR-471171-3",
                    Brand = "Garrett",
                    Price = 1168.44,
                    Image = "gt2554r.jpg"
                },
                new Product{
                    Title = "Garrett Dual Ball Bearing GT2560R",
                    SKU = "GAR-GT2560R",
                    Brand = "Garrett",
                    Price = 1188.76,
                    Image = "gt2560r.jpg"
                },
                new Product{
                    Title = "Garrett Dual Ball Bearing GT2854R",
                    SKU = "GAR-471171-3",
                    Brand = "Garrett",
                    Price = 1169.47,
                    Image = "gt2854r.jpg"
                },
                new Product{
                    Title = "Garrett Dual Ball Bearing GT2859R",
                    SKU = "GAR-GT2859R",
                    Brand = "Garrett",
                    Price = 1151.56,
                    Image = "gt2859r.jpg"
                },
                 new Product{
                    Title = "Garrett Dual Ball Bearing GT2860R",
                    SKU = "GAR-GT2860R",
                    Brand = "Garrett",
                    Price = 1210.64,
                    Image = "gt2860r.jpg"
                },
                  new Product{
                    Title = "Garrett Dual Ball Bearing GT2860RS (Disco Potato)",
                    SKU = "GAR-GT2860RS",
                    Brand = "Garrett",
                    Price = 1318.74,
                    Image = "gt2860rs.jpg"
                },
            };

            return turboData;
        }
    }
}