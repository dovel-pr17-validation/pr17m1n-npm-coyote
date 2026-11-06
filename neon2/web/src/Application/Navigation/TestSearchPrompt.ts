import {SearchItem, SearchPrompt} from "./Port/SearchPrompt";

export class TestSearchPrompt implements SearchPrompt {
  constructor(private acceptanceSearchItems: string[]) {}

  async prompt(searchPhrase: string): Promise<SearchItem[]> {
    return this.acceptanceSearchItems
      .map(searchItem => {
        return {
          title: searchItem,
          type: 'user',
          contentHref: '',
        };
      });
  }
}
