# backend/Dockerfile
FROM node:22-slim

# Set working directory
WORKDIR /app

# Copy only package.json first to leverage caching
COPY package*.json ./

# Install dependencies (production only)
RUN npm install --production

# Copy the rest of the source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the backend
CMD ["npm", "run", "start"]
