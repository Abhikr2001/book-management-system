from fastapi import APIRouter, HTTPException, Query
from models.book import Book
from database.connection import books_collection

router = APIRouter()

@router.post("/books")
def add_book(book: Book, username: str = Query(...)):
    books_collection.insert_one(book.dict() | {"username": username})
    return {"msg": "Book added"}

@router.get("/books/{username}")
def get_books(username: str):
    books = list(books_collection.find({"username": username}, {"_id": 0}))
    return books

@router.put("/books/{title}")
def edit_book(title: str, book: Book, username: str = Query(...)):
    result = books_collection.update_one(
        {"title": title, "username": username},
        {"$set": book.dict()}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Book not found")
    return {"msg": "Book updated"}

@router.delete("/books/{title}")
def delete_book(title: str, username: str = Query(...)):
    result = books_collection.delete_one({"title": title, "username": username})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Book not found")
    return {"msg": "Book deleted"}
