# 会把src 目录等显示出来
# FROM node:18

# WORKDIR /app

# COPY package.json .

# RUN npm config set registry https://registry.npmmirror.com/

# RUN npm install

# COPY . .

# # 在某些情况下，可能会发现 /sbin/runc 文件不存在，或是在 /usr/bin 目录下需要这个文件。为了解决这个问题，可以使用 ln -s 命令创建一个软链接，将 /sbin/runc 链接到 /usr/bin/runc。这样做的好处是在 /usr/bin 目录下也能够找到 runc，并且能够方便地使用它。
# RUN ln -s /sbin/runc /usr/bin/runc
# RUN npm run build

# EXPOSE 3000

# CMD [ "node", "./dist/main.js" ]




# 两次构建，src 等目录就不再需要了，构建的时候需要这些，但运行的时候只需要 dist 目录就可以了
# build stage
# FROM node:18 as build-stage

# WORKDIR /app

# COPY package.json .

# RUN npm config set registry https://registry.npmmirror.com/

# RUN npm install

# COPY . .

# RUN npm run build

# # production stage
# FROM node:18 as production-stage

# COPY --from=build-stage /app/dist /app
# COPY --from=build-stage /app/package.json /app/package.json

# WORKDIR /app

# RUN npm install --production

# EXPOSE 3000

# CMD ["node", "/app/main.js"]






# 那是因为我们用的基础的 linux 镜像比较大，可以换成 alpine 的，这是一个 linux 发行版，主打的就是一个体积小。
FROM node:18.0-alpine3.14 as build-stage

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# production stage
# node:18-alpine3.14 就是用 alpine 的 linux 的 3.14 版本，用 node 的 18.0 版本。
FROM node:18.0-alpine3.14 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm install --production
# 如果是 pm2
# RUN npm install pm2 -g

EXPOSE 3000

CMD ["node", "/app/main.js"]
# pm2
# CMD ["pm2-runtime", "/app/main.js"]


