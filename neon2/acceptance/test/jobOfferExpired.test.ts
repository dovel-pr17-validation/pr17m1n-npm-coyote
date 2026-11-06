import {Dsl} from "../internal/dsl";
import {beforeEach, describe, test} from "../internal/playwright";

beforeEach(dsl => dsl.beforeEach());

describe('An expired job offer is not listed in search, but can still be accessed.', () => {
  test('An expired job offer is not listed in search.', async (dsl: Dsl) => {
    await dsl.publishJobOffer({title: 'Expired', expired: true});
    await dsl.assertJobOfferIsNotListed({jobOfferTitle: 'Expired'});
  });
  test('An expired job offer is listed in mine.', async (dsl: Dsl) => {
    await dsl.publishJobOffer({title: 'Expired', expired: true});
    await dsl.assertJobOfferMineListed({jobOfferTitle: 'Expired'});
  });
  test('An expired job offer can be accessed via a direct url.', async (dsl: Dsl) => {
    await dsl.publishJobOffer({title: 'Expired', expired: true});
    await dsl.assertJobOfferAccessibleFromSearchEngine({jobOfferTitle: 'Expired'});
  });
});
