use std::cell::Cell;

#[derive(Clone)]
pub enum WordType {
    Normal,
    Hashtag,
}

pub struct OccurredWord<'a> {
    pub word: &'a String,
    pub occurrence: Cell<i64>,
    pub word_type: WordType,
    // priority depends on a number, from 1 to <max priority>
    // there is no necessarily high, low, or medium priority for defining in an enum, they are just
    // numbered, which means they can increase as much as they can. Which the code will later use to filter
    // trends to return a maximum of 10 trends, or none.
    pub priority: Cell<i64>,
}

pub fn filter_common_words(terms: &Vec<String>) -> Vec<OccurredWord> {
    let mut occurred_words: Vec<OccurredWord> = vec![];

    for term in terms {
        if let Some(occurred_word) = occurred_words
            .iter_mut()
            .find(|ow| ow.word.to_lowercase() == *term)
        {
            occurred_word
                .occurrence
                .set(occurred_word.occurrence.get() + 1);
        } else {
            occurred_words.push(OccurredWord {
                word: term,
                occurrence: Cell::new(1),
                word_type: if term.starts_with("#") {
                    WordType::Hashtag
                } else {
                    WordType::Normal
                },
                // Hashtags start at a higher priority by default
                priority: Cell::new(if term.starts_with("#") { 1 } else { 2 }),
            });
        }
    }

    occurred_words
}
