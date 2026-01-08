FROM node:25-alpine

WORKDIR /app

ARG FRONTEND_PATH

COPY ${FRONTEND_PATH}/package*.json ./
RUN npm ci

COPY ${FRONTEND_PATH}/ .

EXPOSE 5173
CMD sh -c "npm run dev -- --host"