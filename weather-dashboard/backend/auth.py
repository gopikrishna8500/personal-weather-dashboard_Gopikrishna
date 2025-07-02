from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt

import models, schemas, utils
from database import SessionLocal

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Helper to get current user from token
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(status_code=401, detail="Invalid token")
    try:
        payload = jwt.decode(token, utils.SECRET_KEY, algorithms=["HS256"])
        email = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

# Registration route
@router.post("/register", response_model=schemas.Token)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = utils.hash_password(user.password)
    new_user = models.User(email=user.email, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = utils.create_access_token({"sub": new_user.email})
    return {"access_token": token, "token_type": "bearer"}

# Login route
@router.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not db_user or not utils.verify_password(form_data.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = utils.create_access_token({"sub": db_user.email})
    return {"access_token": token, "token_type": "bearer"}

# Update location
@router.put("/update-location")
def update_location(data: schemas.LocationUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    current_user.city = data.city
    current_user.country = data.country
    current_user.latitude = data.latitude
    current_user.longitude = data.longitude
    db.commit()
    return {"message": "Location updated successfully"}

# Get saved location
@router.get("/get-location")
def get_location(current_user: models.User = Depends(get_current_user)):
    return {
        "city": current_user.city,
        "country": current_user.country,
        "latitude": current_user.latitude,
        "longitude": current_user.longitude
    }
