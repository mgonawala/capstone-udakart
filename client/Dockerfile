# Stage 1
FROM node:12 as react-build

#ARG REACT_APP_USERS_SERVICE
ENV REACT_APP_USERS_SERVICE=a8780c0375acc4b439cac40f783c3e62-111135518.us-east-1.elb.amazonaws.com
RUN echo "$REACT_APP_USERS_SERVICE"

#ARG REACT_APP_PRODUCTS_SERVICE
ENV REACT_APP_PRODUCTS_SERVICE=a8780c0375acc4b439cac40f783c3e62-111135518.us-east-1.elb.amazonaws.com
RUN echo "$REACT_APP_PRODUCTS_SERVICE"

ENV REACT_APP_ORDERS_SERVICE=a8780c0375acc4b439cac40f783c3e62-111135518.us-east-1.elb.amazonaws.com

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