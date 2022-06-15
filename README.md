
# RESTAPI MOVIE

rest api movie using nodeJs and expressjs


## Appendix

here I use nodeJs and mysql database, so hopefully you have installed node.js and phpmyadmin
## Run Locally

Clone the project

```bash
  git clone https://github.com/nafiswatsiq/API-Film-with-NodeJs.git
```

Go to the project directory

```bash
  cd API-Film-with-NodeJs
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_USERNAME` = your username database

`DB_PASSWORD` = your password

`DB_HOST` = localhost

`DB_NAME` = your database name

`DB_DIALECT` = mysql

## when it's finished, just migrate the database

Migrations table database

```bash
  npx sequelize db:migrate
```

Start the server

```bash
  npm run start
```


## API Reference

### **_Run in port 3001_**
```
  http://localhost:3001
```

## GET
#### Get all movie

```http
  GET /api/list-movie
  GET /api/list-movie?sort={sort}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `sort` | `string` | can using **asc** to get sort from first to last or **desc** to get sort from last to first |

#### Get movie

```http
  GET /api/list-movie/{slug}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `slug`      | `string` | **Required**. slug of item to fetch |

#### Get search movie

```http
  GET /api/search-movie/{keyword}
  GET /api/search-movie/{keyword}?sort={sort}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `keyword`      | `string` | **Required**. keyword of item to fetch |

#### Get list series by movie

```http
  GET /api/list-series/{id_movie}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_movie`      | `string` | **Required**. id_movie of item to fetch |

#### Get list series by episode

```http
  GET /api/episde-series/{id_series}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_series`      | `string` | **Required**. id_series of item to fetch |

## POST
#### Add movie

```http
  POST /api/add-movie
```
#### Usage/Examples

```json
  {
    "title": "Example title",
    "description": "Example description",
    "duration": "90",
    "thumbnail": "Example",
    "link_movie": "Example",
    "rating" : 4.5,
    "type": 0,
    "tags": [
        {
            "tags": "test"
        },
        {
            "tags": "test"
        }
    ]
  }
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. title of item to fetch |
| `description`      | `string` | **Required**. description of item to fetch |
| `duration`      | `integer` | **Required**. duration of item to fetch |
| `thumbnail`      | `string` | **Required**. thumbnail of item to fetch |
| `link_movie`      | `string` | **Required**. link_movie of item to fetch |
| `rating`      | `integer` | **Required**. rating of item to fetch |
| `type`      | `integer` | **Required**. type of item to fetch **0** for **Movie**, **1** for **series** |
| `tags`      | `string` | **Required**. tags of item to fetch |

#### Add series

```http
  POST /api/add-series/{id_movie}
```
#### Usage/Examples

```json
  {
    "episode": "episide 6 hati yg terkutuk",
    "link_series": "test"
  }
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_movie`      | `string` | **Required**. id_movie of item to fetch |
| `episode`      | `string` | **Required**. episode of item to fetch |
| `link_series`      | `string` | **Required**. link_series of item to fetch |

## PUT
#### Update movie

```http
  PUT /api/update-movie/{id_movie}
```
#### Usage/Examples

```json
  {
    "title": "update",
    "description": "test update",
    "duration": "100",
    "thumbnail": "test update thumbnail",
    "link_movie": "test update link",
    "rating" : 4,
    "type": 1,
    "tags": [
      {
        "tags": "update tags"
      }
    ]
}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. title of item to fetch |
| `description`      | `string` | **Required**. description of item to fetch |
| `duration`      | `integer` | **Required**. duration of item to fetch |
| `thumbnail`      | `string` | **Required**. thumbnail of item to fetch |
| `link_movie`      | `string` | **Required**. link_movie of item to fetch |
| `rating`      | `integer` | **Required**. rating of item to fetch |
| `type`      | `integer` | **Required**. type of item to fetch **0** for **Movie**, **1** for **series** |
| `tags`      | `string` | **Required**. tags of item to fetch |

#### Update viewers

```http
  PUT /api/update-viewers/{id_movie}
```
#### Usage/Examples

```json
  {
    "viewers": 1
  }
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_movie`      | `string` | **Required**. id_movie of item to fetch |
| `viewers`      | `integer` | **Required**. viewers of item to fetch |

#### Update series

```http
  PUT /api/update-series/{id_series}
```
#### Usage/Examples

```json
  {
    "episode": "Update episode",
    "link_series": "Update link"
  }
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_series`      | `string` | **Required**. id_series of item to fetch |
| `episode`      | `string` | **Required**. episode of item to fetch |
| `link_series`      | `string` | **Required**. link_series of item to fetch |

## DELETE
#### Delete movie

```http
  DELETE /api/delete-movie/{id_movie}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_movie`      | `string` | **Required**. id_movie of item to fetch |

#### Delete series

```http
  DELETE /api/delete-series/{id_series}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_series`      | `string` | **Required**. id_series of item to fetch |

