# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./



# Copy the rest of the project (optional in dev; usually mounted via volumes)
COPY . .

# Expose Next.js default dev port
EXPOSE 3000

# Start development server
CMD ["npm","run","dev"]

