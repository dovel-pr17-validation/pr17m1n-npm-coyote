import {Dsl} from "../internal/dsl";
import {beforeEach, describe, test} from "../internal/playwright";

beforeEach(dsl => dsl.beforeEach());

describe('Pricing plans have a price.', () => {
  test('Premium plan costs 159 PLN.', async (dsl: Dsl) => {
    await dsl.anticipatePayment({plan: 'premium'});
    await dsl.assertPricingPlanCost({
      expectedPlan: 'premium',
      expectedBase: '159.00 zł',
      expectedVat: '36.57 zł',
      expectedTotal: '195.57 zł',
    });
  });
  test('Strategic bundle costs 357 PLN.', async (dsl: Dsl) => {
    await dsl.anticipatePayment({plan: 'strategic'});
    await dsl.assertPricingPlanCost({
      expectedPlan: 'strategic',
      expectedBase: '357.00 zł',
      expectedVat: '82.11 zł',
      expectedTotal: '439.11 zł',
    });
  });
  test('Growth bundle costs 495 PLN.', async (dsl: Dsl) => {
    await dsl.anticipatePayment({plan: 'growth'});
    await dsl.assertPricingPlanCost({
      expectedPlan: 'growth',
      expectedBase: '495.00 zł',
      expectedVat: '113.85 zł',
      expectedTotal: '608.85 zł',
    });
  });
  test('Scale bundle costs 1580 PLN.', async (dsl: Dsl) => {
    await dsl.anticipatePayment({plan: 'scale'});
    await dsl.assertPricingPlanCost({
      expectedPlan: 'scale',
      expectedBase: '1580.00 zł',
      expectedVat: '363.40 zł',
      expectedTotal: '1943.40 zł',
    });
  });
});
