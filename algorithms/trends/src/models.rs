use serde::Serialize;

#[derive(Serialize)]
pub struct SuccessResponse<T> {
    pub success: bool,
    pub status: i32,
    pub data: T,
}

#[derive(Serialize)]
pub struct ErrorResponse<'a> {
    pub success: bool,
    pub status: i32,
    pub message: &'a str,
}

#[derive(Serialize)]
pub struct Trend {
    pub term: String,
    pub tweets: i64,
}

impl Trend {
    pub fn new(term: String, tweets: i64) -> Self {
        Trend { term, tweets }
    }
}

impl<T> SuccessResponse<T> {
    pub fn new(status: i32, data: T) -> Self {
        SuccessResponse {
            success: true,
            status,
            data,
        }
    }
}

impl<'a> ErrorResponse<'a> {
    pub fn new(status: i32, message: &'a str) -> Self {
        ErrorResponse {
            success: false,
            status,
            message,
        }
    }
}
