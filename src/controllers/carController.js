const connection = require('../database/connection');

module.exports = {

    //listagem de carros por página
    async listCars(request, response) {

        //recebe o numero da pagina na query uri da uri
        var {
            page,
            maxItens
        } = request.query;
        if (page == 0) page += 1;

        console.log(maxItens);
        //busca 5 carros por página
        const allCars = await connection('cars')
            .limit(maxItens).offset((page - 1) * maxItens)
            .select('*');

        return response.json(allCars);
    },

    //listagem de carro por modelo e max 5 por página
    async listModels(request, response) {

        //recebe o modelo do carro e pagina na query da uri
        const {
            model,
            page
        } = request.query;

        //busca todos os carros com id do modelo da query
        const allCars = await connection('cars')
            .limit(5).offset((page - 1) * 5)
            .select('*')
            .where('idModelo', '=', model);

        return response.json(allCars);
    },

    //listagem de carro por modelo e max 5 por página
    async listFilte(request, response) {

        //recebe o modelo do carro e pagina na query da uri
        const {
            model,
            page
        } = request.query;

        //busca todos os carros com id do modelo da query
        const allCars = await connection('cars')
            .limit(5).offset((page - 1) * 5)
            .select('*')
            .where('idModelo', '=', model);

        return response.json(allCars);
    }
}