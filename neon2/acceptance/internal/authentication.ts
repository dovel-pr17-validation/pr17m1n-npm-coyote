import {Page} from '@playwright/test';

export * from '@playwright/test';

export async function authenticate(page: Page, workerIndex: number): Promise<void> {
  await page.goto('/Login');
  await acceptGdpr(page);
  await loginAcceptanceUser(workerIndex, page);
}

async function acceptGdpr(page: Page): Promise<void> {
  const element = page.getByRole('button', {name: 'Tylko niezbędne'});
  if (await element.isVisible()) {
    await element.click();
  }
}

async function loginAcceptanceUser(index: number, page: Page): Promise<void> {
  const userId = index + 1;
  await fillLogin(page, 'acceptance-test-' + userId.toString());
  await fillPassword(page, 'acceptance-test-' + userId.toString());
  await proceedLogin(page);
}

function fillLogin(page: Page, login: string): Promise<void> {
  return page.locator('input[name="name"]').fill(login);
}

async function fillPassword(page: Page, password: string): Promise<void> {
  await page.locator('input[name="password"]').fill(password);
}

async function proceedLogin(page: Page): Promise<void> {
  await page.getByRole('button', {name: 'Zaloguj się'}).click();
  await page.waitForURL('/');
}
