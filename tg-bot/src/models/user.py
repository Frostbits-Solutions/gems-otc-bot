"""
User data models for the bot.
"""
from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class User:
    """User model for storing user information."""
    user_id: int
    username: Optional[str]
    first_name: str
    last_name: Optional[str]
    is_admin: bool = False
    created_at: datetime = datetime.now()
    last_activity: datetime = datetime.now()
    
    @property
    def full_name(self) -> str:
        """Get user's full name."""
        if self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.first_name
    
    @property
    def display_name(self) -> str:
        """Get user's display name (username or full name)."""
        return self.username or self.full_name


@dataclass
class Message:
    """Message model for storing message information."""
    message_id: int
    user_id: int
    text: Optional[str]
    message_type: str  # text, photo, document, etc.
    timestamp: datetime = datetime.now()
    
    def __str__(self) -> str:
        return f"Message {self.message_id} from {self.user_id}: {self.text[:50]}..."