# Система управления обращениями

REST API сервис для управления обращениями.

## Структура проекта:

```
.
├── config/
│   └── database.js             # Конфигурация подключения к базе данных
├── controllers/
│   └── ticket.controller.js    # Логика обработки запросов для обращений
├── models/
│   └── Ticket.js               # сущность Ticket
├── routes/
│   └── ticket.routes.js        # Эндпоинты для работы с обращениями
├── package.json
├── database.sqlite             # Файл базы данных SQLite
├── app.js                      # инициализация Express и middleware
├── package-lock.json
├── README.md
└── server.js                   # запуск сервера
```

## Технологии

- Node.js 18.19.1
- Express.js 4.21.2
- Sequelize 6.37.5
- Sqlite 5.1.7
- Dotenv 16.4.7

## Установка

1. Установите зависимости:

```bash
npm install
```

2. Создайте файл `databse.sqlite`

3. Измените файл `.env` в корне проекта:

```env
DB_PATH=path/to/your/database.sqlite
PORT=3000
```

4. Запустите приложение:

```bash
node server.js
```

Приложение будет доступно по адресу: `http://localhost:3000`

## Использование API

### Основные эндпоинты

| Метод | URL                                 | Действие                        |
| ----- | ----------------------------------- | ------------------------------- |
| POST  | /api/tickets                        | Создать новое обращение         |
| PUT   | /api/tickets/:id/take               | Взять обращение в работу        |
| PUT   | /api/tickets/:id/complete           | Завершить обращение             |
| PUT   | /api/tickets/:id/cancel             | Отменить обращение              |
| GET   | /api/tickets                        | Получить список обращений       |
| PUT   | /api/tickets/cancel-all-in-progress | Отменить все обращения в работе |

### Примеры запросов

**Создание обращения:**

```http
POST /api/tickets
Content-Type: application/json
{
  "theme": "Проблема с доступом",
  "message": "Не могу войти в систему"
}
```

**Взять в работу:**

```http
PUT /api/tickets/1/take
```

**Завершить обращение:**

```http
PUT /api/tickets/1/complete
Content-Type: application/json
{
  "resolution": "Сброшен пароль пользователя"
}
```

**Фильтрация по датам:**

```http
GET /api/tickets?date=2024-01-15
```

```http
GET /api/tickets?startDate=2024-01-01&endDate=2024-01-31
```

**Отменить обращение:**
```PUT /api/tickets/1/cancel
Content-Type: application/json
{
  "cancellationReason": "Обращение дублируется"
}
```

**Отменить все обращения в работе:**
```
PUT /api/tickets/cancel-all-in-progress
Content-Type: application/json
{
  "cancellationReason": "Системная отмена всех обращений в работе"
}
```

## Структура базы данных

Таблица `Tickets`:

| Поле               | Тип     | Описание                                     |
| ------------------ | ------- | -------------------------------------------- |
| id                 | INTEGER | Уникальный идентификатор                     |
| theme              | STRING  | Тема обращения                               |
| message            | TEXT    | Текст обращения                              |
| status             | ENUM    | Статус (new/in_progress/completed/cancelled) |
| resolution         | TEXT    | Решение проблемы                             |
| cancellationReason | TEXT    | Причина отмены                               |
| createdAt          | DATE    | Дата создания                                |
| updatedAt          | DATE    | Дата последнего обновления                   |

## Лицензия

[MIT License](LICENSE.txt) — свободное использование, изменение и распространение проекта.
