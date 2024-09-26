# Base image
FROM node:14.15.4-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm i

# Copy source code
COPY . .

# Build app
RUN npm run build

# Nginx image
FROM nginx:1.21.3-alpine

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built app to Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy Nginx config file
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Expose port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]