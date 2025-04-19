use anyhow::Result;
use rand::Rng;

pub struct RowSplitPosition {
    pub offset: i64,
    pub limit: i64,
}

pub async fn get_offset_to_split_rows(tweet_count: i64) -> Result<RowSplitPosition> {
    let mut rng = rand::thread_rng();
    let offset = rng.gen_range(0..tweet_count);
    let limit = rng.gen_range(1..=100);

    Ok(RowSplitPosition { limit, offset })
}
