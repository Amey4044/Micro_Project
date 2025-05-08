# Use a smaller, production-ready Node.js base image
FROM node:14-alpine

# Install curl using apk (Alpine's package manager)
RUN apk add --no-cache curl

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only the package files first to install dependencies (helps with caching)
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3004

# Start the application
CMD ["node", "index.js"]
