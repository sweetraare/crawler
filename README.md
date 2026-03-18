# Crawler for Hacker News

Rest API for crawling Hacker News, filtering the first 30 results and sort them based on comments or points

## Created by
Alex J. Ulloa A.

## Stack

- NestJS -> Framework and Dependency Injection
- axios -> Fetch html page
- cheerios -> Web scrapping
- better-sqlite3 -> SQLite DB adapter
- Jest -> Testing

## Quickstart

```bash
yarn install
yarn run start
```

## Endpoints

`GET /entries/all # All news`

`GET /entries?filter=long # News with 5+ words in title`

`GET /entries?filter=short # News with -% words in title`

`GET /user-logs # Logs`

## Demo

This project is Deployed to [Render](https://render.com/) you could review how it is working in the [following link](https://crawler-i2z1.onrender.com)

### Demo Links

- [Get All News](https://crawler-i2z1.onrender.com/entries/all)
- [Get short News](https://crawler-i2z1.onrender.com/entries?filter=short)
- [Get long News](https://crawler-i2z1.onrender.com/entries?filter=short)
- [Get user logs](https://crawler-i2z1.onrender.com/user-logs)

> User logs may be empty as File System is ephymeral in Render. It works well for a demo project, but it would be great to update to another DB such as PostgreSQL in the future
