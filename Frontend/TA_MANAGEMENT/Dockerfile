# Use the official Node.js image as the base image
FROM node:21.7.1-alpine

# Set the working directory in the container
WORKDIR /ta-frontend

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Set npm fetch timeout and retry count
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on (adjust according to your dev server configuration, typically 3000)
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--","--host"]