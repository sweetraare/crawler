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

## Endpoints

`GET /entries/all # All news`
`GET /entries?filter=long # News with 5+ words in title`
`GET /entries?filter=short # News with -% words in title`
`GET /user-logs # Logs`
