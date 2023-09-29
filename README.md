# NodeApp

NodeApp that connects with MySql, and insert new person into a table.

The `docker-compose` contains three containers: `MySql`, `NodeJs` and `Nginx`.

The `NodeJS` container wait the `MySQL` container to be ready, and for that we are using `dockerize`.


## To execute

Run this following command: `docker-compose up --build`
