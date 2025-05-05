# Lightwiki

##### ENG

Simple wiki-like application for personal use.
Built on React using Vite.

This project was made to be used as a journal or note-taking app for studying purposes.

This project is deployable with docker using the docker-compose provided below.

##### PT-BR

Aplicacao estilo wiki para uso pessoal.
Feito em React utilizando Vite.

Este projeto foi feito para ser utilizado como um diario ou bloco de notas para estudar React e PostgreSQL.

Este projeto pode ser instalado via docker com o docker-compose abaixo.

#### docker-compose

```
services:
  frontend:
    image: igorfrag/lightwiki-frontend:latest
    ports:
      - 8080:80
    networks:
      - lightwiki
    depends_on:
      - backend
  backend:
    image: igorfrag/lightwiki-backend:latest
    ports:
      - 3000:3000
    networks:
      - lightwiki
    depends_on:
      db:
        condition: service_healthy
    environment:
      - PGHOST=db
      - PGUSER=postgres
      - PGPASSWORD=lightwiki
      - PGDATABASE=lightwiki
      - PGPORT=5432
  db:
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: lightwiki
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - 5432:5432
    networks:
      - lightwiki
    healthcheck:
      test:
        - CMD-SHELL
        - pg_isready -U postgres
      interval: 5s
      timeout: 5s
      retries: 5
volumes:
  pgdata: null
networks:
  lightwiki:
    driver: bridge


```
