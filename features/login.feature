# features/retrieve_posts.feature
Feature: Login
    This feature is about logging into a website using the implicit flow.

    Scenario: Get single with id 1
        When I log in
        Then I have an access token