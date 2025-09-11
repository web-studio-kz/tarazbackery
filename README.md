<div align="right">
  <b><a href="#русский">Русская версия</a></b>
</div>

<div align="center">

# Full-Stack Food Delivery Service 🍔

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**A fully functional food ordering web application built from scratch.**

</div>

### **✨ [View live version (Demo)](https://tarazbackery.vercel.app/) ✨**

---

### 📖 Table of contents

*   [📍 Project overview](#project-overview)
*   [🚀 Features](#features)
*   [🛠️ Tech stack](#tech-stack)
*   [⚙️ Project launch](#project-launch)
*   [📋 Environment variables](#environment-variables)

---

### 📍 Project overview <a name="project-overview"></a>

This project is a full-featured delivery service. Designed to demonstrate skills in modern full-stack development. The application is built on a classic client-server architecture and includes the entire cycle: from designing a relational database and creating a REST API to developing an adaptive multilingual interface and deployment in a cloud multi-service environment.

---

### 🚀 Features <a name="features"></a>

*   ✅ **Responsive design:** The interface is fully adapted for desktop and mobile devices.
*   ✅ **Catalog and pagination:** Browse products by category with pagination and detail pages.
*   ✅ **Smart basket:** A basket that maintains state between sessions (`redux-persist`).
*   ✅ **Placing an order:** Process with selection of the type of receipt (pickup/delivery) and dynamic cost calculation.
*   ✅ **Interactive map:** Selecting an address on Yandex.Map with a visual delivery zone (geofencing).
*   ✅ **OAuth 2.0 Authentication:** Secure login and registration via **Google** and **Yandex**.
*   ✅ **Personal account:** View your profile and full order history with details.
*   ✅ **Email-notifications:** Automatic sending of notifications about new orders by email.
*   ✅ **Multilingual (i18n):** Full support for Russian (RU) and Kazakh (KZ) languages.

---

### 🛠️ Tech stack <a name="tech-stack"></a>

| Category | Technologies |
| :--- | :--- |
| **Frontend** | `React 18`, `Vite`, `Redux Toolkit`, `React Router`, `CSS Modules`, `Axios`, `i18next`, `react-toastify`, `react-icons`, `@pbe/react-yandex-maps` |
| **Backend** | `Node.js`, `Express.js`, `Sequelize`, `Passport.js`, `JWT`, `Nodemailer`, `express-rate-limit`, `CORS` |
| **Database** | `PostgreSQL` |
| **DevOps** | `Vercel` (Frontend), `Render` (Backend), `Render` (Database), `Git`, `GitHub` |

---

### ⚙️ Project launch <a name="project-launch"></a>

#### 1. Cloning a repository
```bash
git clone https://github.com/web-studio-kz/tarazbackery.git
cd <название-папки-проекта>
```

### 2. Настройка Бэкенда

```bash
# Go to the server folder
cd server

# Install dependencies
npm install

# Create a .env file and fill it in as per the example below

# Run migrations to create tables in the DB
npx sequelize-cli db:migrate

# (Optional) Fill the DB with initial data
npx sequelize-cli db:seed:all

# Run the server in development mode
npm run dev
```

### 3. Setting up the Frontend

```bash
# Go to the client folder
cd client

# Install dependencies
npm install

# Create a .env file and fill it in as per the example below

# Run the client in development mode
npm run dev
```


### 📋 Environment variables (.env) <a name="environment-variables"></a>

To run the project, you need to create `.env` files in the `server` and `client` folders.

#### `server/.env`

```env
# Specifies the operating mode (development for local running, production for deployment)
NODE_ENV=development

# The port on which the server will run
PORT=5001

# Secret key for signing JWT tokens (make up any long and complex string)
SECRET_KEY=super_secret_key

# URL for connecting to PostgreSQL database
# For local development: postgres://USER:PASSWORD@HOST:PORT/DATABASE_NAME
# For deployment: connection string from cloud provider (Render)
DATABASE_URL=postgres://postgres:12345@localhost:5432/DB

# Public URL of the deployed client application (frontend)
# Used for redirects after OAuth authentication
CLIENT_URL=http://localhost:5173

# Public URL of the deployed server application (backend)
# Used to generate callback URL for OAuth
API_URL=http://localhost:5001```

#### 🔑 Keys for OAuth 2.0
```dotenv
# Keys obtained from Google Cloud Console
GOOGLE_CLIENT_ID=ваш_client_id_из_google_console
GOOGLE_CLIENT_SECRET=ваш_client_secret_из_google_console

# Keys obtained from Яндекс OAuth
YANDEX_CLIENT_ID=ваш_id_из_яндекс_oauth
YANDEX_CLIENT_SECRET=ваш_пароль_из_яндекс_oauth

# SMTP-server host
SMTP_HOST=smtp.gmail.com
# SMTP-server port
SMTP_PORT=587
# Email-address of "sender bot"
SMTP_USER=your-bot-email@gmail.com
# 16-digit app password generated in Google account
SMTP_PASSWORD=abcdefghijklmnop
# Email-address to receive notifications about new orders
TO_EMAIL=your-business-email@example.com
```

#### `client/.env`

```env
# Public URL of the deployed server application (backend)
# This address will be used for all API requests.
# For local development:
VITE_API_URL=http://localhost:5001/

# Public API-key for Yandex.maps.
VITE_YANDEX_MAP_API_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```
<a name="русский"></a>
<div align="center">

# Full-Stack Сервис Доставки Еды 🍔

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Полнофункциональное веб-приложение для заказа еды, разработанное с нуля.**

</div>

### **✨ [Посмотреть живую версию (Демо)](https://tarazbackery.vercel.app/) ✨**

---

### 📖 Оглавление

*   [📍 Обзор проекта](#-обзор-проекта)
*   [🚀 Ключевые возможности](#-ключевые-возможности-features)
*   [🛠️ Технологический стек](#тех-стек)
*   [⚙️ Запуск проекта](#запуск-проекта)
*   [📋 Переменные окружения](#-переменные-окружения-env)

---

### 📍 Обзор проекта

Этот проект представляет собой полнофункциональный клон сервиса доставки , созданный для демонстрации навыков в современной full-stack разработке. Приложение построено на классической клиент-серверной архитектуре и включает в себя весь цикл: от проектирования реляционной базы данных и создания REST API до разработки адаптивного многоязычного интерфейса и деплоя в облачной мульти-сервисной среде.

---

### 🚀 Ключевые возможности (Features)

*   ✅ **Адаптивный дизайн:** Интерфейс полностью адаптирован для десктопных и мобильных устройств.
*   ✅ **Каталог и пагинация:** Просмотр товаров по категориям с пагинацией и детальными страницами.
*   ✅ **Умная корзина:** Корзина с сохранением состояния между сессиями (`redux-persist`).
*   ✅ **Оформление заказа:** Процесс с выбором типа получения (самовывоз/доставка) и динамическим расчетом стоимости.
*   ✅ **Интерактивная карта:** Выбор адреса на Яндекс.Карте с визуальной зоной доставки (геозонирование).
*   ✅ **OAuth 2.0 Аутентификация:** Безопасный вход и регистрация через **Google** и **Яндекс**.
*   ✅ **Личный кабинет:** Просмотр профиля и полной истории заказов с детализацией.
*   ✅ **Email-уведомления:** Автоматическая отправка уведомлений о новых заказах на почту.
*   ✅ **Многоязычность (i18n):** Полная поддержка русского (RU) и казахского (KZ) языков.

---

### 🛠️ Технологический стек <a name="тех-стек"></a>

| Категория | Технологии |
| :--- | :--- |
| **Frontend** | `React 18`, `Vite`, `Redux Toolkit`, `React Router`, `CSS Modules`, `Axios`, `i18next`, `react-toastify`, `react-icons`, `@pbe/react-yandex-maps` |
| **Backend** | `Node.js`, `Express.js`, `Sequelize`, `Passport.js`, `JWT`, `Nodemailer`, `express-rate-limit`, `CORS` |
| **База данных** | `PostgreSQL` |
| **DevOps** | `Vercel` (Frontend), `Render` (Backend), `Render` (Database), `Git`, `GitHub` |

---

### ⚙️ Запуск проекта <a name="запуск-проекта"></a>

#### 1. Клонирование репозитория
```bash
git clone https://github.com/web-studio-kz/tarazbackery.git
cd <название-папки-проекта>
```

### 2. Настройка Бэкенда

```bash
# Перейдите в папку сервера
cd server

# Установите зависимости
npm install

# Создайте файл .env и заполните его по примеру ниже

# Запустите миграции для создания таблиц в БД
npx sequelize-cli db:migrate

# (Опционально) Заполните БД начальными данными
npx sequelize-cli db:seed:all

# Запустите сервер в режиме разработки
npm run dev
```

### 3. Настройка Фронтенда

```bash
# Перейдите в папку клиента
cd client

# Установите зависимости
npm install

# Создайте файл .env и заполните его по примеру ниже

# Запустите клиент в режиме разработки
npm run dev
```


### 📋 Переменные окружения (.env)

Для запуска проекта необходимо создать `.env` файлы в папках `server` и `client`.

#### `server/.env`

```env
# Указывает режим работы (development для локального запуска, production для деплоя)
NODE_ENV=development

# Порт, на котором будет работать сервер
PORT=5001

# Секретный ключ для подписи JWT токенов (придумайте любую длинную и сложную строку)
SECRET_KEY=super_secret_key

# URL для подключения к базе данных PostgreSQL
# Для локальной разработки: postgres://USER:PASSWORD@HOST:PORT/DATABASE_NAME
# Для деплоя: строка подключения от облачного провайдера (Render)
DATABASE_URL=postgres://postgres:12345@localhost:5432/DB

# Публичный URL задеплоенного клиентского приложения (фронтенда)
# Используется для редиректов после OAuth-аутентификации
CLIENT_URL=http://localhost:5173

# Публичный URL задеплоенного серверного приложения (бэкенда)
# Используется для формирования callback URL для OAuth
API_URL=http://localhost:5001```

#### 🔑 Ключи для OAuth 2.0
```dotenv
# Ключи, полученные из Google Cloud Console
GOOGLE_CLIENT_ID=ваш_client_id_из_google_console
GOOGLE_CLIENT_SECRET=ваш_client_secret_из_google_console

# Ключи, полученные из Яндекс OAuth
YANDEX_CLIENT_ID=ваш_id_из_яндекс_oauth
YANDEX_CLIENT_SECRET=ваш_пароль_из_яндекс_oauth

# Хост SMTP-сервера
SMTP_HOST=smtp.gmail.com
# Порт SMTP-сервера
SMTP_PORT=587
# Email-адрес "бота-отправителя"
SMTP_USER=your-bot-email@gmail.com
# 16-значный пароль приложения, сгенерированный в аккаунте Google
SMTP_PASSWORD=abcdefghijklmnop
# Email-адрес для получения уведомлений о новых заказах
TO_EMAIL=your-business-email@example.com
```

#### `client/.env`

```env
# Публичный URL вашего задеплоенного бэкенд-сервера.
# Этот адрес будет использоваться для всех API-запросов.
# Для локальной разработки:
VITE_API_URL=http://localhost:5001/

# Публичный API-ключ для сервиса Яндекс.Карты.
VITE_YANDEX_MAP_API_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```