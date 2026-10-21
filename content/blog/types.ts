export type Locale = "sr" | "en";

export type L<T> = Record<Locale, T>;

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | {
      type: "options";
      items: {
        name: string;
        rows: [string, string][];
        note: string;
        highlight?: boolean;
      }[];
    }
  | { type: "callout"; text: string };

export type Post = {
  slug: L<string>;
  title: L<string>;
  description: L<string>;
  answer: L<string>;
  category: "sajtovi" | "google-ads" | "seo" | "razvoj";
  date: string;
  minutes: number;
  body: L<Block[]>;
};
