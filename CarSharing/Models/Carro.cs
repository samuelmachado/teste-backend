using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarSharing.Models
{
    public class Carro
    {
        public int id { get; set; }
        public int idUnidade { get; set; }
        public int idModelo { get; set; }
        public string placa { get; set; }
        public string cor { get; set; }
        public ModeloCarro modeloCarro { get; set; }
        public Carro()
        {
            this.modeloCarro = new ModeloCarro();
        }
    }

}
