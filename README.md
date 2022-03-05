# Interview Scheduler

The Interview Scheduler is a single-page application, created using React. A user can book an interview with an interviewer of their choice. They can also edit and cancel exisiting appointments.

# Previews

!["Screenshot of the main page"](https://github.com/vvynz/scheduler/blob/master/docs/scheduler_main.png)
!["Screenshot of the saving message"](https://github.com/vvynz/scheduler/blob/master/docs/scheduler_saving.png)
!["Screenshot of the confirm delete message"](https://github.com/vvynz/scheduler/blob/master/docs/scheduler_confirm.png)

## Dependencies

- axios
- React
- @testing-library/react-hooks
- react-test-renderer
- classnames

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running API server

For full functionality, the app and the API server must run simultaneously. To install and setup the database server be sure to follow the README.md from [scheduler-api](https://github.com/lighthouse-labs/scheduler-api).
