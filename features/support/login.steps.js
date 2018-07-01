// features/support/login.steps.js
const {
    Given,
    When,
    Then
} = require('cucumber')
const assert = require('assert');
const chromeDriver = require('chromedriver');
const seleniumWebdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const By = seleniumWebdriver.By;
const until = seleniumWebdriver.until;

When('I log in', function (next) {
    const world = this;
    const driver = new seleniumWebdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().headless())
        .build();

    var url = "https://draycir-account-api-stable.azurewebsites.net/authorize" +
        "?client_id=E3gYZIonp0uzXZTbaiFxyg" +
        "&response_type=token" +
        "&redirect_uri=" + encodeURIComponent("https://localhost:44361") +
        "&audience=" + encodeURIComponent("https://localhost:51259");

    driver.get(url)
        .then(_ => driver.wait(until.elementLocated(By.css("input[type='email']"))))
        .then(userNameInput => userNameInput.sendKeys(""))
        .then(_ => driver.wait(until.elementLocated(By.css("input[type='password']"))))
        .then(passwordInput => driver.wait(until.elementIsVisible(passwordInput)))
        .then(passwordInput => passwordInput.sendKeys(""))
        .then(_ => driver.wait(until.elementLocated(By.css("input[type='submit']"))))
        .then(submitInput => driver.wait(until.elementIsVisible(submitInput)))
        .then(submitInput => submitInput.click())
        .then(_ => driver.wait(until.urlContains("id_token")))
        .then(_ => driver.getCurrentUrl())
        .then(url => {
            const indexOfHash = url.indexOf("#");
            if (indexOfHash >= 0) {
                const queryStringParameters = url.substring(indexOfHash + 1);
                queryStringParameters.split("&").forEach(queryStringParam => {
                    if (queryStringParam.indexOf("=") >= 0) {
                        const split = queryStringParam.split("=");
                        if (split[0] === "access_token") {
                            world.accessToken = split[1];
                        }
                    }
                });
            }
        })
        .then(_ => next())
        .catch(x => { console.log(x); next(); });
});

Then('I have an access token', function () {
    const world = this;
    const accessToken = world.accessToken;
    console.log(accessToken);
    assert.notStrictEqual(accessToken, undefined);
    assert.notStrictEqual(accessToken, null);
    assert.equal(accessToken.length > 1, true);
});

// Returns a promise that resolves to the element
waitForElement = function (locator) {
    var condition = seleniumWebdriver.until.elementLocated(locator);
    return this.driver.wait(condition);
};