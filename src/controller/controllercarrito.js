const Modelcarrito = require('../model/modelcarrito');
const paypal = require('@paypal/checkout-server-sdk');

// Configuración del cliente PayPal
const Environment = paypal.core.SandboxEnvironment;
const client = new paypal.core.PayPalHttpClient(new Environment(process.env.PAYPAL_API_CLIENT, process.env.PAYPAL_API_SECRET));

class ControllerCarrito { // la clase controladora de carrito
    static async compraProductoCarrito(req, res) {
        const { items, total, metodoDePago, user_id } = req.body; // Obtener los items, total y metodo de pago del cuerpo de la petición

        const fecha_Pedido = new Date().toLocaleDateString('es-ES', { timeZone: 'UTC', }); // Obtener la fecha actual en formato de cadena
        const time = new Date().toLocaleTimeString('es-ES', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' }); // Obtener la hora en formato de cadena
        try {
            for (const item of items) {
                const { title, price, quantity } = item; // Extraer el título, precio y cantidad de cada artículo
                const carritonew = { Producto: title, Precio: price, Cantidad: quantity, Total: total, Fecha: fecha_Pedido, Hora: time, metodoDePago: metodoDePago, user_id: user_id, created: new Date(), update: new Date() };
                const resultado = await Modelcarrito.newCarrito(carritonew);
                if (!resultado) {
                    return res.status(400).json({ message: 'No se ha podido realizar la compra' });
                }

                if (metodoDePago === 'paypal') {
                    // Código para la integración con PayPal
                    const request = new paypal.orders.OrdersCreateRequest();
                    request.prefer("return=representation");
                    request.requestBody({
                        intent: 'CAPTURE',
                        purchase_units: [{
                            amount: {
                                currency_code: 'USD',
                                value: total.toFixed(2),
                                breakdown: {
                                    item_total: {
                                        currency_code: 'USD',
                                        value: total.toFixed(2)
                                    }
                                }
                            },
                            items: [{
                                name: title,
                                unit_amount: {
                                    currency_code: 'USD',
                                    value: price.toFixed(2)
                                },
                                quantity: quantity.toString()
                            }]
                        }],
                        application_context: {
                            return_url: 'http://localhost:3007/api/productos/success',
                            cancel_url: 'http://localhost:3007/api/productos/cancel'
                            /*  return_url: 'https://frontend-elegance-mode.onrender.com/api/productos/success',
                             cancel_url: 'https://frontend-elegance-mode.onrender.com/api/productos/cancel' */
                        }
                    });

                    const order = await client.execute(request);
                    const redirectUrl = order.result.links.find(link => link.rel === 'approve').href; // esta variable indica si la orden de compra fue existosa o no se readireccionara a las urls indicadas
                    const OrderPaypal = order.result.id;
                    resultado.paypal_order_id = OrderPaypal;

                    await resultado.save();
                    res.status(200).json({ redirectUrl });
                }
            }

            res.status(200).json({ message: 'Compra realizada con éxito' });
        } catch (error) {
            res.status(500).json({ message: 'Error del servidor', error: error.message });
        }
    }


    static async handleSuccess(req, res) { // esta funcion asicronica deberia comunicarse cuando se realice el pago
        try {
            return res.status(200).json({ message: 'Compra exitosa' }); // se devolvera un mensaje de exito
        } catch (error) {
            return res.status(500).json({ message: 'Error en el pago de PayPal', error: error.message });
        }
    }

    static async handleCancel(req, res) { // esta funcion asicronica deberia comunicarse cuando no se realice el pago
        try {
            return res.status(200).json({ message: 'Compra cancelada' }); // se devolvera un mensaje de cancelacion
        } catch (error) {
            return res.status(500).json({ message: 'Error en el pago de PayPal', error: error.message });
        }
    }



}

module.exports = ControllerCarrito;
