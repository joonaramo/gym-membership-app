describe('Gym Membership App', function () {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:5000/api/testing/reset')
    localStorage.removeItem('_klarna_sdid_ch')
  })

  it('front page can be opened and it shows initial setup form', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Create settings')
  })

  it('initial setup form can be submitted', function () {
    cy.visit('http://localhost:3000')
    cy.get('#business_name').type('Test Gym Oy')
    cy.get('#logo_url').type(
      'https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
    )
    cy.get('#alt_logo_url').type(
      'https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
    )
    cy.get('#welcome_email').type('Welcome to our gym!')
    cy.get('#order_email').type('Thanks for your order!')
    cy.get('#maps_api_key').type('AIzaSyBpTbD1V8P-KVaM62r5Lo5IozvFdniahLw')
    cy.get('#maps_lat').type('60.943232')
    cy.get('#maps_lng').type('23.362551')
    cy.get('#facebook_url').type('https://facebook.com')
    cy.get('#instagram_url').type('https://instagram.com')
    cy.get('#twitter_url').type('https://twitter.com')

    cy.get('#submit-settings').click()
    cy.contains('The best and')
    cy.contains('the only gym in town')
  })

  describe('when initial setup has been made', function () {
    beforeEach(() => {
      cy.request('POST', 'http://localhost:5000/api/settings', {
        business_name: 'Test Gym Oy',
        logo_url:
          'https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg',
        alt_logo_url:
          'https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg',
        welcome_email: { message: 'Welcome to our gym!', enabled: true },
        order_email: { message: 'Thanks for your order!', enabled: true },
        maps: {
          api_key: 'AIzaSyBpTbD1V8P-KVaM62r5Lo5IozvFdniahLw',
          lat: 60.943232,
          lng: 23.362551,
        },
        social_urls: {
          facebook: 'https://facebook.com',
          instagram: 'https://instagram.com',
          twitter: 'https://twitter.com',
        },
      })
    })

    it('user can sign up', () => {
      cy.visit('http://localhost:3000')
      cy.get('#headlessui-menu-button-1').click()
      cy.contains('Sign up').click()

      cy.get('#first_name').type('John')
      cy.get('#last_name').type('Doe')
      cy.get('#phone_number').click().type('0401234567')
      cy.get('#street_address').type('123 Example Street')
      cy.get('#city').type('Test City')
      cy.get('#postal_code').type('12345')
      cy.get('#email').type('john@example.com')
      cy.get('#password').type('test123')
      cy.get('#password2').type('test123')

      cy.get('#submit-signup').click()
      cy.contains('Your Profile')
    })

    describe('when user has signed up', () => {
      beforeEach(() => {
        cy.request('POST', 'http://localhost:5000/api/auth/signup', {
          email: 'john@example.com',
          password: 'test123',
          first_name: 'John',
          last_name: 'Doe',
          phone_number: '0401234567',
          street_address: '123 Test Street',
          postal_code: 12345,
          city: 'Test City',
          birth_date: '1990-01-01',
        })
      })
      it('user can log in', () => {
        cy.visit('http://localhost:3000')
        cy.get('#headlessui-menu-button-1').click()
        cy.contains('Log in').click()
        cy.get('#email').type('john@example.com')
        cy.get('#password').type('test123')

        cy.get('#submit-login').click()
        cy.contains('Your Profile')
      })

      describe('when user has logged in', () => {
        let token
        beforeEach(() => {
          cy.request('POST', 'http://localhost:5000/api/auth/login', {
            email: 'john@example.com',
            password: 'test123',
          }).then((response) => {
            localStorage.setItem('token', response.body.token)
            token = response.body.token
          })
        })
        it('user can access admin panel', () => {
          cy.visit('http://localhost:3000')
          cy.contains('Admin Panel').click()
          cy.contains('Admin Panel')
          cy.contains('Overview')
        })
        it('user can create new categories and products', () => {
          // New category
          cy.visit('http://localhost:3000/admin/categories')
          cy.contains('New category').click()
          cy.get('#name').type('Test Category 1')
          cy.get('#description').type('This is a testing category')
          cy.get('#submit-button').click()
          // New product
          cy.visit('http://localhost:3000/admin/products')
          cy.contains('New product').click()
          cy.get('#name').type('Test Product 1')
          cy.get('#reference').type('GYM-01')
          cy.get('#category').select('Test Category 1')
          cy.get('#membership_length').type('1')
          cy.get('#unit_price').type('100')
          cy.get('#tax_rate').type('10')
          cy.get('#submit-button').click()
        })
        describe('when one category and product has been created', () => {
          beforeEach(() => {
            cy.request({
              method: 'POST',
              url: 'http://localhost:5000/api/categories',
              body: {
                name: 'Test Category 1',
                description: 'This is a testing category',
              },
              headers: {
                Authorization: `bearer ${token}`,
              },
            }).then((response) => {
              cy.request({
                method: 'POST',
                url: 'http://localhost:5000/api/products',
                body: {
                  name: 'Test Product 1',
                  featured: true,
                  most_popular: true,
                  reference: 'GYM-01',
                  membership_length: 1,
                  tax_rate: 10,
                  unit_price: 100,
                  category: response.body.id,
                },
                headers: {
                  Authorization: `bearer ${token}`,
                },
              })
            })
          })
          it('product is listed on front page', () => {
            cy.visit('http://localhost:3000')
            cy.contains('Test Product 1')
          })
          it('product can be bought', () => {
            cy.visit('http://localhost:3000')
            cy.contains('Join now').click()
            cy.contains('Proceed to checkout').click()
            cy.wait(10000)
            cy.get('#klarna-checkout-iframe').then(($frame) => {
              const content = $frame.contents()

              if (content.find('#billing-email').length) {
                cy.switchToIframe('#klarna-checkout-iframe')
                  .find('#billing-email')
                  .type('test@gymlifio.com')
                cy.switchToIframe('#klarna-checkout-iframe')
                  .find('#billing-postal_code')
                  .type('28100')
                cy.switchToIframe('#klarna-checkout-iframe')
                  .find('#button-primary')
                  .click()
              } else {
                cy.switchToIframe('#klarna-checkout-iframe')
                  .find('#button-primary')
                  .click()
              }
              cy.get('#klarna-checkout-iframe').then(($frame) => {
                const content = $frame.contents()
                if (content.find('#billing-given_name').length) {
                  cy.switchToIframe('#klarna-checkout-iframe')
                    .find('#billing-given_name')
                    .type('Testperson-fi')
                  cy.switchToIframe('#klarna-checkout-iframe')
                    .find('#billing-family_name')
                    .type('Approved')
                  cy.switchToIframe('#klarna-checkout-iframe')
                    .find('#billing-street_address')
                    .type('Kirjurinluodontie 5')
                  cy.switchToIframe('#klarna-checkout-iframe')
                    .find('#billing-phone')
                    .type('0401234567')
                  cy.switchToIframe('#klarna-checkout-iframe')
                    .find('#button-primary')
                    .click()
                }

                cy.switchToIframe('#klarna-checkout-iframe')
                  .find('#payment-selector-pay_now')
                  .click()
                cy.wait(5000)

                cy.switchToIframe('#klarna-checkout-iframe')
                  .find('#pgw-iframe-paynow_card')
                  .then(($cardIframe) => {
                    const $doc = $cardIframe.contents()
                    cy.wrap($doc.find('#cardNumber')[0]).type(
                      '4111 1111 1111 1111'
                    )
                    cy.wrap($doc.find('#expire')[0]).type('1225')
                    cy.wrap($doc.find('#securityCode')[0]).type('123', {
                      force: true,
                      delay: 150,
                    })
                    cy.switchToIframe('#klarna-checkout-iframe')
                      .find('button[data-cid="button.buy_button"]')
                      .click()
                    cy.switchToIframe('#klarna-fullscreen-iframe')
                      .contains('Ohita t??m?? vaihe')
                      .click()
                    cy.wait(10000)
                    cy.switchToIframe('#klarna-checkout-iframe').find(
                      '#confirmation-container'
                    )
                  })
              })
            })
          })
        })
      })
    })
  })
})
