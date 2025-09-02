# Jolimoi

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

(need new npm install and npm build)

- On [localhost](http://localhost:4173/):
  - if number between 1 and 100 -> An SSE connection is established. The server first sends "Converting ...", and after a 1-second delay, it sends the final Roman numeral. This delay demonstrates the real-time communication from the server to the frontend.
  - if number > 100 return and display error message. No SSE connection created.

## stacks

- Front: ReactJs Typescript Tailwind
- Back: NodeJs Express Typescript
- Test: Jest Supertest

## Front

Created with Vite, Typescript, Tailwind for design.

## Back

NodeJs API with express, typescript.

Folders:

- controllers: handle incoming HTTP, extract data from the request, call the appropriate service logic, and send back the response.
- middlewares: functions sit between the request and the response. Used to process, validate, or modify requests before they reach the controller.
- models: handle data access logic.
- routes: map HTTP endpoints to their corresponding controller functions
- services: contain the business logic of the application.
- utils: contains generic, reusable helper functions.
- app.ts: defines and configures the Express application instance
- server.ts: main entry point

### Tests

- Jest: Verify that services and controllers behave correctly.
  
- Supertest: Simulate real HTTP requests to the Express endpoints.

### Go Further

- Set up GitHub Actions for continuous integration and testing.
- Implement proper error handling with logging and monitoring.
- Improve the frontend design for a better user experience.
- If heavy computations are involved, consider implementing caching to avoid redundant calculations
