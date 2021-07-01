FROM node:lts
COPY . /usr/src/app
WORKDIR /usr/src/app
EXPOSE 8000
RUN ["yarn"]
RUN ["yarn", "build"]
CMD ["yarn", "start"]