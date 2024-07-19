# Use a base image with Python and Node.js
FROM python:3.11-slim

# Install Node.js
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Set the working directory
WORKDIR /ta-backend

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Copy requirements.txt
COPY requirements.txt ./

# Set npm fetch timeout and retry count
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000

# Install Node.js dependencies
RUN npm install

# Create and activate a virtual environment
RUN python -m venv /venv

RUN /venv/bin/pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .


# Expose the port the app runs on
EXPOSE 8000

# Start the application (adjust the command if necessary)
CMD ["npm", "run", "dev", "--", "--host"]