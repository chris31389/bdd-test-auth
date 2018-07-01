// features/support/login.steps.js
const {
    Given,
    When,
    Then
} = require('cucumber')
const assert = require('assert');
require('chromedriver');
const seleniumWebdriver = require('selenium-webdriver');
var By = seleniumWebdriver.By;
var until = seleniumWebdriver.until;

When('I log in', function (next) {
    const driver = new seleniumWebdriver.Builder()
        .forBrowser('chrome')
        .build();

    var url = "https://draycir-account-api-stable.azurewebsites.net/authorize" +
        "?client_id=E3gYZIonp0uzXZTbaiFxyg" +
        "&response_type=token" +
        "&redirect_uri=" + encodeURIComponent("https://localhost:44361") +
        "&audience=" + encodeURIComponent("https://localhost:51259");

    driver.get(url)
        //        .then(_ => driver.wait(until.elementLocated(By.css("input[type='email']"))))
        //        .then(userNameInput => userNameInput.sendKeys("Hello"))
        .then(_ => driver.wait(until.elementLocated(By.css("input[type='submit']"))))
        .then(_ => driver.sleep(1000))
        .then(_ => driver.findElement(By.css("input[type='email']")))
        .then(userNameInput => userNameInput.sendKeys("Hello"))
        .then(_ => driver.findElement(By.css("input[type='password']")))
        .then(passwordInput => passwordInput.sendKeys("Bye"))
        .then(() => driver.getCurrentUrl()
            .then(value => {
                console.log(value);
                next();
            })
            .catch(x => console.log(x))
            /* 
                                .then(() => driver.wait(until.elementLocated(By.css("input[type='password']")))
                                    .then(passwordInput => passwordInput.sendKeys("Bye")
                                        .then(() => {
                                            driver.getCurrentUrl()
                                                .then(value => {
                                                    console.log(value);
                                                    next();
                                                })
                                        })
                                    )
                                ) */
        )
        .catch(x => console.log(x));
});

Then('I have an access token', function () {
    isSuccess = false;
    assert.equal(isSuccess, true);
});

// Returns a promise that resolves to the element
waitForElement = function (locator) {
    var condition = seleniumWebdriver.until.elementLocated(locator);
    return this.driver.wait(condition);
};