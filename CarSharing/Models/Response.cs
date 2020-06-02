using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarSharing.Models
{
    public class Response
    {
        public bool hasError { get; set; }
        public string message { get; set; }
        public dynamic objectResult { get; set; }

        public Response(bool hasError = true, string message = "Erro não tratado", dynamic objectResult = null)
        {
            this.hasError = hasError;
            this.message = message;
            this.objectResult = objectResult;
        }

        public Response GenerateResult(bool hasError = true, string message = "Erro não tratado", dynamic objectResult = null )
        {
            Response response = new Response();
            response.hasError = hasError;
            response.message = message;
            response.objectResult = objectResult;

            return response;
        }
    }
}
