import uvicorn
from fastapi import FastAPI,File,UploadFile, Form,Request,Depends,Body
from pydantic import BaseModel
from passlib.context import CryptContext
import pickle
import numpy as np
import argparse
import os
from io import BytesIO
import cv2
from werkzeug.utils import secure_filename
import pytesseract
from pytesseract import Output
from io import BytesIO
import glob
import requests
import pandas as pd
import re
from os.path import join, dirname, realpath
import base64
import io  # from native modules
from PIL import Image, ImageFile  # from Pillow
from colorama import Fore  # from native modules
import platform  # from native modules
from textblob import TextBlob
import PIL
from os.path import join, dirname, realpath
import json
from detect import start
import io  # from native modules
from colorama import Fore  # from native modules
import platform  # from native modules
import nltk
from pathlib import Path
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, f1_score
import re
from functools import wraps
from jose import jwt
import datetime
import pymongo
from base64 import b64decode
from base64 import b64encode
from fastapi.middleware.cors import CORSMiddleware
from dataclasses import dataclass, field
from base64 import decodestring
SECRET_KEY = '004f2af45d3a4e161a7dd2d17fdae47f'
nltk.download('punkt')
from nltk.corpus import stopwords
nltk.download('stopwords')
from nltk.stem import WordNetLemmatizer

lm= WordNetLemmatizer()
nltk.download('wordnet')
stopwords.words("english")
# pytesseract.pytesseract.tesseract_cmd = 'C:/Users/lcharankumar/AppData/Local/Tesseract-OCR//tesseract.exe'

SECRET_KEY = '004f2af45d3a4e161a7dd2d17fdae47f'

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
classes = ['Appliances', 'Automotive', 'Electronics', 'Health Care', 'beauty',
           'food', 'industry']

lang_input_glob = 'english'           
predicted_response = {
    'company_name':'',
    'from_address':'',
    'to_address':'',
    'invoice_date':'',
    'due_date':'',
    'phone_number':'',
    'invoice_number':'',
    'currency':'',
    'total':'',
    'sub_total':'',
    'tax':'',
    'discount':'',
    'barcode':'',
    'logo':'',
    'category':'',
    'bill_of_materials':[
        {
            "description":[],
            "quantity":[],
            "unit_price":[],
            "price":[],
        }
    ]
}

def empty_resp():
    return {
    'company_name':'',
    'from_address':'',
    'to_address':'',
    'invoice_date':'',
    'due_date':'',
    'phone_number':'',
    'invoice_number':'',
    'currency':'',
    'total':'',
    'sub_total':'',
    'tax':'',
    'discount':'',
    'barcode':'',
    'logo':'',
    'category':'',
    'bill_of_materials':[
        {
            "description":[],
            "quantity":[],
            "unit_price":[],
            "price":[],
        }
    ]
}

pickled_model = pickle.load(open('textmodel2.pkl', 'rb'))


def token_required(token:str = Body()):
    if not token:
        return {'message': 'a valid token is missing'}
    try:
        data6 = jwt.decode(token,SECRET_KEY, algorithms=["HS256"])
    except:
        return {'message': 'token is invalid'}



@app.post('/login')
def login(uid:str = Form(),password:str = Form()):
    uri = "mongodb+srv://digiverz:digiverz@cluster0.ngqcelw.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    database = client['invoice']
    collection = database['users']
    flag = False
    name = ''
    role = ''
    uid1 = ''
    for post in collection.find():
        print(uid,password)
        if (post['uid'] == uid and password_context.verify(password, post['password'])):
            flag = True
            name = post['name']
            uid1 = post['uid']
            role = post['role']
            dept = post['dept']
            break
    if flag == True:
        token = jwt.encode(
            {'uid': uid1, 'name': name, 'role': role,"dept":dept,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)},
            SECRET_KEY, "HS256")
        return {'token': token, "message": "Success"}

    else:
        return {"message": "Failure"}

@app.post('/register',dependencies=[Depends(token_required)])
def data(name:str = Form(),password:str = Form(),uid:str = Form(),role:str = Form(),dept:str = Form()):
    uri = "mongodb+srv://digiverz:digiverz@cluster0.ngqcelw.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    database = client['invoice']
    collection = database['users']
    data = {}
    myquery = {"uid": uid}
    data['name'] = name
    data['password'] = password_context.hash(password)
    data['uid'] = uid
    data['role'] = role
    data['dept'] = dept
    collection1 = database['profile']
    collection1.delete_one(myquery)
    collection.insert_one(data)
    return "Success"

@app.post('/deleteuser')
def data111(uid:str = Form()):
    uri = "mongodb+srv://digiverz:digiverz@cluster0.ngqcelw.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    database = client['invoice']
    collection = database['users']
    data = {}
    myquery = {"uid": uid}
    collection.delete_one(myquery)
    collection1 = database['profile']
    collection1.delete_one(myquery)
    return "Success"

@app.post('/request',dependencies=[Depends(token_required)])
def data2(l1:str= Form(),l2:str= Form(),l3:str= Form(),dept:str = Form(),submitted:str = Form(),id:str = Form(),name:str = Form(),uid:str = Form(),role:str = Form(),status:str = Form(),data:str = Form()):
    uri = "mongodb+srv://digiverz:digiverz@cluster0.ngqcelw.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    database = client['invoice']
    collection = database['request']
    data1 = {}
    data1['id'] = id
    data1['name'] = name
    data1['uid'] = uid
    data1['role'] = role
    data1['status'] = status
    data1['data'] = data
    data1['l1'] = l1
    data1['l2'] = l2
    data1['l3'] = l3
    data1['dept'] = dept
    data1['submitted'] = submitted
    collection.insert_one(data1)
    return "Success"
    

@app.post('/requests',dependencies=[Depends(token_required)])
def data3(uid:str = Form()):
    uri = "mongodb+srv://digiverz:digiverz@cluster0.ngqcelw.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    database = client['invoice']
    collection1 = database['request']
    lst = []
    uid = uid
    print(uid)
    for x in collection1.find({"$and": [{"uid": {"$eq": uid}}]},
                                {"_id": 0, "id": 1, "name": 1, "uid": 1, "role": 1, "status": 1,"submitted": 1, "data": 1,"l1":1,"l2":1,"l3":1,"dept":1}):
        lst.append(x)
    return lst


@app.post('/allrequests',dependencies=[Depends(token_required)])
def data4():
    uri = "mongodb+srv://digiverz:digiverz@cluster0.ngqcelw.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    database = client['invoice']
    collection1 = database['request']
    lst = []
    for x in collection1.find({"$and": [{}]},
                                {"_id": 0, "id": 1, "name": 1, "uid": 1, "role": 1, "status": 1, "submitted":1 , "data": 1, "l1": 1,
                                "l2": 1, "l3": 1,"dept":1}):
        lst.append(x)
    return lst

@app.post('/update',dependencies=[Depends(token_required)])
def data5(dept:str = Form(),id:str = Form(),name:str = Form(),uid:str = Form(),role:str = Form(),status:str = Form(),l1:str = Form(),l2:str = Form(),l3:str = Form(),submitted:str = Form()):
    uri = "mongodb+srv://digiverz:digiverz@cluster0.ngqcelw.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    database = client['invoice']
    collection1 = database['request']
    lst = []
    data1 = {}
    myquery = {"id": id}
    collection1.delete_one(myquery)
    data1 = {}
    data1['id'] = id
    data1['name'] = name
    data1['uid'] = uid
    data1['role'] = role
    data1['status'] = status
    data1['data'] = data
    data1['l1'] = l1
    data1['l2'] = l2
    data1['l3'] = l3
    data1['dept'] = dept
    data1['submitted'] = submitted
    collection1.insert_one(data1)
    return "Success"

@app.post('/profile',dependencies=[Depends(token_required)])
def data6(fname:str = Form(),lname:str = Form(),uid:str = Form(),email:str = Form(),bday:str = Form(),gender:str = Form(),add1:str = Form(),add2:str = Form(),phno1:str = Form(),phno2:str = Form(),state:str = Form(),linkedin:str = Form(),img:str = Form(),country:str = Form()):
    uri = "mongodb+srv://digiverz:digiverz@cluster0.ngqcelw.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    database = client['invoice']
    collection1 = database['profile']
    lst = []
    myquery = {"uid": uid}
    collection1.delete_one(myquery)
    data1 = {}
    data1['fname'] = fname
    data1['lname'] = lname
    data1['uid'] = uid
    data1['email'] = email
    data1['bday'] = bday
    data1['gender'] = gender
    data1['country'] = country
    data1['add1'] = add1
    data1['add2'] = add2
    data1['phno1'] =phno1
    data1['phno2'] = phno2
    data1['state'] = state
    data1['linkedin'] = linkedin
    data1['img'] = img

    collection1.insert_one(data1)
    return "Success"



@app.post('/getprofile',dependencies=[Depends(token_required)])
def data10(uid:str = Form()):
    uri = "mongodb+srv://digiverz:digiverz@cluster0.ngqcelw.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    database = client['invoice']
    collection1 = database['profile']
    lst = []
    uid = uid
    print(uid)
    for x in collection1.find({"$and": [{"uid": {"$eq": uid}}]},
                                {"_id": 0, "uid": 1, "fname": 1, "lname": 1, "bday": 1, "email": 1, "gender": 1,
                                "country": 1, "add1": 1, "phno1": 1, "phno2": 1, "add2": 1, "state": 1, "linkedin": 1, "img": 1}):
        lst.append(x)
    return lst



@app.post('/getallemp',dependencies=[Depends(token_required)])
def data22():
    uri = "mongodb+srv://digiverz:digiverz@cluster0.ngqcelw.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    database = client['invoice']
    collection1 = database['users']
    lst = []
    for x in collection1.find({"$and": [{}]},
                                {"_id": 0, "uid": 1, "name": 1, "role": 1, "dept": 1}):
        lst.append(x)
    return lst

@app.post('/getalldept',dependencies=[Depends(token_required)])
def data23():
    uri = "mongodb+srv://digiverz:digiverz@cluster0.ngqcelw.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    database = client['invoice']
    collection1 = database['departments']
    lst = list(collection1.find({"$and": [{}]},
                                {"_id": 0, "dept": 1}))
    print(lst)

    return lst

@app.post('/adddept',dependencies=[Depends(token_required)])
def data28():
    uri = "mongodb+srv://digiverz:digiverz@cluster0.ngqcelw.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    database = client['invoice']
    collection1 = database['departments']
    lst = []
    # myquery = {"id": request.form.get("id")}
    # collection1.delete_one(myquery)
    data1 = {}
    data1['dept'] = ["digiverz","analytics","Human Resources"]
    collection1.insert_one(data1)
    return "Success"

@app.post('/deleteemp',dependencies=[Depends(token_required)])
def data29(uid:str = Form()):
    uri = "mongodb+srv://digiverz:digiverz@cluster0.ngqcelw.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    database = client['invoice']
    collection = database['users']
    data = {}
    myquery = {"uid": uid}
    collection.delete_one(myquery)
    collection1 = database['profile']
    collection1.delete_one(myquery)
    return "Success"



@app.post('/makeemp',dependencies=[Depends(token_required)])
def data534(uid:str = Form(),nuid:str = Form()):
    uri = "mongodb+srv://digiverz:digiverz@cluster0.ngqcelw.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    database = client['invoice']
    collection = database['users']
    collection1 = database['request']
    collection3 = database['profile']
    uid = uid
    myquery = {"uid": uid}
    newvalues = {"$set": {"uid": nuid,"role":"Employee"}}
    collection.update_one(myquery, newvalues)
    myquery = {"uid": uid}
    newvalues = {"$set": {"uid": nuid, "role": "Employee"}}
    collection1.update_many(myquery, newvalues)
    newvalues = {"$set": {"uid": nuid}}
    collection3.update_many(myquery, newvalues)
    return "Success"

@app.post('/regrade',dependencies=[Depends(token_required)])
def data535(uid:str = Form(),nuid:str = Form(),role:str = Form(),name:str = Form(),dept:str = Form()):
    uri = "mongodb+srv://digiverz:digiverz@cluster0.ngqcelw.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    database = client['invoice']
    collection = database['users']
    collection1 = database['request']
    collection3 = database['profile']
    uid = uid
    myquery = {"uid": uid}
    newvalues = {"$set": {"uid": nuid, "role": role,"name": name,"dept": dept}}
    collection.update_one(myquery, newvalues)
    myquery = {"uid": uid}
    newvalues = {"$set": {"uid": nuid, "role": role,"name": name,"dept": dept}}
    collection1.update_many(myquery, newvalues)
    newvalues = {"$set": {"uid":nuid}}
    collection3.update_many(myquery, newvalues)
    return "Success"

@app.post('/totalemp',dependencies=[Depends(token_required)])
def data5378():
    uri = "mongodb+srv://digiverz:digiverz@cluster0.ngqcelw.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    database = client['invoice']
    collection = database['total']
    lst = list(collection.find({"$and": [{"id": {"$eq": 1}}]},
                                {"_id": 0, "total": 1}))

    print(lst)
    return lst

@app.post('/addtotal',dependencies=[Depends(token_required)])
def data5359(total:str = Form()):
    uri = "mongodb+srv://digiverz:digiverz@cluster0.ngqcelw.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    database = client['invoice']
    collection = database['total']
    myquery = {"id": 1}
    newvalues = {"$set": {"total": total}}
    collection.update_one(myquery, newvalues)
    return "Success"

@app.post('/totalreq',dependencies=[Depends(token_required)])
def data5379():
    uri = "mongodb+srv://digiverz:digiverz@cluster0.ngqcelw.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    database = client['invoice']
    collection = database['total']
    lst = list(collection.find({"$and": [{"id": {"$eq": 2}}]},
                                {"_id": 0, "total": 1}))

    return lst

@app.post('/addtotalreq',dependencies=[Depends(token_required)])
def data5389(total:str = Form()):
    uri = "mongodb+srv://digiverz:digiverz@cluster0.ngqcelw.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    database = client['invoice']
    collection = database['total']
    myquery = {"id": 2}
    newvalues = {"$set": {"total": total}}
    collection.update_one(myquery, newvalues)
    return "Success"



@app.post('/token',dependencies=[Depends(token_required)])

def tokencheck(token:str = Form()):
    return "Success"




def categorize(final_text):
    conf = pickled_model.predict_proba([final_text])
    confidence_classes = {classes[i]: conf[0][i] for i in range(len(conf[0]))}
    print(confidence_classes)
    max_conf = max(conf[0])
    max_class = sorted(confidence_classes, key=lambda x: confidence_classes[x])[-1]
    if max(conf[0]) < 0.5:
        sorted(confidence_classes, key=lambda x: confidence_classes[x])[-1]
        return "miscellaneous",100
    else:
        return str(pickled_model.predict([final_text])[0]),max(conf[0]) * 100



# get grayscale image
def get_grayscale(image):
    img = cv2.fastNlMeansDenoisingColored(image, None, 20,20,7,21) 
    return cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)


# noise removal
def remove_noise(image):
    return cv2.medianBlur(image, 5)


# thresholding
def thresholding(image):
    return cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]


# dilation
def dilate(image):
    kernel = np.ones((5, 5), np.uint8)
    return cv2.dilate(image, kernel, iterations=1)


# erosion
def erode(image):
    kernel = np.ones((5, 5), np.uint8)
    return cv2.erode(image, kernel, iterations=1)


# opening - erosion followed by dilation
def opening(image):
    kernel = np.ones((5, 5), np.uint8)
    return cv2.morphologyEx(image, cv2.MORPH_OPEN, kernel)


# canny edge detection
def canny(image):
    return cv2.Canny(image, 100, 200)


# skew correction
def deskew(image):
    coords = np.column_stack(np.where(image > 0))
    angle = cv2.minAreaRect(coords)[-1]
    if angle < -45:
        angle = -(90 + angle)

    else:
        angle = -angle
        (h, w) = image.shape[:2]
        center = (w // 2, h // 2)
        M = cv2.getRotationMatrix2D(center, angle, 1.0)
        rotated = cv2.warpAffine(image, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
        return rotated


# template matching
def match_template(image, template):
    return cv2.matchTemplate(image, template, cv2.TM_CCOEFF_NORMED)


def seperate(arr):
    array=[]
    temp=""
    seq=False
    for i in arr:
        pre_seq = seq
        if i:
            seq = True
            temp+=i+" "
        else:
            seq = False
            temp = ""
        if pre_seq and seq:
            array[-1]+=temp
            temp = ''
        if pre_seq == False and seq == True:  
            try:
                array[-1] = array[-1].strip(" ")
            except:
                pass
            array.append(temp)
            temp=""
    try:
        array[-1] = array[-1].strip(" ")
    except:
        pass
    return array

    # return " ".join(array[1:]) if len(array)>1 else array[0].split(" ")[-1]


# def correction(text):
#     text = "".join(text)
#     text = TextBlob(text).correct()
#     return str(text)


def total(img,lang_input):
    # Adding custom options
    if lang_input=='english':
        custom_config = r'-l eng --oem 3 --psm 11 -c tessedit_char_blacklist="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$£€¥" -c tessedit_char_whitelist="0123456789,."'
        canny = get_grayscale(img)
        h, w = canny.shape
        d = pytesseract.image_to_data(canny, config=custom_config, output_type=Output.DICT)
        # d = correction(d['text'])
        d = "".join(d['text'])
        d = re.findall(r'[\d,.$£€¥₹]*', d)
        d = "".join(d)
        return d

    elif lang_input == 'arabic':
        custom_config = r"--psm 11 --oem 3 -c tessedit_char_whitelist=1234567890,."
        img = get_grayscale(img)
        result = pytesseract.image_to_string(img, lang='ara',config=custom_config)
        return [i for i in result.split("\n") if i] if len([i for i in result.split("\n") if i])>1 else result.strip("\n .")

        

def address(img,lang_input):
    # Adding custom options
    if lang_input == 'english':
        custom_config = r'-l eng --psm 11 --oem 3'
        canny = get_grayscale(img)
        ignore_words = [ 'SHIPTO', 'BILLEDTO', 'YOURCOMPANYNAME', 'FROM', 'TO', 'SHIP', 'SHIPPING', 'BILLOF', 'ADDRESS', 'BILLING', 'BILLTO', 'SHIPTO', 'SHIPPINGTO', 'BILLINGTO','SHIP TO', 'BILLED TO', 'YOUR COMPANY NAME', 'FROM', 'TO', 'SHIP', 'SHIPPING', 'BILL OF', 'ADDRESS', 'BILLING', 'BILL TO', 'SHIP TO', 'SHIPPING TO', 'BILLING TO',"ship to","billed to",'your company name','from','to','ship','shipping','bill of','address','billing','bill to','ship to','shipping to','billing to','shipto', 'billedto', 'yourcompanyname', 'from', 'to', 'ship', 'shipping', 'billof', 'address', 'billing', 'billto', 'shipto', 'shippingto', 'billingto']
        d = pytesseract.image_to_string(canny, config=custom_config,output_type=Output.DICT)
        print(d['text'])
        d = d['text'].replace('\n',' ')
        d = d.split(' ')
        d = [x for x in d if x.lower() not in ignore_words]
        d = " ".join(d).replace('  ','\n')
        return d
    elif lang_input == 'arabic':
        img = get_grayscale(img)
        custom_config = r'-l ara --oem 3 --psm 6'
        d = pytesseract.image_to_string(img, config=custom_config)
        return d

    


def invoice_number(img,lang_input):
    if lang_input == 'english':
        custom_config = r'-l eng --psm 11 --oem 3'
        canny = get_grayscale(img)
        d = pytesseract.image_to_data(canny, config=custom_config, output_type=Output.DICT)
        # d = correction(d['text'])
        print(d['text'])
        d = seperate(d['text'])
        print("after sep",d)
        try:
           return " ".join(d[1:]) if len(d)>1 else d[0].split(" ")[-1]
        except:
            pass
    elif lang_input=='arabic':
        custom_config = r'-l ara+eng --oem 3 --psm 11'
        d = pytesseract.image_to_data(img, config=custom_config,output_type = Output.DICT)
        d = seperate(d['text'])
        if len(d)>1:
            return d[1]
        else:
            return d

def date_extract(img,lang_input):
    if lang_input=='english':
        custom_config = r'-l eng --psm 4 --oem 3'
        keywords = ['due','end']
        canny = get_grayscale(img)
        d = pytesseract.image_to_data(img, config=custom_config, output_type=Output.DICT)
        print("date",d['text'])
        d = seperate(d['text'])
        try:
            for i in ['due','end']:
                if i in " ".join(d).lower():
                    predicted_response['due_date']=d[-1].split(" ")[-1]
                
            else:
                    predicted_response['invoice_date']=d[-1].split(" ")[-1]
        except:
            pass
    elif lang_input=='arabic':
        custom_config = r'-l ara --psm 4 --oem 3'
        keywords = ['due','end']
        canny = get_grayscale(img)
        d = pytesseract.image_to_data(img, config=custom_config, output_type=Output.DICT)
        print("date",d['text'])
        d = seperate(d['text'])
        try:
            for i in ['due','end']:
                if i in " ".join(d).lower():
                    predicted_response['due_date']=d[-1].split(" ")[-1]
                
            else:
                    predicted_response['invoice_date']=d[-1].split(" ")[-1]
        except:
            pass
    

def currency_extract(img,lang_input):
    canny = get_grayscale(img)
    h, w = canny.shape
    if lang_input=='english':
        custom_config = r'-l eng --oem 3 --psm 6 -c tessedit_char_whitelist="$£€¥₹"'
        d = pytesseract.image_to_data(img, config=custom_config, output_type=Output.DICT)
        print("currency",d['text'])
        # d = correction(d['text'])
        d = "".join(d['text'])
        d = "".join(d)
        return d
    elif lang_input=='arabic':
        custom_config = r'-l eng --oem 3 --psm 11 -c tessedit_char_whitelist="د.إ"'
        d = pytesseract.image_to_data(img, config=custom_config, output_type=Output.DICT)
        print("currency",d['text'])
        # d = correction(d['text'])
        d = "".join(d['text'])
        d = "".join(d)
        return d

def col_extract(img):
    img = cv2.resize(img, (int(img.shape[1] + (img.shape[1] * .1)),
                           int(img.shape[0] + (img.shape[0] * .25))),
                     interpolation=cv2.INTER_AREA)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    custom_config = r'-l eng --oem 3 --psm 6 -c tessedit_char_whitelist="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-:.$%.,/@& *"'
    d = pytesseract.image_to_data(img_rgb, config=custom_config, output_type=Output.DICT)
    df = pd.DataFrame(d)
    print(df)
    df1 = df[(df.conf != '-1') & (df.text != ' ') & (df.text != '')]
    pd.set_option('display.max_rows', None)
    pd.set_option('display.max_columns', None)
    sorted_blocks = df1.groupby('block_num').first().sort_values('top').index.tolist()
    try:
        for block in sorted_blocks:
            curr = df1[df1['block_num'] == block]
            sel = curr[curr.text.str.len() > 3]
            # sel = curr
            char_w = (sel.width / sel.text.str.len()).mean()
            prev_par, prev_line, prev_left = 0, 1, 0
            text = ''
            l = []
            for ix, ln in curr.iterrows():
                if prev_par != ln['par_num']:
                    text += '\n'
                    prev_par = ln['par_num']
                    prev_line = ln['line_num']
                    prev_left = 0
                elif prev_line != ln['line_num']:
                    text += '\n'
                    prev_line = ln['line_num']
                    prev_left = 0
                added = 0  # num of spaces that should be added
                if ln['left'] / char_w > prev_left + 1:
                    added = int((ln['left']) / char_w) - prev_left
                    text += ' ' * added
                text += ln['text'] + ' '

                prev_left += len(ln['text']) + added + 1

            text += '\n'
            text = text.split('\n')
            res = [x.strip(' ') for x in text if x.strip(' ')]
        return res[1::]
    except:
        pass


def arabic_col_extract(img):
    custom_config = r"--psm 11 --oem 3"
    return [i for i in pytesseract.image_to_string(img, lang='ara',config=custom_config).split("\n")[1:] if i]

def company_name_extract(img):
    custom_config = r'-l eng+ara --psm 11 --oem 3'
    canny = get_grayscale(img)
    d = pytesseract.image_to_string(canny, config=custom_config,output_type=Output.DICT)
    print("company",d['text'])
    d = d['text']
    d = "".join(d)
    return d

def phone_number(img,lang_input):
    custom_config = r'-l eng --psm 11 --oem 3 -c tessedit_char_whitelist="0123456789+"'
    canny = get_grayscale(img)
    d = pytesseract.image_to_data(img, config=custom_config, output_type=Output.DICT)
    print("phone number",d['text'])
    # d = correction(d['text'])
    d = "".join(d['text'])
    return d
         


def tax_extract(img,lang_input):
    if lang_input == 'english':
        custom_config = r'-l eng --psm 11 --oem 3 -c tessedit_char_whitelist="0123456789%,."'
        canny = get_grayscale(img)
        d = pytesseract.image_to_data(canny, config=custom_config, output_type=Output.DICT)
        print("hello",d['text'])
        d = seperate(d['text'])
        d = "".join(d[-1])
        return d
    elif lang_input == 'arabic':
        custom_config = r"--psm 11 --oem 3 -c tessedit_char_whitelist=1234567890%.)("
        img = get_grayscale(img)
        result = pytesseract.image_to_string(img, lang='ara',config=custom_config)
        return [i for i in result.split("\n") if i] if len([i for i in result.split("\n") if i])>1 else result.strip("\n .")
        

def discount_extract(img,lang_input):
    if lang_input=='english':
        custom_config = r'-l eng --psm 11 --oem 3 -c tessedit_char_whitelist="0123456789,."'
        canny = get_grayscale(img)
        d = pytesseract.image_to_data(canny, config=custom_config, output_type=Output.DICT)
        print("hello",d['text'])
        #d = seperate(d['text'])
        print(d)
        return "".join(d['text'])
    elif lang_input == 'arabic':
        custom_config = r"--psm 11 --oem 3 -c tessedit_char_whitelist=1234567890%.)("
        img = get_grayscale(img)
        result = pytesseract.image_to_string(img, lang='ara',config=custom_config)
        return [i for i in result.split("\n") if i] if len([i for i in result.split("\n") if i])>1 else result.strip("\n .")


def base64_create(img):
    _, im_arr = cv2.imencode('.jpg', img)  # im_arr: image in Numpy one-dim array format.
    im_bytes = im_arr.tobytes()
    im_b64 = base64.b64encode(im_bytes)
    jpg_buffer = str(im_b64)[2:len(str(im_b64)) - 1]
    return jpg_buffer




def table(img):
    img = cv2.resize(img, (int(img.shape[1] + (img.shape[1] * .1)),
                           int(img.shape[0] + (img.shape[0] * .25))),
                     interpolation=cv2.INTER_AREA)

    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    custom_config = r'-l eng --oem 3 --psm 6 -c tessedit_char_whitelist="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-:.$%.,/@& *"'
    d = pytesseract.image_to_data(img_rgb, config=custom_config, output_type=Output.DICT)
    df = pd.DataFrame(d)
    print(df)
    df1 = df[(df.conf != '-1') & (df.text != ' ') & (df.text != '')]
    pd.set_option('display.max_rows', None)
    pd.set_option('display.max_columns', None)
    values = []
    headers = []
    sorted_blocks = df1.groupby('block_num').first().sort_values('top').index.tolist()
    for block in sorted_blocks:
        curr = df1[df1['block_num'] == block]
        sel = curr[curr.text.str.len() > 3]
        # sel = curr
        char_w = (sel.width / sel.text.str.len()).mean()
        prev_par, prev_line, prev_left = 0, 0, 0
        text = ''
        l = []
        for ix, ln in curr.iterrows():
            if prev_par != ln['par_num']:
                text += '\n'
                prev_par = ln['par_num']
                prev_line = ln['line_num']
                prev_left = 0
            elif prev_line != ln['line_num']:
                text += '\n'
                prev_line = ln['line_num']
                prev_left = 0
            added = 0  # num of spaces that should be added
            if ln['left'] / char_w > prev_left + 1:
                added = int((ln['left']) / char_w) - prev_left
                text += ' ' * added
            text += ln['text'] + ' '

            prev_left += len(ln['text']) + added + 1

        text += '\n'
        text = text.split('\n')
        res = [x for x in text if x.strip()]
        z = res[0].split('   ')
        
        headers = [x.strip(' ') for x in z if x.strip()]
        
        for i in range(1, len(res)):
            values.append([x.strip(' ') for x in res[i].split('    ') if x.strip()])
    return (headers, values)





@app.post('/predict',dependencies=[Depends(token_required)])
def predict(file_input: bytes = File(),lang_input:str = Form()):
    global predicted_response
    predicted_response = empty_resp()
    image = file_input
    image = io.BytesIO(image)
    global lang_input_glob
    lang_input_glob = lang_input
    # choice = ['invono','date','total','table','address']
    exist_classes = []
    #print(os.path.join(UPLOAD_FOLDER, filename))
    #image.save(os.path.join('/tmp',filename))]
    classes = ['company_name', 'from_address', 'to_address', 'date', 'phone_number', 'invoice_number', 'total', 'sub_total', 'tax', 'discount', 'barcode', 'logo', 'description_col', 'qty_col', 'price_col', 'unitprice_col', 'header', 'table']
    # read input image
    image2 = np.asarray(Image.open(image).convert('RGB'))
    image3 = np.asarray(Image.open(image).convert('RGB'))
    image2 = cv2.cvtColor(image2, cv2.COLOR_RGB2BGR)
    image3 = cv2.cvtColor(image3, cv2.COLOR_RGB2BGR)
    values, img = start('best_1000.pt', image2)
    #cv2.imwrite('hi.jpg',img)
    COLORS = np.random.uniform(0, 255, size=(len(classes), 3))
    dw = image2.shape[1]
    dh = image2.shape[0]
    table_values = []
    currency = ''
    header = []
    column_count = 0
    header_len = 0
    print("label index:",[i[0] for i in values])
    for i in values:
        class_id = int(i[0])
        w = i[3]
        h = i[4]
        x = i[1]
        y = i[2]
        confidence = i[5]
        print(class_id)
        label = str(classes[class_id])
        x_center, y_center, w, h = float(x), float(y), float(w), float(h)
        x_center = round(x_center * dw)
        y_center = round(y_center * dh)
        w = round(w * dw)
        h = round(h * dh)
        x = round(x_center - w / 2)
        y = round(y_center - h / 2)
        cropped_image = image3[y:y + h, x:x + w]
        # color = COLORS[int(class_id)]
        # print("+",x+w, y+h)
        # cv2.rectangle(image, (x, y), (x+w, y+h), color, 2)
        #cv2.imwrite(os.path.join(app.config['CROPPED_FOLDER'], str(classes[class_id]) + '.png'), cropped_image)
        #cv2.putText(img, label, (x - 10, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)
        print("label->",label)
        if label == 'from_address':
            # s = address(cropped_image)
            predicted_response['from_address'] = address(cropped_image,lang_input)
        elif label == 'to_address':
            predicted_response['to_address'] = address(cropped_image,lang_input)
        elif label == 'total':
            predicted_response['total'] = total(cropped_image,lang_input)
            if currency=='':
               currency = currency_extract(cropped_image,lang_input)
               predicted_response['currency'] = currency
        elif label == 'invoice_number':
            predicted_response['invoice_number'] = invoice_number(cropped_image,lang_input)
        elif label == 'date':
            date_extract(cropped_image,lang_input)
        elif label == 'company_name':
             predicted_response['company_name'] = company_name_extract(cropped_image)
        elif label == 'qty_col':
             if lang_input=='english':
                predicted_response['bill_of_materials'][0]['quantity'] = col_extract(cropped_image)
                
             elif lang_input=='arabic':
                predicted_response['bill_of_materials'][0]['quantity'] = arabic_col_extract(cropped_image)
             column_count+=1
        elif label == 'price_col':
             if lang_input=='english':
                predicted_response['bill_of_materials'][0]['price'] = col_extract(cropped_image)
                
             elif lang_input=='arabic':
                predicted_response['bill_of_materials'][0]['price'] = arabic_col_extract(cropped_image)
             column_count+=1         
        elif label == 'description_col':
             if lang_input=='english':
                predicted_response['bill_of_materials'][0]['description'] = col_extract(cropped_image)
                
             elif lang_input=='arabic':
                predicted_response['bill_of_materials'][0]['description'] = arabic_col_extract(cropped_image)
             column_count+=1

        elif label == 'unitprice_col':
            if lang_input=='english':
                predicted_response['bill_of_materials'][0]['unit_price'] = col_extract(cropped_image)
                
            elif lang_input=='arabic':
                predicted_response['bill_of_materials'][0]['unit_price'] = arabic_col_extract(cropped_image)
            column_count+=1
          
        elif label == 'sub_total':
            predicted_response['sub_total'] = total(cropped_image,lang_input)
            if currency=='':
               currency = currency_extract(cropped_image,lang_input)
               predicted_response['currency'] = currency
        elif label == "phone_number":
            predicted_response['phone_number'] = phone_number(cropped_image,lang_input)
        elif label == 'logo':
             predicted_response['logo'] = base64_create(cropped_image)
        elif label == 'barcode':
             predicted_response['barcode'] = base64_create(cropped_image)
        elif label == 'tax':
            predicted_response['tax'] = tax_extract(cropped_image,lang_input)
            if currency=='':
               currency = currency_extract(cropped_image,lang_input)
               predicted_response['currency'] = currency
        elif label == 'discount':
            predicted_response['discount'] = discount_extract(cropped_image,lang_input)
            if currency=='':
               currency = currency_extract(cropped_image,lang_input)
               predicted_response['currency'] = currency
        elif label == 'header':
             header = table(cropped_image)[0]
             print("headers 1",header)
             header_len = len(header)
        elif label == 'table':
            table_img = cropped_image
            s = table(cropped_image)
            table_values = s[1]
             

    # if header_len!=column_count and column_count<4:
    #    table_values = table(table_img)[1]
    #    print("values",table_values)
    #    print("header",header)
    #    print("column",column_count)

    # if header_len>column_count and column_count<4:
    #     for i,j in enumerate(predicted_response['bill_of_materials'][0]):
    #         if len(predicted_response['bill_of_materials'][0][j])==0:
    #             if len(table_values[0])==header_len:
    #                 print(i)
    #                 predicted_response['bill_of_materials'][0][j]=[x[i] for x in table_values if len(x)>=i]
    #             elif len(table_values[0])>header_len:
    #                  table_values = [x[1::] for x in table_values]
    #                  predicted_response['bill_of_materials'][0][j]=[x[i] for x in table_values if len(x)>=i]



    
    g = []
    for i in table_values:
        f = ''.join([j for j in " ".join(i) if not j.isdigit()])
        g.append(f)
    sentence = "".join(g)

    sentence = sentence.lower()
    words = nltk.word_tokenize(sentence.lower())

    new_words = [word for word in words if word.isalnum()]

    WordSet = []
    for word in new_words:
        if word not in set(stopwords.words("english")):
            WordSet.append(word)
    final_text = " ".join(WordSet)
    predicted_response['category'] = categorize(final_text)[0]


        

    
    
    # byte_io.close()
    # cv2.imwrite(os.path.join(app.config['PREDICTION_FOLDER'], name),image)
    #
    # # release resources
    # cv2.destroyAllWindows()

    return predicted_response


@app.post('/crop',dependencies=[Depends(token_required)])    
def crop(file_input: bytes = File(),label_input: str = Form()):
    image = file_input
    label = label_input
    image = io.BytesIO(image)
    cropped_image = np.asarray(Image.open(image).convert('RGB'))
    cropped_image = cv2.cvtColor(cropped_image, cv2.COLOR_RGB2BGR)
    print(label)
    if label == 'from_address' or label=='to_address':
        print("address")
        # print(cropped_image.shape)
        # s = requests.post(url='https://ocr-tesseract-api2.herokuapp.com/predictocr',
        #                   json={"text_nlp[]": cropped_image.tolist(), "label": label})
        s = address(cropped_image,lang_input_glob)
        text = s
        return text

    elif label == 'company_name':
        s = company_name_extract(cropped_image)
        text  = s
        return text        
    elif label == 'total':
        s = total(cropped_image,lang_input_glob)
        # s = requests.post(url='https://ocr-tesseract-api2.herokuapp.com/predictocr',
        #                   json={"text_nlp[]": cropped_image.tolist(), "label": label})
        # s = address(cropped_image)
        text = s
        print(text)
        return text
    elif label == 'invoice_number':
        # s = invoice_number(cropped_image)
        # s = requests.post(url='https://ocr-tesseract-api2.herokuapp.com/predictocr',
        #                   json={"text_nlp[]": cropped_image.tolist(), "label": label})
        # s = address(cropped_image)
        s = invoice_number(cropped_image,lang_input_glob)
        print(s)
        text = s
        return text
    elif label == 'invoice_date' or label == 'due_date':
        # s = date_extract(cropped_image)
        # s = requests.post(url='https://ocr-tesseract-api2.herokuapp.com/predictocr',
        #                   json={"text_nlp[]": cropped_image.tolist(), "label": label})
        # s = address(cropped_image)
        s = date_extract(cropped_image,lang_input_glob)
        text = s
        return text

    elif label == 'phone_number':
        # s = date_extract(cropped_image)
        # s = requests.post(url='https://ocr-tesseract-api2.herokuapp.com/predictocr',
        #                   json={"text_nlp[]": cropped_image.tolist(), "label": label})
        # s = address(cropped_image)
        s = phone_number(cropped_image,lang_input_glob)
        text = s
        return text
    
    elif label == 'sub_total':
        s =  total(cropped_image,lang_input_glob)
        text = s
        return text
    elif label == 'logo':
        s = base64_create(cropped_image)
        return s
    elif label == 'barcode':
         s = base64_create(cropped_image)
         return s
    elif label == 'tax':
        s = tax_extract(cropped_image,lang_input_glob)
        return s
        
    elif label == 'discount':
        s = discount_extract(cropped_image,lang_input_glob)
        return s
       

    elif label == 'table':
        # s = requests.post(url='https://ocr-tesseract-api2.herokuapp.com/predictocr',
        #                   json={"text_nlp[]": cropped_image.tolist(), "label": label})
        s = table(cropped_image)
        headers_table = s[0]
        values_table = s[1]
        g = []
        for i in values_table:
            f = ''.join([j for j in " ".join(i) if not j.isdigit()])
            g.append(f)
        sentence = "".join(g)
        sentence = sentence.lower()
        words = nltk.word_tokenize(sentence.lower())
        new_words = [word for word in words if word.isalnum()]
        WordSet = []
        for word in new_words:
            if word not in set(stopwords.words("english")):
                WordSet.append(word)
        final_text = " ".join(WordSet)
        # category = categorize(final_text)
        # response_data = category.json()
        # category_data = response_data['category']
        # category_conf = response_data['category_conf']
        return {'headers':headers_table,'values':values_table}

    else:
        return ''


    
if __name__ == "__main__":
    uvicorn.run(app, host='0.0.0.0',port=5000, log_level="info")


