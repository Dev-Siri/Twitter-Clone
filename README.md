# Twitter Clone

Yes. Yet another Twitter clone.

I tried to implement as many features as possible while trying to retaining my sanity. This is by far the biggest App Router app I've ever written in Next.js

## Getting Started

- Clone the repo

```sh
$ git clone https://github.com/Dev-Siri/Twitter-Clone.git
```

- Install the dependencies

```sh
$ pnpm i

# with buntime
$ bun i
```

- Create a database on [Neon](https://neon.tech)
- Create a [Firebase](https://firebase.google.com) Project with the "Storage" service enabled
- Finally, the last secret you'll need is a `JWT_SECRET` key. To generate it, use `openssl`:

```sh
$ openssl rand -base64 32
```

- Then copy the all the creds into a `.env.local` file. Make sure you follow the format in the `.env.example` file

```sh
DATABASE_URL=""
JWT_SECRET=""
PGHOST=""
PGDATABASE=""
PGUSER=""
PGPASSWORD=""
ENDPOINT_ID=""
FIREBASE_API_KEY=""
FIREBASE_AUTH_DOMAIN=""
FIREBASE_PROJECT_ID=""
FIREBASE_STORAGE_BUCKET=""
FIREBASE_MESSAGING_SENDER_ID=""
FIREBASE_APP_ID=""
```

> Note: you need to split your Database URL you get from Neon into individual parts so that drizzle can carry out migrations
>
> If the URL is `postgres://<username>:<password>@<endpoint-id-and-host>/<db-name>?sslmode=require`
> Then split it into the individual parts as:
>
> ```sh
> DATABASE_URL="postgres://<username>:<password>@<endpoint-id-and-host>/<db-name>?sslmode=require"
> PGHOST="<endpoint-id-and-host>"
> PGDATABASE="<db-name>"
> PGUSER="<username>"
> PGPASSWORD="<password>"
> ENDPOINT_ID="<endpoint-id>"
> ```
>
> Additional note: Make sure you have `?sslmode=require` at the end of the url, it is required by Drizzle.

- Then run the drizzle commands to gen and push to the db.

```sh
$ pnpm drizzle:generate && pnpm drizzle:push

# with buntime
$ bun drizzle:generate && pnpm drizzle:push
```

- Finally start the development server

```sh
$ pnpm dev

# with buntime
$ bun dev
```

Once again, you have achieved bird.

## Credits

This Twitter Clone is not affiliated with or endorsed by Twitter Inc. The terms "Twitter", "Tweets", "Retweets" & The Twitter Bird Logo are trademarks of Twitter Inc. Please refer to [Twitter's trademark policy](https://developer.twitter.com/en/docs/labs/brand) to ensure compliance with their guidelines.

## License

This project is MIT Licensed, see [LICENSE](LICENSE)
