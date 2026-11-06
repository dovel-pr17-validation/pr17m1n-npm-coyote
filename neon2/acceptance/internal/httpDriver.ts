import {APIRequestContext} from "playwright-core";
import {PricingPlan} from "./dsl";

export class HttpDriver {
  constructor(public request: APIRequestContext) {
  }

  async createJobOfferReturnId(jobOfferTitle: string, jobOfferPlan: PricingPlan): Promise<number> {
    const jobOfferCreated = await this.post('/neon2/job-offers', {
      jobOfferPlan,
      jobOfferTitle,
      jobOfferCompanyLogoUrl: '',
      jobOfferCompanyName: 'company name',
      jobOfferDescription: 'description',
      jobOfferExperience: 'not-provided',
      jobOfferLegalForm: 'employment',
      jobOfferLocations: [],
      jobOfferSalaryCurrency: 'PLN',
      jobOfferSalaryIsNet: true,
      jobOfferSalaryRangeFrom: 0,
      jobOfferSalaryRangeTo: 0,
      jobOfferSalaryRate: 'monthly',
      jobOfferTagNames: [],
      jobOfferWorkMode: 'stationary',
      jobOfferCompanyWebsiteUrl: 'http://website',
      jobOfferCompanyDescription: 'company description',
      jobOfferCompanyPhotoUrls: [],
      jobOfferCompanyVideoUrl: 'http://video',
      jobOfferCompanySizeLevel: 2,
      jobOfferCompanyFundingYear: 1994,
      jobOfferCompanyAddress: 'address',
      jobOfferCompanyHiringType: 'direct',
      jobOfferApplicationMode: '4programmers',
      jobOfferApplicationEmail: 'application@mail',
      jobOfferApplicationExternalAts: 'http://ats',
    });
    return jobOfferCreated['id'];
  }

  async redeemBundle(jobOfferId: number, userId: number): Promise<void> {
    await this.post('/neon2/job-offers/redeem-bundle', {jobOfferId, userId});
  }

  private async post(url: string, data: object): Promise<object> {
    const response = await this.request.post(url, {
      headers: {'Content-Type': 'application/json'},
      data,
    });
    return await response.json();
  }
}
