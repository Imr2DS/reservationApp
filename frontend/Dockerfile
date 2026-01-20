FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --output-path=dist --configuration=production

FROM nginx:alpine

# Copier le build Angular
COPY --from=build /app/dist /usr/share/nginx/html

# Copier la configuration nginx (important)
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
