use rand::Rng;

use super::filter_common_words::OccurredWord;

// These words are very common, and not worth to be on trending
// Eg, "of", "is", "are", so on..
const COMMON_TERMS: [&str; 10] = [
    "of", "is", "are", "that", "if", "when", "no", "yes", "that", "why",
];

pub fn prioritize_terms<'a>(
    common_words: Vec<OccurredWord<'a>>,
    tweet_count: i64,
) -> Vec<OccurredWord<'a>> {
    let tweet_mid_count = (tweet_count as f64 / 2.0).round() as i64;
    let mut prioritization_factor = tweet_mid_count - 1;
    let common_terms_to_ignore = COMMON_TERMS.to_vec();

    for common_word in &common_words {
        if common_word.occurrence.get() > prioritization_factor {
            common_word.priority.set(common_word.priority.get() + 1);
            prioritization_factor += 1;
        } else if common_terms_to_ignore.contains(&common_word.word.as_str())
            || common_word.word.len() < 1
        {
            prioritization_factor += 1;
        } else {
            prioritization_factor -= 1;
        }

        if prioritization_factor < 2 || prioritization_factor == tweet_mid_count + 1 {
            prioritization_factor = tweet_mid_count;
        }
    }

    let mut filtered_prioritized_words: Vec<OccurredWord<'a>> = vec![];

    for (i, common_word) in common_words.iter().enumerate() {
        // check if trend count is over 10
        if i + 1 > 9 {
            break;
        }

        let range = (tweet_mid_count - 1)..(tweet_mid_count + 1);

        if common_word.priority.get() < (tweet_mid_count - rand::thread_rng().gen_range(range)) {
            continue;
        }

        filtered_prioritized_words.push(OccurredWord {
            occurrence: common_word.occurrence.clone(),
            priority: common_word.priority.clone(),
            word: common_word.word,
            word_type: common_word.word_type.clone(),
        });
    }

    filtered_prioritized_words
}
