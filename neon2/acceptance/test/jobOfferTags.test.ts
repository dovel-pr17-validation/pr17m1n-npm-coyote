import {Dsl} from "../internal/dsl";
import {beforeEach, describe, test} from "../internal/playwright";

beforeEach(dsl => dsl.beforeEach());

describe('Job offer suggested tags.', () => {
  test('In job offer form, providing a technology, suggests available tags.', async (dsl: Dsl) => {
    await dsl.setAcceptanceTags(['acceptance-java']);
    await dsl.jobOfferFormProvideTechnology('acceptance-');
    await dsl.assertSuggestedTechnology({expectedTag: 'acceptance-java'});
  });
});
