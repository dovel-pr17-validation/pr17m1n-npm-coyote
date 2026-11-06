import {Dsl} from "../internal/dsl";
import {beforeEach, describe, test} from "../internal/playwright";

beforeEach(dsl => dsl.beforeEach());

describe('A job offer can be found in search until it expires.', () => {
  test('Given a user published a job offer, the job offer can be found in search.', async (dsl: Dsl) => {
    await dsl.publishJobOffer({title: 'Green'});
    await dsl.assertJobOfferIsListed({jobOfferTitle: 'Green'});
  });
  test('Given a job offer, when the author edits the offer, the updated job offer can be found in search.', async (dsl: Dsl) => {
    await dsl.publishJobOffer({title: 'Before'});
    await dsl.updateJobOffer({title: 'Before', updatedTitle: 'After'});
    await dsl.assertJobOfferIsListed({jobOfferTitle: 'After'});
  });
  test('Given a job offer, it can be found by partial search phrase.', async (dsl: Dsl) => {
    await dsl.publishJobOffer({title: 'Big Blue Cheeseburger'});
    await dsl.publishJobOffer({title: 'Small Green Cheeseburger'});
    await dsl.searchJobOffers({searchPhrase: 'Blue'});
    await dsl.assertJobOfferIsListed({jobOfferTitle: 'Big Blue Cheeseburger'});
    await dsl.assertJobOfferIsNotListed({jobOfferTitle: 'Small Green Cheeseburger'});
  });
});

describe('Job offer in a non-free plan requires a payment.', () => {
  test('Given a paid job offer, if the payment is complete, the job offer can be found in search.', async (dsl: Dsl) => {
    await dsl.publishJobOffer({title: 'Job offer', pricingType: 'paid', payment: 'completed'});
    await dsl.assertJobOfferIsListed({jobOfferTitle: 'Job offer'});
  });
  test('Given a paid job offer, if the payment is not made, the job offer can not be found in search.', async (dsl: Dsl) => {
    await dsl.publishJobOffer({title: 'New offer', pricingType: 'paid', payment: 'ignored'});
    await dsl.assertJobOfferIsNotListed({jobOfferTitle: 'New offer'});
  });
});

describe('The publishing time depends on the pricing of the job offer.', () => {
  test('A free job offer expires after 30 days.', async (dsl: Dsl) => {
    await dsl.publishJobOffer({title: 'Free offer', pricingType: 'free'});
    await dsl.assertJobOfferExpiresInDays({jobOfferTitle: 'Free offer', expectedExpiry: 30});
  });
  test('A paid job offer expires after 30 days.', async (dsl: Dsl) => {
    await dsl.publishJobOffer({title: 'Paid offer', pricingType: 'paid'});
    await dsl.assertJobOfferExpiresInDays({jobOfferTitle: 'Paid offer', expectedExpiry: 30});
  });
});

describe('Purchased plan bundle entitles to multiple job offers.', () => {
  test('Given no purchased job offers, there is no plan bundle.', async (dsl: Dsl) => {
    await dsl.assertPlanBundleNone();
  });
  test('Job offer is created alongside a strategic plan bundle.', async (dsl: Dsl) => {
    await dsl.publishJobOffer({title: 'Strategic Offer', plan: 'strategic'});
    await dsl.assertJobOfferIsListed({jobOfferTitle: 'Strategic Offer'});
  });
  test('Given a strategic bundle has been purchased, there is 2 remaining job offers.', async (dsl: Dsl) => {
    await dsl.publishJobOffer({title: 'Strategic Offer', plan: 'strategic'});
    await dsl.assertPlanBundleRemaining({
      expectedRemainingJobOffers: 2,
      expectedBundleName: 'strategic',
    });
  });
  test('Given a growth bundle has been purchased, there is 4 remaining job offers.', async (dsl: Dsl) => {
    await dsl.publishJobOffer({title: 'Growth Offer', plan: 'growth'});
    await dsl.assertPlanBundleRemaining({
      expectedRemainingJobOffers: 4,
      expectedBundleName: 'growth',
    });
  });
  test('Given a scale bundle has been purchased, there is 19 remaining job offers.', async (dsl: Dsl) => {
    await dsl.publishJobOffer({title: 'Scale Offer', plan: 'scale'});
    await dsl.assertPlanBundleRemaining({
      expectedRemainingJobOffers: 19,
      expectedBundleName: 'scale',
    });
  });
  test('Given a premium plan has been purchased, there is no remaining job offers.', async (dsl: Dsl) => {
    await dsl.publishJobOffer({title: 'Strategic Offer', plan: 'premium'});
    await dsl.assertPlanBundleNone();
  });
  test('Given a free plan has been purchased, there is no remaining job offers.', async (dsl: Dsl) => {
    await dsl.publishJobOffer({title: 'Strategic Offer', plan: 'free'});
    await dsl.assertPlanBundleNone();
  });
  test('Given an unfinished payment, there is no remaining job offers.', async (dsl: Dsl) => {
    await dsl.publishJobOffer({title: 'Strategic Offer', plan: 'growth', payment: 'ignored'});
    await dsl.assertPlanBundleNone();
  });
  test('Given an owned bundle, when a job offer is added without payment, the job offer is published.', async (dsl: Dsl) => {
    await dsl.purchasePlanBundle({plan: 'strategic', remaining: 2});
    await dsl.publishJobOffer({title: 'A free job offer', pricingType: 'paid', payment: 'redeem-bundle'});
    await dsl.assertJobOfferIsListed({jobOfferTitle: 'A free job offer'});
  });
  test('Given a job offer was published using a bundle, the remaining job offers is decreased.', async (dsl: Dsl) => {
    await dsl.purchasePlanBundle({plan: 'strategic', remaining: 2});
    await dsl.publishJobOffer({title: 'A free job offer', pricingType: 'paid', payment: 'redeem-bundle'});
    await dsl.assertPlanBundleRemaining({
      expectedRemainingJobOffers: 1,
      expectedBundleName: 'strategic',
    });
  });
});

describe('A failed payment can be retried.', () => {
  test('Given a job offer with a failed payment, when payment is retried, the job offer is published.', async (dsl: Dsl) => {
    await dsl.publishJobOffer({title: 'Job offer', payment: 'failed'});
    await dsl.finishPayment();
    await dsl.assertJobOfferIsListed({jobOfferTitle: 'Job offer'});
  });
});

describe('Job offer validation.', () => {
  test('Job offer title is required.', async (dsl: Dsl) => {
    await dsl.tryPublishJobOffer({mode: 'empty-title'});
    await dsl.assertErrorMessage({expectedErrorMessage: 'provide-offer-title'});
  });
  test('Job offer company name is required.', async (dsl: Dsl) => {
    await dsl.tryPublishJobOffer({mode: 'empty-company-name'});
    await dsl.assertErrorMessage({expectedErrorMessage: 'provide-company-name'});
  });
});
