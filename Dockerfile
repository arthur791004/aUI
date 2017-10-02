# install node
FROM node:8.6.0

MAINTAINER Arthur Chu "arthur791004@gmail.com"

# setup container
WORKDIR /aUI

# add repository root to container
ADD . /aUI

# install npm package
RUN npm install pm2 -g
RUN npm install --production

# setup ENV
ENV NODE_ENV production
ENV PORT 80

# run
# CMD ["pm2-docker", "server"]

