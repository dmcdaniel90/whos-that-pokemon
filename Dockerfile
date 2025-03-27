# Node base image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy the app package and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install \
  && npm install -g serve

# Copy local directories to the current local directory
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Run the app
CMD ["serve", "-s", "dist"]