# build environment
FROM node:9.6.1 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install react-scripts@1.1.1 -g --silent
COPY . /usr/src/app
ENV REACT_APP_GIT_COMMIT $GIT_COMMIT
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine
ARG GIT_COMMIT=unspecified
LABEL git_commit=$GIT_COMMIT
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
