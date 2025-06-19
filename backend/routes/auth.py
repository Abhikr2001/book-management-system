from fastapi import APIRouter, HTTPException
from models.user import User
from database.connection import users_collection
from utils.auth import hash_password, verify_password, create_token

router = APIRouter()

@router.post("/register")
def register(user: User):
    if users_collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already exists")
    users_collection.insert_one({
        "username": user.username,
        "password": hash_password(user.password)
    })
    return {"msg": "User registered successfully"}

@router.post("/login")
def login(user: User):
    db_user = users_collection.find_one({"username": user.username})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token({"username": user.username})
    return {"token": token}
