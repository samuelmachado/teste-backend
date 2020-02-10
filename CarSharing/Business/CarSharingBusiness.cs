using CarSharing.Data;
using CarSharing.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace CarSharing.Business
{
    public class CarSharingBusiness
    {
        public Response getAll(Response response)
        {
            try
            {
                var sql = getAllSql();
                var connetion = new Connection();
                DataSet dataset = connetion.ExecuteQuery(sql);
                if (dataset.Tables[0].Rows.Count <= 0)
                {
                    return response.GenerateResult(true, "Erro ao buscar dados do carro");
                }
                List<Carro> carros = new List<Carro>();
                foreach (DataRow item in dataset.Tables[0].Rows)
                {
                    var carro = new Carro();
                    carro.idUnidade = int.Parse(item["idUnidade"].ToString());
                    carro.placa = item["placa"].ToString();
                    carro.cor = item["cor"].ToString();
                    carro.modeloCarro.modelo = item["modelo"].ToString();
                    carro.modeloCarro.imagem = item["imagem"].ToString();
                    carro.modeloCarro.fabricante.fabricante = item["fabricante"].ToString();

                    carros.Add(carro);
                }
              return response.GenerateResult(false, "Busca Efetuada com sucesso", carros);
            }
            catch (Exception ex)
            {
                return new Response(true, ex.ToString(), null);
            }
        }

        public string getAllSql()
        {

            return "Select \"idUnidade\", \"placa\", \"cor\", \"modelo\", \"imagem\", \"fabricante\" from Carro c " +
                    "inner join \"modeloCarro\" mc on mc.id = c.\"idModelo\" " +
                    "  inner join \"fabricante\" f on mc.\"idFabricante\" = f.id ";

        }
    }
}
