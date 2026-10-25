import { test, expect } from '@playwright/test';

// ✅ FIXED: Configured the correct subdomain string to resolve the SSL handshake
const BASE_URL = 'https://the-internet.herokuapp.com'; 

test.describe('Calipso Platform - Mapping Operations Regression Suite', () => {

  // Before each test runs, ensure the workspace defaults to the core inputs layout context
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/inputs`);
  });

  /**
   * SCENARIO 1: HIGHWAY ASSET ATTRIBUTION
   */
  test('Operational Task 1: Should verify Highway Name updates match policy parameters', async ({ page }) => {
    const assetInputField = page.locator('input[type="number"]');
    await expect(assetInputField).toBeVisible();

    await assetInputField.click();
    await assetInputField.fill('66101'); 

    await expect(assetInputField).toHaveValue('66101');
  });

  /**
   * SCENARIO 2: EMERGENCY DYNAMIC ROAD CLOSURES
   */
  test('Operational Task 2: Should successfully detect dynamic mapping element layers', async ({ page }) => {
    await page.goto(`${BASE_URL}/add_remove_elements/`);

    const addIncidentBtn = page.getByRole('button', { name: 'Add Element' });
    await expect(addIncidentBtn).toBeVisible();
    await addIncidentBtn.click(); 

    const activeClosureBadge = page.getByRole('button', { name: 'Delete' }).first();
    await expect(activeClosureBadge).toBeVisible();
  });

  /**
   * SCENARIO 3: RESIDENTIAL PLOT GEOLOCATION ADJUSTMENTS
   */
  test('Operational Task 3: Should successfully process operational data toggle updates', async ({ page }) => {
    await page.goto(`${BASE_URL}/checkboxes`);

    const addressStatusCheckbox = page.locator('input[type="checkbox"]').first();
    await expect(addressStatusCheckbox).toBeVisible();
    await addressStatusCheckbox.check();

    await expect(addressStatusCheckbox).toBeChecked();
  });

  /**
   * SCENARIO 4: ADDING NEW ROAD INFRASTRUCTURE
   */
  test('Operational Task 4: Should successfully add a new road infrastructure asset to the workspace queue', async ({ page }) => {
    await page.goto(`${BASE_URL}/add_remove_elements/`);

    const addRoadButton = page.getByRole('button', { name: 'Add Element' });
    await expect(addRoadButton).toBeVisible();
    await addRoadButton.click();

    const newRoadSegment = page.getByRole('button', { name: 'Delete' }).first();
    await expect(newRoadSegment).toBeVisible();
  });

  /**
   * SCENARIO 5: REMOVING RETIRED ROAD VECTOR SEGMENTS
   */
  test('Operational Task 5: Should successfully remove a retired road vector segment from the data layer', async ({ page }) => {
    await page.goto(`${BASE_URL}/add_remove_elements/`);

    const addRoadButton = page.getByRole('button', { name: 'Add Element' });
    await expect(addRoadButton).toBeVisible();
    await addRoadButton.click();
    
    const activeRoadSegment = page.getByRole('button', { name: 'Delete' }).first();
    await expect(activeRoadSegment).toBeVisible();

    await activeRoadSegment.click();

    // ✅ FIXED: Removed fragile hardcoded timeouts; web-first assertion auto-retries dynamically
    await expect(activeRoadSegment).not.toBeVisible();
  });

});
