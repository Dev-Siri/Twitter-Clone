use std::{result::Result, sync::Arc};

use axum::{extract, http::StatusCode, Json};
use tokio_postgres::Client;

use crate::{
    entry::trends::get_trends,
    models::{ErrorResponse, SuccessResponse, Trend},
};

pub async fn request_handler<'a>(
    extract::Extension(db): extract::Extension<Arc<Client>>,
) -> Result<(StatusCode, Json<SuccessResponse<Vec<Trend>>>), (StatusCode, Json<ErrorResponse<'a>>)>
{
    match get_trends(db).await {
        Ok(trends) => Ok((StatusCode::OK, SuccessResponse::new(200, trends).into())),
        Err(_) => Err((
            StatusCode::INTERNAL_SERVER_ERROR,
            ErrorResponse::new(500, "Failed to get trends").into(),
        )),
    }
}
