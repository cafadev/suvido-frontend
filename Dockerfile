FROM node:16.13.1

# RUN apt-get -y update && apt-get -y install git
# RUN npm install npm -g && npm update npm -g

RUN userdel -r node

ARG user=frontend
ARG uid=1000
ARG gid=1000

RUN addgroup --gid $gid ${user}
RUN adduser --disabled-password --gecos '' --uid $uid --gid $gid ${user}

USER ${user}

RUN mkdir -p /home/${user}/app

WORKDIR /home/${user}/app

RUN mkdir -p node_modules

COPY --chown=${user}:${user} package*.json ./

RUN npm install

COPY . .

RUN chown -R ${user}:${user} node_modules

# USER ${user}

RUN npm run build
ENTRYPOINT ["./entrypoint.sh"]
