FROM zenika/alpine-chrome:77-with-puppeteer
USER root
RUN apk add --no-cache font-noto-cjk@edge
USER chrome
COPY . /app
ENTRYPOINT ["tini", "--"]
CMD ["node", "/app/app.js"]
