# jolimoi

## set up

## stacks

- Front: ReactJs Typescript Tailwind
- Back: NodeJs Express Typescript
- Test: Jest Supertest

## Front

Created with Vite, using Tailwind for design.

## Back

NodeJs API with express, typescript.

Folders:

- controllers: handle incoming HTTP, extract data from the request, call the appropriate service logic, and send back the response.
  
- middlewares: functions sit between the request and the response. Used to process, validate, or modify requests before they reach the controller.
- models: handle data access logic.
- routes: map HTTP endpoints to their corresponding controller functions
- services: contain the business logic of your application.
- utils: contains generic, reusable helper functions.
- app.ts: defines and configures the Express application instance
- server.ts: main entry point

### Tests
