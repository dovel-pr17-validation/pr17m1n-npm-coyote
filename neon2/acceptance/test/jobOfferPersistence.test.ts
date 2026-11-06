import {Dsl} from "../internal/dsl";
import {beforeEach, describe, test} from "../internal/playwright";

beforeEach(dsl => dsl.beforeEach());

describe('Job offers are persisted after browser reset.', () => {
  test('Given a published a job offer, when a browser is reset, the job offer can be found in search.', async (dsl: Dsl) => {
    await dsl.publishJobOffer({title: 'Green'});
    await dsl.newSession();
    await dsl.assertJobOfferIsListed({jobOfferTitle: 'Green'});
  });
  test('Given an edited a job offer, when a browser is reset, the job offer has the updated title.', async (dsl: Dsl) => {
    await dsl.publishJobOffer({title: 'Previous'});
    await dsl.updateJobOffer({title: 'Previous', updatedTitle: 'Previous updated'});
    await dsl.newSession();
    await dsl.assertJobOfferIsListed({jobOfferTitle: 'Previous updated'});
  });

  describe('Job offer in a non-free plan requires a payment.', () => {
    test('Given a paid job offer, if the payment is complete, the job offer can be found in search.', async (dsl: Dsl) => {
      await dsl.publishJobOffer({title: 'Job offer', pricingType: 'paid', payment: 'completed'});
      await dsl.newSession();
      await dsl.assertJobOfferIsListed({jobOfferTitle: 'Job offer'});
    });
    test('Given a paid job offer, if the payment is not made, the job offer can not be found in search.', async (dsl: Dsl) => {
      await dsl.publishJobOffer({title: 'New offer', pricingType: 'paid', payment: 'ignored'});
      await dsl.newSession();
      await dsl.assertJobOfferIsNotListed({jobOfferTitle: 'New offer'});
    });
  });

  describe('Purchased plan bundle entitles to multiple job offers.', () => {
    test('Given a strategic bundle has been purchased, there is 2 remaining job offers.', async (dsl: Dsl) => {
      await dsl.publishJobOffer({title: 'Strategic Offer', plan: 'strategic'});
      await dsl.newSession();
      await dsl.assertPlanBundleRemaining({
        expectedRemainingJobOffers: 2,
        expectedBundleName: 'strategic',
      });
    });
    test('Given a premium plan has been purchased, there is no remaining job offers.', async (dsl: Dsl) => {
      await dsl.publishJobOffer({title: 'Premium Offer', plan: 'premium'});
      await dsl.newSession();
      await dsl.assertPlanBundleNone();
    });
    test('Given a growth bundle has been purchased, there is 4 remaining job offers.', async (dsl: Dsl) => {
      await dsl.publishJobOffer({title: 'Growth Offer', plan: 'growth'});
      await dsl.newSession();
      await dsl.assertPlanBundleRemaining({
        expectedRemainingJobOffers: 4,
        expectedBundleName: 'growth',
      });
    });
    test('Given a scale bundle has been purchased, there is 19 remaining job offers.', async (dsl: Dsl) => {
      await dsl.publishJobOffer({title: 'Scale Offer', plan: 'scale'});
      await dsl.newSession();
      await dsl.assertPlanBundleRemaining({
        expectedRemainingJobOffers: 19,
        expectedBundleName: 'scale',
      });
    });

    test('Given an owned bundle, when a job offer is added without payment, the job offer is published.', async (dsl: Dsl) => {
      await dsl.purchasePlanBundle({plan: 'strategic', remaining: 2});
      await dsl.publishJobOffer({title: 'A bundle job offer', pricingType: 'paid', payment: 'redeem-bundle'});
      await dsl.newSession();
      await dsl.assertJobOfferIsListed({jobOfferTitle: 'A bundle job offer'});
    });

    test('Given a job offer was published using a bundle, the remaining job offers is decreased.', async (dsl: Dsl) => {
      await dsl.purchasePlanBundle({plan: 'strategic', remaining: 2});
      await dsl.publishJobOffer({title: 'A bundle job offer', pricingType: 'paid', payment: 'redeem-bundle'});
      await dsl.newSession();
      await dsl.assertPlanBundleRemaining({
        expectedRemainingJobOffers: 1,
        expectedBundleName: 'strategic',
      });
    });
  });

  describe('Job offer contains various job offer fields.', () => {
    test('Job offer description can be updated.', async (dsl: Dsl) => {
      await dsl.publishJobOffer({title: 'Updated', description: 'Before'});
      await dsl.updateJobOffer({title: 'Updated', updatedDescription: 'After'});
      await dsl.newSession();
      await dsl.assertJobOfferField({jobOfferTitle: 'Updated', expectedDescription: 'After'});
    });
  });

  describe('A failed payment can be retried.', () => {
    test('Given a job offer with a failed payment, when payment is retried, the job offer is published.', async (dsl: Dsl) => {
      await dsl.publishJobOffer({title: 'Job offer', payment: 'ignored'});
      await dsl.newSession();
      await dsl.continueAndFinishPayment({jobOfferTitle: 'Job offer'});
      await dsl.assertJobOfferIsListed({jobOfferTitle: 'Job offer'});
    });
  });
});
