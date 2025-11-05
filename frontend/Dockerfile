# frontend/Dockerfile
FROM node:22-slim

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend source code
COPY . .

# Build the frontend
RUN npm run build

# Expose frontend port
EXPOSE 3000

# Serve the frontend in preview mode (lighter than dev server)
CMD ["npm", "run", "preview"]
