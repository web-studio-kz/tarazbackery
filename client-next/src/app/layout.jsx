// client-next/src/app/layout.jsx (ИСПРАВЛЕННАЯ ВЕРСИЯ)

import './globals.css';
import Providers from '../providers/Providers'; // <-- 1. Импортируем ЕДИНСТВЕННЫЙ провайдер

// `metadata` - это серверная часть, она остается здесь
export const metadata = {
  title: "KFC Clone - Доставка еды в Таразе",
  description: "Официальный клон сайта KFC. Заказывайте любимые бургеры, баскеты и напитки с доставкой на дом.",
};

// `RootLayout` - это чистый серверный компонент
export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        {/* 
          2. Оборачиваем все приложение в наш клиентский компонент Providers.
             Он возьмет на себя всю "клиентскую" работу:
             - Инициализацию Redux
             - Инициализацию i18next
             - Рендеринг Header, Footer, ToastContainer и т.д.
        */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}