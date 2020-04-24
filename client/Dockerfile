# Stage 1
FROM node:12 as react-build
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

# stage: 2 — the production environment
FROM nginx:alpine
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]