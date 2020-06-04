const connection = require('../database/connection');
const moment = require('moment');

module.exports = {

    //listagem de reservas
    async listBookings(request, response) {
        var {
            page
        } = request.query;

        if (page == 0) page += 1;

        const allBookings = await connection('bookings')
            .limit(5).offset((page - 1) * 5)
            .select('*')

        return response.json(allBookings);
    },


    //criar reserva
    async createBooking(request, response) {

        try {

            //variaveis do usuario
            const {
                idCar,
                nameClient,
                idClient,
                startDate,
                endDate
            } = request.body;


            //trabalhando com datas / formatando
            const today = moment().format('L');
            const dataSplit = today.split('/');
            const dataToday = dataSplit[0] + "-" + dataSplit[1] + "-" + dataSplit[2];

            //utilizando padrao do moment
            const endBooking = moment(endDate, "MM-DD-YYYY");
            const startBooking = moment(startDate, "MM-DD-YYYY");
            const todayBooking = moment(dataToday, "MM-DD-YYYY");

            //obtendo a diferença entra as datas de inicio e fim da reserva
            const duration = moment.duration(endBooking.diff(startBooking));
            const daysBookings = duration.asDays();

            //verificando a data de inicio da reserva e a data de hoje
            const verifyDate = moment.duration(startBooking.diff(todayBooking));
            const dayAmount = verifyDate.asDays();

            //caso tente realizar a reserva antes do dia atual
            if (dayAmount < 0) {
                return response.status(406).send({
                    Mensagem: "Falha, a data de inicio é menor que hoje."
                })
            }

            //caso a quantidade de dias de reserva seja maior que 3 ou menor que 0
            if (daysBookings > 3 || daysBookings < 1) {
                return response.status(406).send({
                    Mensagem: "Limite máximo de dias atingido (3)."
                })
            }

            //busca as reservas pelo id do carro para tratar a reserva
            const carsDB = await connection('bookings').select('startBooking', 'endBooking', 'idCar').where('idCar', '=', idCar);

            //separa as datas
            const dates = carsDB.map(car => {
                return {
                    start: moment(car.startBooking, "MM-DD-YYYY"),
                    end: moment(car.endBooking, "MM-DD-YYYY"),
                };
            });

            var available = true; //var auxiliar para verificar se o carro esta disponivel para locação

            //percorre a array
            dates.forEach(async element => {

                //verifica se a data de inicio esta entre alguma data ja reservada
                let durationFind = moment.duration(startBooking.diff(element.end));
                //transforma em dias
                let dayAmountFind = durationFind.asDays();

                //se a quantidade de dias for negativa e a data de inicio seja maior que todas datas de inicio ja reservadas
                //nao e possivel reservar
                if (dayAmountFind <= 0 && startBooking >= element.start) {
                    available = false;
                }
            });

            //caso o carro esteja disponivel faz a reserva
            if (available) {
                await connection('bookings').insert({
                    idCar,
                    nameClient,
                    idClient,
                    daysBookings,
                    startBooking,
                    endBooking
                });
                //retorna sucesso
                return response.status(200).send({
                    Mensagem: "Cadastrado com sucesso."
                })
            } else {
                //caso o carro esteja indisponivel
                return response.status(406).send({
                    Mensagem: "O Carro está indisponível na data escolhida."
                })
            }

        } catch (error) {
            //erro ao cadastrar
            return response.status(406).send({
                Mensagem: "Falha ao cadastrar."
            })
        }
    }
}