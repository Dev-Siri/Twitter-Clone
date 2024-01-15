use std::process::exit;

use anyhow::Result;
use openssl::ssl::{SslConnector, SslMethod};
use postgres_openssl::MakeTlsConnector;
use tokio_postgres::{Client, Config};

fn get_pg_params() -> Config {
    let username = dotenv!("PG_USERNAME");
    let password = dotenv!("PG_PASSWORD");
    let host = dotenv!("PG_HOST");
    let db_name = dotenv!("PG_DB_NAME");

    let mut config = Config::new();
    config
        .user(username)
        .password(password)
        .host(host)
        .dbname(db_name)
        .ssl_mode(tokio_postgres::config::SslMode::Require);

    config
}

pub async fn connect() -> Result<Client> {
    let db_with_params = get_pg_params();
    let builder = SslConnector::builder(SslMethod::tls())?;
    let connector = MakeTlsConnector::new(builder.build());
    let (client, connection) = db_with_params.connect(connector).await?;

    tokio::spawn(async move {
        if let Err(e) = connection.await {
            println!("Connection Error: {}", e);
            exit(1);
        }
    });

    Ok(client)
}
