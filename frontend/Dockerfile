# Pull base Node image from Docker Hub
FROM node:23

# Set container working directory
WORKDIR /f-light-frontend

# Port to be exposed !!REMEMBER THAT THIS COMMAND DOESNT PUBLISH THE PORT, IT IS MERELY DOCUMENTATION!!
# !!REMEMBER TO ADD THE PORT WHEN TAGGING THE IMAGE
EXPOSE 8000:8000

# Copy everything
COPY . .

# Install dependencies
RUN npm install

RUN npm run build

ENTRYPOINT ["npm", "run", "preview"]
