FROM python:3.7

RUN pip install --upgrade pip

RUN apt-get update -qq 

RUN apt-get install -y -qq libtesseract-dev libleptonica-dev tesseract-ocr

RUN apt-get install -y -qq \
  tesseract-ocr-eng \
  tesseract-ocr-ara \
  tesseract-ocr-script-deva

WORKDIR /app

ENV FLASK_APP=app.py 

ENV FLASK_ENV=development

COPY ./requirements.txt .

RUN pip install -r requirements.txt

EXPOSE 5000

COPY . .

CMD ["uvicorn", "app:app", "--host", "0.0.0.0","--port","5000"]

