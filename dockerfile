FROM postgres:latest

# Set environment variables
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=postmanager

# Copy the SQL script to initialize the database
COPY db/pmdump.sql /docker-entrypoint-initdb.d/
