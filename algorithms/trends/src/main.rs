use std::sync::Arc;

use anyhow::Result;
use axum::{extract, routing::get, Router};
use dotenv::dotenv;
use handler::request_handler;

#[macro_use]
extern crate dotenv_codegen;

mod db;
mod entry;
mod handler;
mod models;

#[tokio::main]
async fn main() -> Result<()> {
    dotenv().ok();

    let db = db::connect().await?;
    let shared_db = Arc::new(db);

    let app = Router::new()
        .route("/trends", get(request_handler))
        .layer(extract::Extension(shared_db));

    let listener = tokio::net::TcpListener::bind(&format!("localhost:{}", dotenv!("PORT"))).await?;
    axum::serve(listener, app).await?;

    Ok(())
}
