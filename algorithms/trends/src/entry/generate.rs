use crate::models::Trend;

use super::filter_common_words::OccurredWord;

pub fn generate_trends(prioritized_terms: Vec<OccurredWord<'_>>) -> Vec<Trend> {
    let mut trends: Vec<Trend> = vec![];

    for prioritized_term in prioritized_terms {
        trends.push(Trend::new(
            prioritized_term.word.clone(),
            prioritized_term.occurrence.get(),
        ));
    }

    trends
}
