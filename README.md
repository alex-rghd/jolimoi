# jolimoi

## set up

```bash
git clone git@github.com:alex-rghd/jolimoi.git
```

```bash
cd back
npm install
npm run build
npm run start
```

New terminal

```bash
cd front
npm install
npm run build
npm run start
```

### Test
```bash
npm run test
```

## step 1 = main branch

- On [localhost](http://localhost:4173/)
  - if number between 1 and 100 -> return and display Roman number.
  - if number > 100 return and display error message.

## step 2 = sse branch

- On localhost:
  - if number between 1 and 100, create a SSE connection and server sent "Converting ...", and 1 second later receive and display the roman number. I added the 1 second delay to show that there is a server -> front connection.
  - if number > 100 return and display error message. No SSE connection created.

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
