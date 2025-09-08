
# PUSH PRE-BUILT APP
# ---------------------------------------
FROM node:21.7.1-alpine AS sk-build
WORKDIR /usr/src/app

COPY . /usr/src/app
# COPY build ./build

# Can be commented out!
RUN apk --no-cache add curl tzdata
RUN npm install
# RUN npm install --omit=dev

EXPOSE 3000
CMD ["node", "build/index.js"]