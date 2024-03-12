const puppeteer = require('puppeteer');

describe('Web Interface Test', () => {
  test('should display the correct title', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:5500/WebMobile-Portfolio/index.html', { waitUntil: 'networkidle0' }); 
    const title = await page.title();
    expect(title).toBe('Anar Bayramov | Portfolio');
    await browser.close();
  }, 30000); 
});


describe('Web Interface Test', () => {
    test('should contain specific elements', async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('http://127.0.0.1:5500/WebMobile-Portfolio/index.html', { waitUntil: 'networkidle0' });
  
      const element = await page.$('.home__scroll');
      expect(element).not.toBeNull();
  
      await browser.close();
    }, 30000);
  });



describe('Web Interface Test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://127.0.0.1:5500/WebMobile-Portfolio/index.html', { waitUntil: 'networkidle0' });
  });

  afterAll(async () => {
    await browser.close();
  });

  test('nav-toggle click adds show-menu class to nav-menu', async () => {
    await page.click('#nav-toggle');
    const navMenuClassList = await page.evaluate(() => document.getElementById('nav-menu').classList);
    expect(navMenuClassList).toContain('show-menu');
  });

  test('nav-close click removes show-menu class from nav-menu', async () => {
    await page.click('#nav-close');
    const navMenuClassList = await page.evaluate(() => document.getElementById('nav-menu').classList);
    expect(navMenuClassList).not.toContain('show-menu');
  });

  test('nav__link click removes show-menu class from nav-menu', async () => {
    await page.click('.nav__link');
    const navMenuClassList = await page.evaluate(() => document.getElementById('nav-menu').classList);
    expect(navMenuClassList).not.toContain('show-menu');
  });

  test('skills__header click toggles skills__open and skills__close classes', async () => {
    const initialClassList = await page.evaluate(() => document.querySelector('.skills__content').classList);
    await page.click('.skills__header');
    const finalClassList = await page.evaluate(() => document.querySelector('.skills__content').classList);
    expect(initialClassList).not.toEqual(finalClassList);
  });

  test('tab click adds qualification__active class to correct tab and content', async () => {
    await page.click('[data-target]');
    const targetClassList = await page.evaluate(() => document.querySelector('[data-content]').classList);
    expect(targetClassList).toContain('qualification__active');
  });

  test('services__button click adds active-modal class to correct services__modal', async () => {
    await page.click('.services__button');
    const modalClassList = await page.evaluate(() => document.querySelector('.services__modal').classList);
    expect(modalClassList).toContain('active-modal');
  });

  test('services__modal-close click removes active-modal class from all services__modal', async () => {
    await page.click('.services__modal-close');
    const modalClassList = await page.evaluate(() => document.querySelector('.services__modal').classList);
    expect(modalClassList).not.toContain('active-modal');
  });

  test('theme-button click toggles dark-theme class on body and uil-sun class on button', async () => {
    const initialBodyClassList = await page.evaluate(() => document.body.classList);
    const initialButtonClassList = await page.evaluate(() => document.getElementById('theme-button').classList);
    await page.click('#theme-button');
    const finalBodyClassList = await page.evaluate(() => document.body.classList);
    const finalButtonClassList = await page.evaluate(() => document.getElementById('theme-button').classList);
    expect(initialBodyClassList).not.toEqual(finalBodyClassList);
    expect(initialButtonClassList).not.toEqual(finalButtonClassList);
  });
});
