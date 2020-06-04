const connection = require('../database/connection');

module.exports = {

    //realiza checkin
    async createCheckin(request, response) {
        const {
            idBooking
        } = request.body;

        try {
            //encontra reserva pelo id
            booking = await connection('bookings').select('*').where('idBooking', '=', idBooking).first();

            //verifica se a reserva foi encontrada
            if (booking != [] && booking != undefined) {

                //se reserva existe, entao busca o checkin pelo id
                checkin = await connection('bookingCheckin').where('idBooking', '=', idBooking).select('*').first();

                //verifica se o checkin existe
                if (checkin == [] || checkin == undefined) {

                    //faz o checkin
                    const activeCheckin = true;
                    await connection('bookingCheckin').insert({
                        idBooking,
                        activeCheckin
                    });
                    //retorna sucesso
                    return response.status(200).send({
                        Mensagem: "Checkin Realizado com Sucesso"
                    });
                }

                //caso checkin ja tenha sido realizado envia msg
                if (checkin != [] && checkin != undefined && checkin.activeCheckin == true) {
                    return response.status(200).send({
                        Mensagem: "Checkin já realizado"
                    });
                }
            }
            //caso nao encontre reserva
            else {
                return response.status(406).send({
                    Mensagem: "Falha ao realizar checkin, reserva não encontrada"
                });
            }

        } catch (error) {
            console.log(error);
            return response.status(406).send({
                Mensagem: "Falha ao realizar checkin."
            });
        }
    },

    async listCheckin(request, response) {

        checkins = await connection('bookingCheckin').select('*');
        return response.json(checkins);
    }
}