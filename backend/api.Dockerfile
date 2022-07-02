FROM python:3.9
WORKDIR /app

COPY .env requirements.txt .flaskenv entrypoint.sh ./
COPY migrations ./migrations
COPY api ./api

RUN apt-get update && apt-get install -y netcat

RUN pip install -r ./requirements.txt
ENV FLASK_ENV production

EXPOSE 5000
CMD ["gunicorn", "-b", ":5000", "api.app:app"]

ENTRYPOINT ["/app/entrypoint.sh"]
