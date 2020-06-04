const connection = require('../database/connection');

module.exports = {

    //realiza checkin
    async createCheckout(request, response) {
        const {
            idBooking
        } = request.body;

        try {
            //encontra reserva pelo id
            booking = await connection('bookings').select('*').where('idBooking', '=', idBooking).first();

            //verifica se a reserva foi encontrada
            if (booking != [] && booking != undefined) {

                //se reserva existe, entao busca o checkin pelo id
                checkout = await connection('bookingCheckout').where('idBooking', '=', idBooking).select('*').first();

                //verifica se o checkout existe
                if (checkout == [] || checkout == undefined) {

                    //faz o checkout
                    const activeCheckout = true;
                    await connection('bookingCheckout').insert({
                        idBooking,
                        activeCheckout
                    });
                    //retorna sucesso
                    return response.status(200).send({
                        Mensagem: "Checkout realizado com sucesso"
                    });
                }

                //caso checkout ja tenha sido realizado envia msg
                if (checkout != [] && checkout != undefined && checkout.activeCheckout == true) {
                    return response.status(200).send({
                        Mensagem: "Checkout já realizado"
                    });
                }
            }
            //caso nao encontre reserva
            else {
                return response.status(406).send({
                    Mensagem: "Falha ao realizar checkout, reserva não encontrada"
                });
            }

        } catch (error) {
            console.log(error);
            return response.status(406).send({
                Mensagem: "Falha ao realizar Checkout."
            });
        }
    },

    async listCheckout(request, response) {

        checkouts = await connection('bookingCheckout').select('*');
        return response.json(checkouts);
    }
}