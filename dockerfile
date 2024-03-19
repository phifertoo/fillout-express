# Use an official Node.js runtime as a base image, with a version matching your project's requirements
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) into the working directory
COPY package*.json ./

# Install dependencies, including 'devDependencies' for TypeScript compilation
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app - use 'node' to run the compiled JavaScript
CMD ["node", "dist/app.js"]
