export interface User {
  userId: string;
  name: string;
  bio?: string;
  location?: string;
  website?: string;
  banner?: string;
  tag: string;
  userImage: string;
  birthday: string;
  email: string;
  createdAt: string;
  pinnedTweetId?: string;
  highlightedTweetId?: string;
}

export interface Tweet {
  caption: string;
  createdAt: string;
  platform: "web" | "android" | "ios";
  media?: string;
  tweetId: string;
  userId: string;
  inReplyToTweetId: string;
}

export interface TweetEngagements {
  likes: number;
  replies: number;
  retweets: number;
  quoteTweets: number;
}

export type ApiResponseTweet<T extends keyof Tweet | never = never> = Omit<
  Tweet,
  T
> &
  Pick<User, "name" | "userImage" | "tag">;

export interface FetchParameters {
  page: number;
}
