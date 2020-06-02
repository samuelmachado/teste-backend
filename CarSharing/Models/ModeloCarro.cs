using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarSharing.Models
{
    public class ModeloCarro
    {
        public int id { get; set; }
        public int idFabricante { get; set; }
        public string modelo { get; set; }
        public string imagem { get; set; }
        public Fabricante fabricante { get; set; }

        public ModeloCarro() {
            this.fabricante = new Fabricante();
        }
    }
}
