# cyse6225-ruchika

My web application for: [CYSE6225 Network Structures &amp; Cloud Computing](https://spring2024.csye6225.cloud/)

### Web Application

* Programming Language: `TypeScript` 
* Relational Database: `PostgreSQL`
* Backend Frameworks: `Node.js` , `Express.js`
* ORM Framework: `Sequelize`

## How to build & run the application

1. Generate the npm packages

```
npm install
```

2. Add `.env` file with the below fields
   
```
PORT=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_HOST=
DATABASE_POOL_MAX=
DATABASE_POOL_MIN=
DATABASE_POOL_ACQUIRE=
DATABASE_POOL_IDLE=
DROP_DATABASE=
```

3. Run the application

```
npm run start
```

4. Debug the application
```
npm run dev
```

5. Run tests for the application
```
npm run 
```


## Commands Used

### Linux

```
cd
```

```
mkdir
```

```
rmdir
```

```
ls
```

```
curl
```

```
ssh
```

```
scp
```

```
unzip
```

### Git

```
git clone
```

```
git branch
```

```
git checkout -b
```

```
git add
```

```
git commit -m
```

```
git push -u origin
```

```
git merge main
```

```
git pull origin main
```


### Postgres
```
CREATE DATABASE app_db;
```

```
CREATE USER myuser WITH PASSWORD 'password';
```

```
GRANT ALL PRIVILEGES ON DATABASE app_db TO myuser;
```

```
GRANT USAGE, CREATE ON SCHEMA public TO myuser;
```

```
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO myuser;
``` 

```
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO myuser;
```

```
ALTER USER postgres WITH PASSWORD 'password';
```

```
ALTER USER postgres WITH PASSWORD 'password';
```

## References

1. [Creating a user, db & providing access in psql](https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e) 
2. [Sequelize](https://sequelize.org/docs/v6/getting-started/)
3. [Log4js](https://www.npmjs.com/package/log4js)
4. [Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
5. [HEAD & OPTIONS](https://stackoverflow.com/questions/6660019/restful-api-methods-head-options#:~:text=OPTIONS%20tells%20you%20things%20such,status%20code%20would%20be%20returned.)
6. [Content-Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type)
7. [Sequelize-Model](https://sequelize.org/docs/v6/core-concepts/model-basics/)
8. [Model-Sync](https://sequelize.org/docs/v7/models/model-synchronization/)
9. [HTTP-StatusCode-MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
10. [Using-workflows](https://docs.github.com/en/actions/using-workflows)
11. [Node-js-workflow-template](https://github.com/actions/starter-workflows/blob/main/ci/node.js.yml)
12. [Install Postgres on CentOS](https://www.linode.com/docs/guides/centos-install-and-use-postgresql/)
13. [Integration Testing](https://www.npmjs.com/package/supertest)