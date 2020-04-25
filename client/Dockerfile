# Stage 1
FROM node:12 as react-build

#ARG REACT_APP_USERS_SERVICE
ENV REACT_APP_USERS_SERVICE=localhost:80
RUN echo "$REACT_APP_USERS_SERVICE"

#ARG REACT_APP_PRODUCTS_SERVICE
ENV REACT_APP_PRODUCTS_SERVICE=localhost:80
RUN echo "$REACT_APP_PRODUCTS_SERVICE"

ARG PORT
ENV PORT=$PORT
RUN echo "$PORT"

WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

# stage: 2 — the production environment
FROM nginx:alpine
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]