import {Dsl} from "../internal/dsl";
import {beforeEach, describe, test} from "../internal/playwright";

beforeEach(dsl => dsl.beforeEach());

describe('Search', () => {
  test('Search user', async (dsl: Dsl) => {
    await dsl.setAcceptanceSearchItems(['steve', 'george']);
    await dsl.search('e');
    await dsl.assertSearchItems(['steve', 'george']);
  });
});
