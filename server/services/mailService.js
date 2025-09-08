const nodemailer = require('nodemailer');

const DELIVERY_COST = 1000;

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        this.sendNewOrderNotification = this.sendNewOrderNotification.bind(this);
    }

    async sendNewOrderNotification(order, user, orderItemsWithProducts) {
        const productListHtml = orderItemsWithProducts.map(item => {
            const itemTotal = item.quantity * item.price;
            return `
              <li style="margin-bottom: 10px;">
                ${item.Product.name} - ${item.quantity} шт. x ${item.price} тг. = <strong>${itemTotal} тг.</strong>
              </li>
            `;
        }).join('');

        const deliveryCostHtml = order.deliveryType === 'DELIVERY' 
            ? `
              <li style="margin-bottom: 10px; list-style-type: none; border-top: 1px solid #eee; padding-top: 10px;">
                Доставка = <strong>${DELIVERY_COST} тг.</strong>
              </li>
            ` 
            : '';

        const deliveryInfoHtml = order.deliveryType === 'DELIVERY'
            ? `
                <h3>Адрес доставки:</h3>
                <p>${order.address || 'Адрес не указан'}</p>
                <p>
                    <a 
                      href="https://yandex.ru/maps/?pt=${order.longitude},${order.latitude}&z=17&l=map"
                      style="color: #1a73e8; text-decoration: none;"
                    >
                      Посмотреть на карте
                    </a>
                </p>
            `
            : `<h3>Тип получения: Самовывоз</h3>`;

        const subject = `Новый заказ №${order.id} (${order.deliveryType === 'PICKUP' ? 'Самовывоз' : 'Доставка'})`;

        try {
            await this.transporter.sendMail({
                from: `"KFC Clone Notifier" <${process.env.SMTP_USER}>`,
                to: process.env.TO_EMAIL,
                subject: subject,
                html: `
                    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
                        <h1 style="color: #000;">Поступил новый заказ №${order.id}</h1>
                        <p><strong>Клиент:</strong> ${user.name}</p>
                        <p><strong>Телефон:</strong> ${user.phone}</p>
                        <p><strong>Email:</strong> ${user.email}</p>
                        <hr style="border: 0; border-top: 1px solid #eee;"/>
                        
                        ${deliveryInfoHtml}

                        <hr style="border: 0; border-top: 1px solid #eee;"/>
                        <h3>Состав заказа:</h3>
                        <ul style="list-style: none; padding: 0;">
                            ${productListHtml}
                            ${deliveryCostHtml}
                        </ul>
                        <h3 style="text-align: right; font-size: 18px; color: #000;">Итого к оплате: ${order.totalPrice} тг.</h3>
                    </div>
                `,
            });
            console.log('Уведомление о новом заказе успешно отправлено на email:', process.env.TO_EMAIL);
        } catch (error) {
            console.error("ОШИБКА при отправке email через Nodemailer:", error);
        }
    }
}

module.exports = new MailService();