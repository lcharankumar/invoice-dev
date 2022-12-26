# start by pulling the python image
FROM python:3.7

RUN pip install --upgrade pip

RUN apt-get update -qq 

RUN apt-get install -y -qq libtesseract-dev libleptonica-dev

ENV TESSDATA_PREFIX=/usr/share/tesseract-ocr/4.00/tessdata/

RUN apt-get install -y -qq \
  tesseract-ocr-eng \
  tesseract-ocr-ara 

ADD https://github.com/tesseract-ocr/tessdata_best/raw/main/eng.traineddata /usr/share/tesseract-ocr/4.00/tessdata/eng.traineddata
ADD https://github.com/tesseract-ocr/tessdata_best/raw/main/ara.traineddata /usr/share/tesseract-ocr/4.00/tessdata/ara.traineddata


WORKDIR /app

ENV FLASK_APP=app.py 

ENV FLASK_ENV=development

COPY ./requirements.txt .

RUN pip install -r requirements.txt

EXPOSE 5000

COPY . .

CMD ["uvicorn", "app:app", "--host", "0.0.0.0","--port","5000"]


