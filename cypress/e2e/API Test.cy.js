const API_BASE = 'https://api.weatherstack.com';
const ACCESS_KEY = Cypress.env('ACCESS_KEY');

describe('Weatherstack API Cypress Tests', () => {
  it('1. GET current weather for Kyiv — status 200, body structure', () => {
    cy.request({
      method: 'GET',
      url: `${API_BASE}/current`,
      qs: { access_key: ACCESS_KEY, query: 'Kyiv' },
    }).then((res) => {
      console.log('🔍 Server response:', res.body);
      cy.assertApiResponseOk(res);
      // Якщо ключ недійсний — покажемо повідомлення:
      if (res.body.success === false) {
        throw new Error(`API error: ${res.body.error?.info}`);
      }
      expect(res.body).to.have.property('current');
      expect(res.body.location.name).to.eq('Kyiv');
    });
  });

  // it('2. GET with custom and standard headers', () => {
  //   cy.request({
  //     method: 'GET',
  //     url: `${API_BASE}/current`,
  //     qs: { access_key: ACCESS_KEY, query: 'Kyiv' },
  //     headers: {
  //       'User-Agent': 'Cypress-Test-Agent',
  //       'x-test-header': 'my-custom-value',
  //     },
  //   }).then((res) => {
  //     cy.assertApiResponseOk(res);
  //     // Weatherstack returns Access-Control-Allow-Methods header :contentReference[oaicite:3]{index=3}
  //     expect(res.headers).to.have.property('access-control-allow-methods');
  //   });
  // });

  // it('3. Randomized query parameter', () => {
  //   const cities = ['London', 'Paris', 'Berlin', 'Rome', 'Madrid'];
  //   const city = cities[Math.floor(Math.random() * cities.length)];
  //   cy.log(`Testing city: ${city}`);
  //   cy.request({
  //     method: 'GET',
  //     url: `${API_BASE}/current`,
  //     qs: {
  //       access_key: ACCESS_KEY,
  //       query: city,
  //     },
  //   }).then((res) => {
  //     debugger;
  //     cy.assertApiResponseOk(res);
  //     if (res.body.success === false) {
  //       throw new Error(`API error: ${res.body.error?.info}`);
  //     }
  //     expect(res.body).to.have.nested.property('location.name');
  //     expect(res.body.location.name).to.match(new RegExp(city, 'i'));
  //     cy.log(`Testing city: ${city}`);
  //   });
  // });

  // it('4. POST request returns 405 or error', () => {
  //   cy.request({
  //     method: 'POST',
  //     url: `${API_BASE}/current`,
  //     body: { query: 'Kyiv', access_key: ACCESS_KEY },
  //     failOnStatusCode: false,
  //   }).then((res) => {
  //     // Статус може бути 200, але в тілі буде success: false
  //     expect(res.status).to.be.oneOf([200, 400, 405]);
  //     expect(res.body.success).to.eq(false);
  //     expect(res.body.error).to.have.property('info');
  //   });
  // });

  // it('5. Response time is under 3s', () => {
  //   cy.request({
  //     method: 'GET',
  //     url: `${API_BASE}/current`,
  //     qs: { access_key: ACCESS_KEY, query: 'Kyiv' },
  //   }).then((res) => {
  //     expect(res.duration).to.be.lessThan(3000);
  //   });
  // });

  // it('6. Query by coordinates works', () => {
  //   const lat = 40.7831;
  //   const lon = -73.9712;

  //   cy.request({
  //     method: 'GET',
  //     url: `${API_BASE}/current`,
  //     qs: {
  //       access_key: ACCESS_KEY,
  //       query: `${lat},${lon}`,
  //     },
  //     failOnStatusCode: false, // на випадок відповіді з success: false
  //   }).then((res) => {
  //     expect(res.status).to.eq(200);

  //     // Обробка помилки API
  //     if (res.body.success === false) {
  //       throw new Error(`API Error: ${res.body.error?.info}`);
  //     }

  //     // Тепер точно безпечна робота з location
  //     const responseLat = parseFloat(res.body.location.lat);
  //     const responseLon = parseFloat(res.body.location.lon);

  //     // Допускаємо похибку 0.1°
  //     expect(responseLat).to.be.closeTo(lat, 0.1);
  //     expect(responseLon).to.be.closeTo(lon, 0.1);
  //   });
  // });

  // const cities = ['Kyiv', 'Lviv', 'Odesa'];
  // cities.forEach((city) => {
  //   it(`7. GET current weather for ${city}`, () => {
  //     cy.request({
  //       method: 'GET',
  //       url: `${API_BASE}/current`,
  //       qs: { access_key: ACCESS_KEY, query: city },
  //       failOnStatusCode: false,
  //     }).then((res) => {
  //       // Перевірка загального статусу
  //       expect(res.status).to.eq(200);
  //       // Якщо помилка — виводимо пояснення і зупиняємо тест
  //       if (res.body.success === false) {
  //         cy.log(`⚠️ API Error for ${city}: ${res.body.error?.info}`);
  //         return; // Пропускаємо перевірку
  //       }
  //       expect(res.body.location).to.have.property('name');
  //       expect(res.body.location.name).to.match(new RegExp(city, 'i'));
  //     });
  //   });
  // });

  // it('8. Units parameter (Fahrenheit) works', () => {
  //   cy.request({
  //     method: 'GET',
  //     url: `${API_BASE}/current`,
  //     qs: { access_key: ACCESS_KEY, query: 'Kyiv', units: 'f' },
  //   }).then((res) => {
  //     expect(res.status).to.eq(200);
  //     expect(res.body.request.unit).to.eq('f');
  //     expect(res.body.current.temperature).to.be.a('number');
  //   });
  // });

  // it('9. Language parameter not supported on free plan', () => {
  //   cy.request({
  //     method: 'GET',
  //     url: `${API_BASE}/current`,
  //     qs: { access_key: ACCESS_KEY, query: 'Kyiv', language: 'uk' },
  //     failOnStatusCode: false,
  //   }).then((res) => {
  //     console.log('🔍 Server response:', res.body);
  //     expect(res.status).to.eq(200);
  //     expect(res.body.success).to.eq(false);
  //     expect(res.body.error?.info).to.include('Access Restricted');
  //   });
  // });

  // it('10. Rate-limit headers — check presence or explain absence', () => {
  //   cy.request({
  //     method: 'GET',
  //     url: `${API_BASE}/current`,
  //     qs: { access_key: ACCESS_KEY, query: 'Kyiv' },
  //   }).then((res) => {
  //     expect(res.status).to.eq(200);

  //     const rateLimit =
  //       res.headers['x-ratelimit-limit'] ||
  //       res.headers['x-ratelimit-limit-minute'];

  //     if (rateLimit) {
  //       cy.log('✅ Rate-limit header is present:', rateLimit);
  //       expect(Number(rateLimit)).to.be.greaterThan(0);
  //     } else {
  //       cy.log('ℹ️ Rate-limit headers are not included in Free Plan');
  //     }
  //   });
  // });
});
