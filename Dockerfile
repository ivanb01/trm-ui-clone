FROM node:20-alpine as build
WORKDIR /app
ENV CYPRESS_CACHE_FOLDER=/app/tmp/Cypress
COPY package.json yarn.lock ./
COPY . .
RUN yarn install
RUN npx cypress install
RUN yarn build

FROM cypress/included:13.10.0 as tests
WORKDIR /app
COPY --from=build /app /app

FROM nginx:stable-alpine as server
RUN ls -la /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
