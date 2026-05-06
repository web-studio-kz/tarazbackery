const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

class MailService {
    async sendNewOrderNotification(order, user, orderItemsWithProducts) {
        const DELIVERY_COST = 1000;

        const productListHtml = orderItemsWithProducts.map(item => `
            <li>${item.Product.name} - ${item.quantity} шт. x ${item.price} тг.</li>
        `).join('');

        const deliveryInfo = order.deliveryType === 'DELIVERY' 
            ? `<p>Адрес: ${order.address}</p>` 
            : '<p>Самовывоз</p>';

        try {
            await resend.emails.send({
                from: 'KFC-Clone <onboarding@resend.dev>', // Пока мы не купили домен, используем этот адрес
                to: process.env.TO_EMAIL, // Твой адрес tarazbackery@gmail.com
                subject: `Новый заказ №${order.id}`,
                html: `
                    <h1>Заказ №${order.id}</h1>
                    <p>Клиент: ${user.name} (${user.phone})</p>
                    ${deliveryInfo}
                    <ul>${productListHtml}</ul>
                    <p><strong>Итого: ${order.totalPrice} тг.</strong></p>
                `
            });
            console.log('Письмо отправлено через Resend API');
        } catch (error) {
            console.error("Ошибка Resend:", error);
        }
    }
}

module.exports = new MailService();