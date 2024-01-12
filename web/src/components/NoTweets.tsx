interface Props {
  title?: string;
  subtitle?: string;
  tag: string;
}

export default function NoTweets({ title, subtitle, tag }: Props) {
  return (
    <div className="p-10">
      <h1 className="font-bold text-center text-4xl">
        {title ?? `@${tag} hasn't Tweeted`}
      </h1>
      <p className="ml-20 mt-4 text-gray-500">
        {subtitle ?? "When they do, their Tweets will show up here."}
      </p>
    </div>
  );
}
