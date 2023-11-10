# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build your React project
RUN npm run build

# Expose the port your app will run on (default for Vite is 3000)
EXPOSE 5173

# Define the command to run your application
CMD [ "npm", "run", "start" ]
