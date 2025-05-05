# Etapa 1: build da aplicação
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
ENV VITE_API_URL=""
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: servidor Nginx para servir o frontend
FROM nginx:alpine

# Remove configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia os arquivos compilados para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia a nova configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
