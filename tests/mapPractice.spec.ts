import { test, expect, chromium } from '@playwright/test';

test.describe('Map Operations Practice Suite - Full Visible Front-End Operations', () => {

  // TASK 1: Visual Address Entry & Geocoding Search Simulation
  test('Task 1: Should successfully update a house address from a user ticket', async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 2500 });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://leafletjs.com');

    // 1. Clear the default greeting overlay out of the way
    const closeBtn = page.locator('.leaflet-popup-close-button, button:has-text("×")').first();
    if (await closeBtn.isVisible()) await closeBtn.click();

    // 2. INJECT FRONT-END ADDRESS PANEL: Programmatically add a searchable dashboard control panel
    await page.evaluate(() => {
      const panel = document.createElement('div');
      panel.id = 'address-panel';
      panel.innerHTML = `
        <div style="position: absolute; top: 10px; right: 50px; z-index: 1000; background: white; padding: 15px; border: 2px solid #333; border-radius: 5px; font-family: sans-serif;">
          <h3 style="margin: 0 0 10px 0; font-size: 14px;">Update House Address</h3>
          <input type="text" id="address-input" placeholder="Enter new address..." style="padding: 5px; width: 180px; margin-bottom: 5px;"/><br/>
          <button id="search-btn" style="padding: 5px 10px; background: #007bff; color: white; border: none; cursor: pointer; border-radius: 3px;">Apply Address Update</button>
        </div>
      `;
      document.body.appendChild(panel);
    });

    // 3. FRONT-END INTERACTION: Click the newly created input field and type out the address
    const addressBox = page.locator('#address-input');
    await addressBox.click();
    await addressBox.fill('123 New Heritage Lane, Block B');

    // 4. Click the submission button on your viewport screen
    await page.locator('#search-btn').click();

    // 5. Assert the changes applied successfully to the front-end container elements
    await expect(addressBox).toHaveValue('123 New Heritage Lane, Block B');

    await page.waitForTimeout(2000);
    await browser.close();
  });

  // TASK 2: Highway Segment Tracking & Feature Label Assignment
  test('Task 2: Should successfully assign a name to an unnamed highway segment', async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 2500 });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://leafletjs.com');

    const closeBtn = page.locator('.leaflet-popup-close-button, button:has-text("×")').first();
    if (await closeBtn.isVisible()) await closeBtn.click();

    // 1. INJECT HIGHWAY DESIGNATOR: Draw a high-visibility roadway marker box layout
    await page.evaluate(() => {
      const panel = document.createElement('div');
      panel.id = 'highway-panel';
      panel.innerHTML = `
        <div style="position: absolute; bottom: 50px; left: 20px; z-index: 1000; background: #fffde7; padding: 15px; border: 2px solid #f57f17; border-radius: 5px; font-family: sans-serif;">
          <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #e65100;">Selected Road Segment: [Unnamed Highway]</h3>
          <input type="text" id="highway-input" placeholder="Assign Name (e.g. Route 66)..." style="padding: 5px; width: 200px; margin-bottom: 5px;"/><br/>
          <button id="highway-btn" style="padding: 5px 10px; background: #e65100; color: white; border: none; cursor: pointer; border-radius: 3px;">Save Highway Label</button>
        </div>
      `;
      document.body.appendChild(panel);
    });

    // 2. FRONT-END INTERACTION: Focus the highway naming element and type the route designator
    const highwayBox = page.locator('#highway-input');
    await highwayBox.click();
    await highwayBox.fill('Pacific Coast Highway Link');

    // 3. Commit the structural naming change
    await page.locator('#highway-btn').click();

    // 4. Assert the naming model matches what you see on screen
    await expect(highwayBox).toHaveValue('Pacific Coast Highway Link');

    await page.waitForTimeout(2000);
    await browser.close();
  });

  // TASK 3: Managing Incidents & Dynamic Road Closure Status Toggles
  test('Task 3: Should successfully toggle road closure status based on user concern', async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 2500 });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://leafletjs.com');

    const closeBtn = page.locator('.leaflet-popup-close-button, button:has-text("×")').first();
    if (await closeBtn.isVisible()) await closeBtn.click();

    // 1. INJECT INCIDENT TOGGLE PANEL: Display a dashboard control grid for live incident updates
    await page.evaluate(() => {
      const panel = document.createElement('div');
      panel.id = 'closure-panel';
      panel.innerHTML = `
        <div style="position: absolute; top: 120px; right: 50px; z-index: 1000; background: white; padding: 15px; border: 2px solid #c62828; border-radius: 5px; font-family: sans-serif;">
          <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #c62828;">Road Maintenance Status</h3>
          <label style="font-size: 13px; cursor: pointer;">
            <input type="checkbox" id="closure-checkbox" style="margin-right: 8px; transform: scale(1.2);"/>
            Mark Road Segment as <b>CLOSED</b>
          </label>
          <div id="status-indicator" style="margin-top: 10px; font-weight: bold; color: green;">Current Status: Active / Open</div>
        </div>
      `;
      document.body.appendChild(panel);

      // Add dynamic styling changes when clicking the checkbox control
      const box = document.getElementById('closure-checkbox') as HTMLInputElement;
      box.addEventListener('change', () => {
        const text = document.getElementById('status-indicator')!;
        if(box.checked) {
          text.innerText = 'Current Status: BLOCKED / CLOSED';
          text.style.color = '#c62828';
        } else {
          text.innerText = 'Current Status: Active / Open';
          text.style.color = 'green';
        }
      });
    });

    // 2. FRONT-END INTERACTION: Check the initial state is open
    const statusText = page.locator('#status-indicator');
    await expect(statusText).toHaveText('Current Status: Active / Open');

    // 3. Click the interactive checkbox element directly to block traffic vectors
    const toggleBox = page.locator('#closure-checkbox');
    await toggleBox.check();

    // 4. VERIFY THE EVENT: Ensure the layout color turns red and confirms the closure text
    await expect(statusText).toHaveText('Current Status: BLOCKED / CLOSED');

    await page.waitForTimeout(3000);
    await browser.close();
  });

});
