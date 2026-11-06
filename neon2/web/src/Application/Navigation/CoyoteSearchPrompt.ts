import {requestGet} from "../../Infrastructure/Backend/http";
import {SearchItem, SearchPrompt} from "./Port/SearchPrompt";

export class CoyoteSearchPrompt implements SearchPrompt {
  constructor() {}

  prompt(searchPhrase: string): Promise<SearchItem[]> {
    if (searchPhrase === '') {
      return Promise.resolve([]);
    }
    return requestGet('/completion', {q: searchPhrase})
      .then(response => response.json())
      .then((response: any[]) => response.map(searchItem => this.searchItem(searchItem)));
  }

  private searchItem(searchItem: any): SearchItem {
    if (searchItem.model === 'Job') {
      return {title: searchItem.title, type: 'jobOffer', contentHref: searchItem.url};
    }
    if (searchItem.model === 'User') {
      return {title: searchItem.name, type: 'user', contentHref: searchItem.url};
    }
    if (searchItem.model === 'Topic') {
      return {title: searchItem.title, type: 'topic', contentHref: searchItem.url};
    }
    if (searchItem.model === 'Wiki') {
      return {title: searchItem.title, type: 'article', contentHref: searchItem.url};
    }
    throw new Error('Failed to parse search item.');
  }
}
