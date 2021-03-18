FROM node:latest
WORKDIR /app
COPY . .
# remove deploy files
RUN rm -rf deploy/
# install dep
RUN npm ci
# starts app
CMD ["npm", "run", "serve"]