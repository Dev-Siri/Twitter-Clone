use crate::{entry::split_rows_offset::get_offset_to_split_rows, models::Trend};
use anyhow::Result;
use std::sync::Arc;
use tokio_postgres::Client;

use super::{
    filter_common_words::filter_common_words, generate::generate_trends,
    prioritize_terms::prioritize_terms,
};

pub async fn get_trends(db: Arc<Client>) -> Result<Vec<Trend>> {
    let mut terms: Vec<String> = vec![];

    let tweet_count_row = db.query_one("SELECT COUNT(*) FROM \"Tweets\"", &[]).await?;
    let tweet_count: i64 = tweet_count_row.get(0);

    let row_split_pos = get_offset_to_split_rows(tweet_count).await?;

    for tweet in db
        .query(
            "SELECT caption FROM \"Tweets\" LIMIT $1 OFFSET $2;",
            &[&row_split_pos.limit, &row_split_pos.offset],
        )
        .await?
    {
        let caption: String = tweet.get(0);
        let individual_words: Vec<String> =
            caption.split_whitespace().map(|s| s.to_string()).collect();

        terms.extend_from_slice(&individual_words);
    }

    let common_words = filter_common_words(&terms);
    let prioritized_terms = prioritize_terms(common_words, tweet_count);
    let trends = generate_trends(prioritized_terms);

    Ok(trends)
}
