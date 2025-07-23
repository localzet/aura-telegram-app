# Aura Telegram Mini App

## Features

- View your subscriptions in the mini app
- Multi-language support (English, Russian)

## Environment Variables

The application requires the following environment variables to be set:

| Variable         | Description                                                                                                                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AURA_PANEL_URL` | Aura URL, can be `http://aura-backend:3000` or `https://aura.example.com`                                                                                                                     |
| `AURA_TOKEN`     | Authentication token for Aura API                                                                                                                                                             |
| `BUY_LINK`       | The URL for purchase actions                                                                                                                                                                  |
| `CRYPTO_LINK`    | Allows using encrypted links (currently supported Happ application). If no applications supporting cryptolink are present in app-config.json configuration, these links will not be displayed |
| `REDIRECT_LINK`  | Allows you to specify a **custom redirect page URL** for deep links. Useful for handling protocols like `v2box://` in Telegram Desktop (Windows).                                             |
| `AUTH_API_KEY`   | If you use "Caddy with security" or TinyAuth for Nginx addon, you can place here X-Api-Key, which will be applied to requests to Aura Panel.                                                  |

|

## Plugins and Dependencies

### Telegram Bot

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Telegram Mini App SDK](https://github.com/telegram-mini-apps)

## Setup Instructions

1. Create new directory for mini app

```bash
mkdir /opt/aura-telegram-app && cd /opt/aura-telegram-app
```

2. Download and configure the environment variables.

```bash
curl -o .env https://raw.githubusercontent.com/localzet/aura-telegram-app/refs/heads/main/.env.example
```

3. Configure the environment variables.

```bash
nano .env
```

4. Create docker-compose.yml file

```bash
nano docker-compose.yml
```

Example below.

```yaml
services:
    aura-telegram-app:
        image: ghcr.io/localzet/aura-telegram-app:latest
        container_name: aura-telegram-app
        hostname: aura-telegram-app
        env_file:
            - .env
        restart: always
        ports:
            - '3020:3020'
```

5. Run containers.
    ```bash
    docker compose up -d && docker compose logs -f
    ```
6. Mini app is now running on http://127.0.0.1:3020

Now we are ready to move on the Reverse Proxy installation.

## Update Instructions

1. Pull the latest Docker image:

    ```bash
    docker compose pull
    ```

2. Restart the containers:
    ```bash
    docker compose down && docker compose up -d
    ```
