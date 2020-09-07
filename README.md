# Makersbnb

## MakersBnB specification

We would like a web application that allows users to list spaces they have available, and to hire spaces for the night.

Headline specifications
```
As a User
I would like to be able to sign up for an account.

As a User
I would like to be able to sign into my account.

As a non-signed-in User
I would like to be able to see available spaces.

As a signed-in User
I want to be able to list a space.

As a User 
I want to be able to list multiple spaces.

As a User 
I want to be able to add details to my space(name, description, ppn).

As a User
I want to be able to select a range of dates where my space is available.

As a signed-up User
I want to be able to reserve a space for one night. 

As a User
I want to be able to approve or deny reservations for my spaces.

As a User
I dont want to be able to book spaces that are not available.

As a User
I want to be able to book spaces that have unconfirmed reservations.

Nice-to-haves

Users should receive an email whenever one of the following happens:
They sign up
They create a space
They update a space
Able to save a list of favourites
A user requests to book their space
They confirm a request
They request to book a space
Their request to book a space is confirmed
Their request to book a space is denied
Users should receive a text message to a provided number whenever one of the following happens:
A user requests to book their space
Their request to book a space is confirmed
Their request to book a space is denied
A ‘chat’ functionality once a space has been booked, allowing users whose space-booking request has been confirmed to chat with the user that owns that space
Be able to search available spaces by tags.
Basic payment implementation though Stripe.
```

## Database Setup

1. Use homebrew to install mongodb
   ```
   brew tap mongodb/brew
   brew install mongodb-community@4.4
   brew services start mongodb-community@4.4
   ```

2. Connect to Mongo shell
   ```
   mongo
   ```

3. Create BanditBnB Database and switch into it
   ```
   use BanditBnB
   ```

4. Create collections for users and properties
   ```
   createCollection("users")
   createCollection("properties")
   ```

## Test Database Setup

1. Connect to Mongo shell
  ```
  mongo
  ```

2. Create Test BanditBnB Database and switch into it
  ```
  use BanditBnB_test
  ```

3. Create collections for users and properties
  ```
  createCollection("users")
  createCollection("properties")
  ```