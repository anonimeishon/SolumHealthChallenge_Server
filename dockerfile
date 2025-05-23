FROM postgres:16

# Optional: Copy custom SQL scripts into Docker image
# These will run on first container startup if placed in /docker-entrypoint-initdb.d/
# COPY ./init.sql /docker-entrypoint-initdb.d/

# Optional: Set environment variables (usually passed in docker-compose instead)
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=fastifydb


# # Build the custom image
# docker build -t my-postgres .

# # Run it
# docker run --name my-pg-container \
#   -p 5432:5432 \
#   -e POSTGRES_USER=postgres \
#   -e POSTGRES_PASSWORD=postgres \
#   -e POSTGRES_DB=fastifydb \
#   -d my-postgres