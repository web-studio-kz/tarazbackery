const nodemailer = require('nodemailer');
const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first'); 
class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: process.env.SMTP_PORT,
            secure: true,
            // ПРИНУДИТЕЛЬНО ИСПОЛЬЗУЕМ IPv4 (решает ошибку ENETUNREACH)
            family: 4, 
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        this.sendNewOrderNotification = this.sendNewOrderNotification.bind(this);
    }

    async sendNewOrderNotification(order, user, orderItemsWithProducts) {
        // Константа стоимости доставки, как в контроллере
        const DELIVERY_COST = 1000;

        const productListHtml = orderItemsWithProducts.map(item => {
            const itemTotal = item.quantity * item.price;
            return `
              <li style="margin-bottom: 10px;">
                ${item.Product.name} - ${item.quantity} шт. x ${item.price} тг. = <strong>${itemTotal} тг.</strong>
              </li>
            `;
        }).join('');

        const deliveryCostHtml = order.deliveryType === 'DELIVERY' 
            ? `<li style="margin-top: 10px; border-top: 1px solid #eee; padding-top: 10px;">Доставка: <strong>${DELIVERY_COST} тг.</strong></li>` 
            : '';

        const deliveryInfoHtml = order.deliveryType === 'DELIVERY'
            ? `<h3>Адрес доставки:</h3>
               <p>${order.address || 'Адрес не указан'}</p>
               <p><a href="https://yandex.ru/maps/?pt=${order.longitude},${order.latitude}&z=17&l=map" style="color: #1a73e8;">Посмотреть на карте</a></p>`
            : `<h3>Тип получения: Самовывоз</h3>`;

        const subject = `Новый заказ №${order.id} (${order.deliveryType === 'PICKUP' ? 'Самовывоз' : 'Доставка'})`;

        try {
            await this.transporter.sendMail({
                from: `"KFC Clone Notifier" <${process.env.SMTP_USER}>`,
                to: process.env.TO_EMAIL,
                subject: subject,
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <h1>Поступил новый заказ №${order.id}</h1>
                        <p><strong>Клиент:</strong> ${user.name}</p>
                        <p><strong>Телефон:</strong> ${user.phone}</p>
                        <hr/>
                        ${deliveryInfoHtml}
                        <hr/>
                        <h3>Состав заказа:</h3>
                        <ul>${productListHtml}${deliveryCostHtml}</ul>
                        <h3 style="text-align: right;">Итого: ${order.totalPrice} тг.</h3>
                    </div>
                `,
            });
            console.log('Письмо успешно отправлено на:', process.env.TO_EMAIL);
        } catch (error) {
            console.error("ОШИБКА Nodemailer:", error.message);
        }
    }
}

module.exports = new MailService();