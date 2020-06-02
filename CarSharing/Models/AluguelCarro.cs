using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarSharing.Models
{
    public class AluguelCarro
    {
        public int idAluguel { get; set; }
        public DateTime dataCheckIn { get; set; }
        public DateTime dataCheckOut { get; set; }
        public Carro carro { get; set; }
    }
}
