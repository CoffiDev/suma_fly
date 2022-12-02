## Notes

At the start of the challenge, I was going fulfill the task as quickly as possible the
requirements of having the 3 CRUDs.

But as I was working on it, my focus shifted to building an architecture that 
could scale with different requirements. I'm aware that this sounds like an
early optimization.

My main reason to follow this route is that I have had so many instances where 
my focus is to make things work, but shortly after releasing them, I want to go
back and improve the code, but it is a situation that rarely happens.

So I felt more conformable during the test on working on a structure that can
work as a reference for me (and potentially your team 😉) than only bootstrapping
a generic CRUD.

## Architecture

For the technical challenge I focused on building a POC for the architecture of the Service.

### Stack

#### Fastify (https://www.fastify.io/)
I choose it for the application server because:
- It claims to be efficient and with low overhead
- It has a big community and ecosystem of plugins
- It has typescript support
- It is very flexible for testing
- It allows defining validations and serialization using `zod` (https://zod.dev/)
- It has support to run on serverless platforms (https://www.fastify.io/docs/latest/Guides/Serverless/)

### Prisma (https://www.prisma.io/)
I choose it to generate migrations and interact with the DB because:
- It provides an easy-to-update schema
- It provides an ORM out of the box, and my focus on this test was not on the `SQL`
- It has typescript support

I ended up regretting a little using prisma, because my goal was to have a "lightweight"
stack, and prisma is very opinionated and comes with a very rigid way of doing things.
But in the end is the fastest way to connect to a relational DB.


### Tap (https://node-tap.org/)
I choose it to write tests becasue:
- It has a small but powerful API
- It is lightweight and fast, which allowed me to develop test more easily

---

### File structure

There are two main directories:

`modules`: This is where the business logic of the application is located.

These modules define 4 main parts of the architecture:
#### 1 - Types of entities and data objects

A core set of types help us represent what data we expect to receive/send
to our consumers and services

#### 2 - Business logic flows

Here we define how we call our different services and when to emit different events.

This aims to provide an easier way to understand the operations that our business 
requires to provide value.

#### 3 - Interface for services
With the current requirements, we only need a storage service, but here we can define
other services that our application may need, like a service to send notifications,
to process payments, retrieve external information, etc.

This way, we can create `libs` that can fulfil these interfaces and allow our core 
business logic to be agnostic of the specific services we need to use.

#### 4 - Events emitted to consumers

Instead of relying on the `return` or `throw` of the function, we can define 
the different events that our business logic module expects the consumer to handle.
This allows us the modules to be agnostic of the protocols used to invoke it.

In our case, our consumer is the fastify server, so our server can define how 
to handle each event, like using different status codes and responses.


`libs`: This is where specific implementations of services and consumers are located

The most important modules are the `fastify server consumer` and the `prisma repo service`

They are how our application is implementing the required pieces to expose our business logic.

These modules have their own tests, because even if they are "implementation details",
is more likely that a lot of our work revolves around making these parts work as expected.

