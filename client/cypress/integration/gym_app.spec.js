describe('Gym Membership App', function () {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:5000/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened and it shows initial setup form', function () {
    cy.contains('Create settings')
  })

  it('initial setup form can be submitted', function () {
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
      }).then(() => {
        cy.visit('http://localhost:3000')
      })
    })

    it('user can sign up', () => {
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
        beforeEach(() => {
          cy.request('POST', 'http://localhost:5000/api/auth/login', {
            email: 'john@example.com',
            password: 'test123',
          }).then((response) =>
            localStorage.setItem('token', response.body.token)
          )
        })
        it('user can access admin panel', () => {
          cy.visit('http://localhost:3000')
          cy.contains('Admin Panel').click()
          cy.contains('Admin Panel')
          cy.contains('Overview')
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
        // describe one category and product created
      })
    })
  })
})
