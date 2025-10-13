# Use official Python runtime as a parent image
FROM python:3.11-slim

# Set working directory in the container
WORKDIR /app

# Install system dependencies needed for Python packages
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Set Python path to include src directory
ENV PYTHONPATH="${PYTHONPATH}:/app"

# Run the bot
CMD ["python", "main.py"]