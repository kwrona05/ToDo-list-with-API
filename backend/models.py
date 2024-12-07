from pydantic import BaseModel
from typing import Optional


class ToDo(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    completed: bool = False
