import {Dsl} from "../internal/dsl";
import {beforeEach, describe, test} from "../internal/playwright";

beforeEach(dsl => dsl.beforeEach());

describe('Payment includes VAT.', () => {
  describe('VAT is included based on country.', () => {
    test('For Poland, VAT is included.', async (dsl: Dsl) => {
      await dsl.fillInvoice({countryCode: 'PL', vatId: '1234 1234 12'});
      await dsl.assertInvoiceVatTax('included');
    });
    describe('Given a country in EU other than Poland,', () => {
      test('Given Vat-Id is provided, VAT is not included.', async (dsl: Dsl) => {
        await dsl.fillInvoice({countryCode: 'DE', vatId: '123 123 123'});
        await dsl.assertInvoiceVatTax('free');
      });
      test('Given Vat-Id is not provided, VAT is included.', async (dsl: Dsl) => {
        await dsl.fillInvoice({countryCode: 'DE', vatId: ''});
        await dsl.assertInvoiceVatTax('included');
      });
    });
    test('Given a country outside of EU, VAT is included.', async (dsl: Dsl) => {
      await dsl.fillInvoice({countryCode: 'SG', vatId: ''});
      await dsl.assertInvoiceVatTax('included');
    });
  });
  describe('Vat-Id is validated.', () => {
    describe('Vat-Id format is validated based on country.', () => {
      describe('For Poland, Vat-Id contains 10 digits.', () => {
        test('Vat-Id with 10 digits is valid.', async (dsl: Dsl) => {
          await dsl.fillInvoice({countryCode: 'PL', vatId: '1000 1000 10'});
          await dsl.assertInvoiceVatId('valid');
        });
        test('Vat-Id with 9 digits is invalid.', async (dsl: Dsl) => {
          await dsl.fillInvoice({countryCode: 'PL', vatId: '123 123 123'});
          await dsl.assertInvoiceVatId('invalid');
        });
      });
      describe('For Germany, Vat-Id contains 9 digits.', () => {
        test('Vat-Id with 9 digits is valid.', async (dsl: Dsl) => {
          await dsl.fillInvoice({countryCode: 'DE', vatId: '123 123 123'});
          await dsl.assertInvoiceVatId('valid');
        });
        test('Vat-Id with 10 digits is invalid.', async (dsl: Dsl) => {
          await dsl.fillInvoice({countryCode: 'DE', vatId: '1000 1000 10'});
          await dsl.assertInvoiceVatId('invalid');
        });
      });
    });
    describe('Vat-Id for a country outside of EU, VAT-ID is invalid.', () => {
      test('For USA, any VAT is invalid.', async (dsl: Dsl) => {
        await dsl.fillInvoice({countryCode: 'US', vatId: '1234123412'});
        await dsl.assertInvoiceVatId('invalid');
      });
      test('For USA, not provided VAT is valid.', async (dsl: Dsl) => {
        await dsl.fillInvoice({countryCode: 'US', vatId: ''});
        await dsl.assertInvoiceVatId('valid');
      });
    });
  });
});
