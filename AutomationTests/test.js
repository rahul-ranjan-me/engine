module.exports = {
  'Open Recommend Application' : function (browser) {
    browser
      .maximizeWindow()
      .url('http://localhost:4200')
      .waitForElementVisible('body', 2000)
      // Click on login button
      .pause(2000)
      .click('.btn-success')
      .waitForElementVisible('#cred_userid_inputtext', 2000)

      // Entering user name
      .setValue('input#cred_userid_inputtext', 'rahul.ranjan@markit.com')
      .setValue('input#cred_password_inputtext', '')

      // Wait for element to visible on summary page
      .waitForElementVisible('#recommendation-types svg', 30000)

      // Test menu toogle      
      .assert.hidden(".main-menu-item")
      .click('.main-menu .ham-menu')
      .assert.attributeEquals(".main-menu-item", "style", "height: 148px; opacity: 1;")
      .click('.main-menu .ham-menu')
      .assert.attributeEquals(".main-menu-item", "style", "height: 0px; opacity: 0;")


      // Checking recommendation by types chart
      .assert.containsText("#recommendation-types .highcharts-title tspan", "RECOMMENDATIONS BY TYPE")
      .assert.containsText("#recommendation-types .highcharts-subtitle tspan", "CLICK TO SEE DATA")

      .assert.hidden("#recommendationGrid")
      .click('#recommendation-types .highcharts-series-group .highcharts-series path')
      .pause(2500)
      .assert.attributeEquals("#recommendationGrid", "style", "height: 286px; opacity: 1;")
      .assert.cssClassPresent("#recommendationGrid", "col-md-12")

      // Checking recommendation by region chart
      .assert.containsText("#recommendation-region .highcharts-title tspan", "RECOMMENDATIONS BY REGION")
      .assert.containsText("#recommendation-region .highcharts-subtitle tspan", "CLICK TO SEE DATA")
      .assert.hidden("#recommendationRegionGrid")
      .click('#recommendation-region .highcharts-series-group .highcharts-series path[fill="#aaeeee"]')
      .waitForElementVisible('#recommendationRegionGrid', 4000)
      .assert.attributeEquals("#recommendationRegionGrid", "style", "height: 286px; opacity: 1;")
      .assert.cssClassPresent("#recommendationRegionGrid", "col-md-6")

      //checking the size of recommendation of type grid has changed
      .pause(1000)
      .assert.cssClassPresent("#recommendationGrid", "col-md-6")

      // Toogle recommendation by type grid
      .click('#recommendation-types .highcharts-series-group .highcharts-series path')
      .pause(1000)
      .assert.attributeEquals("#recommendationGrid", "style", "height: 0px; opacity: 0;")
      .assert.cssClassPresent("#recommendationRegionGrid", "col-md-12")

      // toogle recommendation by region grid
      .click('#recommendation-region .highcharts-series-group .highcharts-series path[fill="#aaeeee"]')
      .pause(1000)
      .assert.attributeEquals("#recommendationRegionGrid", "style", "height: 0px; opacity: 0;")

      // go to client detail page
      .click('#topRecommendationCont .grid-vertical-scroll ul li')
      .waitForElementVisible('.client-details', 3000)

      // Client change test
      .pause(5000)
      .assert.cssClassNotPresent(".clientName", "edit")
      .click('.name-read')
      .pause(1000)
      .assert.cssClassPresent(".clientName", "edit")
      .setValue('.clientName .input-container input.form-control', 'RBS Royal Bank of Scotland (Global Parent)')
      .pause(3000)
      .click('.save-client')
      .pause(4000)
      .waitForElementVisible('.client-details', 3000)
      .assert.containsText(".name-read", "RBS Royal Bank of Scotland (Global Parent)")
      .click('.recomm-tab a#similarClients')
      .pause(3000)
      .assert.cssClassPresent('.select-client', 'col-md-12')
      .assert.hidden('.product-similar-client')
      .click('.select-client .grid-vertical-scroll li')
      .pause(3000)
      .assert.cssClassPresent('.select-client', 'col-md-9')
      .assert.cssClassNotPresent('.select-client', 'col-md-12')
      .assert.visible('.product-similar-client')

      // Going to client search page
      .assert.hidden(".main-menu-item")
      .click('.main-menu .ham-menu')
      .assert.attributeEquals(".main-menu-item", "style", "height: 148px; opacity: 1;")
      .pause(3000)
      .click('#recommendationByClients')
      .pause(4000)
      .waitForElementVisible('.search', 3000)
      .setValue('input[ng-model="fieldLabelVal"]', 'Alcentra Asset Management Ltd')
      .pause(2000)
      .click('.btn-search')
      .pause(3000)
      .click('.recommendedByClient .grid-vertical-scroll ul li')
      .waitForElementVisible('.client-details', 3000)
      .pause(5000)
      .assert.containsText(".name-read", "Alcentra Asset Management Ltd")
  }
};