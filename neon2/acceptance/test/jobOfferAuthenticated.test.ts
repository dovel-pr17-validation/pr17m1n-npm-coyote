import {Dsl} from "../internal/dsl";
import {beforeEach, describe, test} from "../internal/playwright";

beforeEach(dsl => dsl.beforeEach());

describe('Challenge user without permission or in an improper state.', () => {
  test('A logged-out user selecting a plan is challenged to login.', async (dsl: Dsl) => {
    await dsl.trySelectPricingPlanAsLoggedOut('free');
    await dsl.assertChallengedToLogin();
  });
  test('A logged-out user opening the form is redirected to the pricing page.', async (dsl: Dsl) => {
    await dsl.tryOpenJobOfferFormAsLoggedOut();
    await dsl.assertChallengedToSelectPricingPlan();
  });
  test('A user without a plan, opening a form, is challenged to select a plan.', async (dsl: Dsl) => {
    await dsl.tryOpenJobOfferFormWithoutSelectedPlan();
    await dsl.assertChallengedToSelectPricingPlan();
  });
  test('A logged-out user editing a job offer is rejected.', async (dsl: Dsl) => {
    await dsl.tryEditJobOfferAsLoggedOut();
    await dsl.assertActionRejected();
  });
  test('A user without permission to edit is rejected.', async (dsl: Dsl) => {
    await dsl.tryEditJobOfferAsOtherUser();
    await dsl.assertActionRejected();
  });
});
