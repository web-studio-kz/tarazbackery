const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

class MailService {
    async sendNewOrderNotification(order, user, orderItemsWithProducts) {
        const DELIVERY_COST = 1000;
    
        // 1. Формируем список товаров
        const productListHtml = orderItemsWithProducts.map(item => `
            <li style="margin-bottom: 5px;">
                ${item.Product.name} — ${item.quantity} шт. x ${item.price} тг.
            </li>
        `).join('');
    
        // 2. Логика информации о доставке и карты
        let deliverySectionHtml = '';
    
        if (order.deliveryType === 'DELIVERY') {
            // Формируем ссылку на Яндекс.Карты. 
            // ВАЖНО: Яндекс принимает координаты в формате Долгота,Широта (Long, Lat)
            const mapUrl = `https://yandex.ru/maps/?pt=${order.longitude},${order.latitude}&z=17&l=map`;
            
            deliverySectionHtml = `
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #eee;">
                    <h3 style="margin-top: 0;">Детали доставки:</h3>
                    <p><strong>Адрес:</strong> ${order.address || 'Указан только на карте'}</p>
                    <p><strong>Координаты:</strong> ${order.latitude}, ${order.longitude}</p>
                    <br/>
                    <a href="${mapUrl}" 
                       style="background-color: #202020; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                       Открыть точку на карте
                    </a>
                </div>
            `;
        } else {
            deliverySectionHtml = `
                <div style="background-color: #fffbe6; padding: 15px; border-radius: 8px; border: 1px solid #ffe58f;">
                    <p style="margin: 0; color: #d89610; font-weight: bold;">Способ получения: САМОВЫВОЗ</p>
                </div>
            `;
        }
    
        // 3. Отправка через Resend
        try {
            await resend.emails.send({
                from: 'KFC-Clone <onboarding@resend.dev>',
                to: process.env.TO_EMAIL,
                subject: `Заказ №${order.id} | ${order.deliveryType === 'PICKUP' ? 'Самовывоз' : 'Доставка'}`,
                html: `
                    <!DOCTYPE html>
                    <html lang="ru">
                    <head>
                        <meta charset="UTF-8">
                    </head>
                    <body style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #e31837; border-bottom: 2px solid #e31837; padding-bottom: 10px;">Новый заказ №${order.id}</h2>
                        
                        <p><strong>Клиент:</strong> ${user.name}</p>
                        <p><strong>Телефон:</strong> <a href="tel:${user.phone}">${user.phone}</a></p>
                        <p><strong>Email:</strong> ${user.email}</p>
                        
                        ${deliverySectionHtml}
    
                        <h3>Состав заказа:</h3>
                        <ul style="padding-left: 20px;">
                            ${productListHtml}
                        </ul>
                        
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;"/>
                        <p style="font-size: 18px; text-align: right;"><strong>Итого к оплате: ${order.totalPrice} тг.</strong></p>
                    </body>
                    </html>
                `
            });
            console.log('Уведомление с картой отправлено через Resend');
        } catch (error) {
            console.error("Ошибка Resend:", error);
        }
    }
}

module.exports = new MailService();