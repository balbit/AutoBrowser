import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/search?q=efefef&oq=efefef&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBBzYxNWowajKoAgCwAgA&sourceid=chrome&ie=UTF-8');
  await page.getByRole('link', { name: '#efefef Color Hex Color Hex' }).click();
});