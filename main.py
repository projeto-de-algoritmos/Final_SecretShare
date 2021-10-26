from fastapi import FastAPI, File, UploadFile
from fastapi import FastAPI, status
from fastapi.datastructures import UploadFile
from fastapi.params import File
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
from huff import Huffman_Encoding, Huffman_Decoding
import shutil
import os
import json
import glob
from fastapi.responses import JSONResponse


class Secret(BaseModel):
    author: str
    title: str
    text: str


class User(BaseModel):
    name: str
    password: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open('graph.json') as json_file:
    GRAPH = json.load(json_file)


@app.get("/")
async def root():
    return {"message": "Hello World!!"}


@app.post("/create_user")
async def create_user(user: User):
    GRAPH[user.name] = {"followers": [], "password": user.password}

    with open('graph.json', 'w') as outfile:
        json.dump(GRAPH, outfile)

    return user


@app.post("/follow_user")
async def follow_user(current_user: str, followed_user: str):
    followers = GRAPH[followed_user]["followers"]
    followers.append(current_user)

    GRAPH[followed_user] = {"followers": followers}

    with open('graph.json', 'w') as outfile:
        json.dump(GRAPH, outfile)

    return GRAPH[followed_user]


@app.post("/secret")
async def post_secret(secret: Secret):

    data = secret.text
    title = secret.title

    author = secret.author

    encoding, tree = Huffman_Encoding(data)

    with open(f"./_created_pickles/{title}.key", "wb") as output_file:
        pickle.dump(tree, output_file)

    with open(f'./_secrets/{author}-{title}.txt', 'w') as f:
        f.write(encoding)

    return {"message": "secret shared"}


@app.get("/filekey")
async def file(title: str):

    file_path = f"./_created_pickles/{title}.key"
    file_name = f'{title}.key'

    return FileResponse(path=file_path, filename=file_name)


@app.post("/read_secret")
async def read_secret(author: str, file: UploadFile = File(...)):

    title = file.filename.split(".key")[0]

    print(title)

    with open(f"./_recieved_pickles/{file.filename}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    with open(f"./_recieved_pickles/{file.filename}", "rb") as input_file:
        e = pickle.load(input_file)

    with open(f"./_secrets/{author}-{title}.txt", "r") as secret_file:
        encoding = secret_file.read()

    os.remove(f"./_recieved_pickles/{file.filename}")

    return {"file": Huffman_Decoding(encoding, e)}


@app.get("/secrets")
async def get_secrets():

    secret_files = glob.glob("./_secrets/*")

    list = []

    for file in secret_files:
        data = {}
        author = file.split("/")[2].split("-")[0]
        data["author"] = author
        data["title"] = file.split("/")[2].split("-")[1].split(".")[0]
        with open(file, "r") as secret_file:
            encoding = secret_file.read()
            data["text"] = encoding

        list.append(data)

    return list


@app.post("/login")
async def login(user: User):

    if GRAPH[user.name]["password"] == user.password:
        return {"message": "ok!"}

    else:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={"message": "wrong password!"})
