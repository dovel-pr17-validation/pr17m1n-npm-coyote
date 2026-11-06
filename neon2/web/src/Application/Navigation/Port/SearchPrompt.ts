export interface SearchPrompt {
  prompt(searchPhrase: string): Promise<SearchItem[]>;
}

export interface SearchItem {
  title: string;
  type: SearchItemType;
  contentHref: string;
}

export type SearchItemType = 'user'|'jobOffer'|'topic'|'article';
