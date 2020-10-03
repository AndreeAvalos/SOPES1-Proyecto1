FROM python:alpine
WORKDIR /server
RUN mkdir -p /elements
RUN pip install Flask \
    && pip install -U flask-cors

COPY . . 

CMD ["python", "main.py"]