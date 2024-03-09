# Build an LMS Platform: Next.js 13,  React, Stripe, Mux, Prisma, Tailwind, MySQL | Full Course 2023

![Copy of Copy of Copy of Copy of Fullstack Twitter Clone (9)](https://github.com/AntonioErdeljac/next13-lms-platform/assets/23248726/fa077fca-bb74-419a-84de-54ac103bb026)


This is a repository for Build an LMS Platform: Next.js 13,  React, Stripe, Mux, Prisma, Tailwind, MySQL | Full Course 2023

[VIDEO TUTORIAL](https://www.youtube.com/watch?v=Big_aFLmekI)

Key Features:

- Browse & Filter Courses
- Purchase Courses using Stripe
- Mark Chapters as Completed or Uncompleted
- Progress Calculation of each Course
- Student Dashboard
- Teacher mode
- Create new Courses
- Create new Chapters
- Easily reorder chapter position with drag n’ drop
- Upload thumbnails, attachments and videos using UploadThing
- Video processing using Mux
- HLS Video player using Mux
- Rich text editor for chapter description
- Authentication using Clerk
- ORM using Prisma
- MySQL database using Planetscale

### Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/AntonioErdeljac/next13-lms-platform.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c3RhYmxlLWZsb3VuZGVyLTc1LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_BdGUdsminl8gtt8GZa73haVcjWPYDn7D5vJRNioyqI
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/sign-in
NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/sign-in

DATABASE_URL=mongodb+srv://SUSTOpenCourseWare:3wiMPLehcE8SC7Iy@sustopencoursewaredb.ft37yqf.mongodb.net/SUSTOpenCourseWareDB

UPLOADTHING_SECRET=sk_live_37a2165da187f6510d6ee496b9f15dd2e36278ea0784561b94f1ddbf8325f665
UPLOADTHING_APP_ID=st4b1ibitq

MUX_TOKEN_ID=9203af8d-93fb-4c7b-9186-a7db2bee8fe5
MUX_TOKEN_SECRET=wX0wKKsb94z5x9KM9FAQrADPVTF0DqJ/sISsfgZZ+w4zEqHmY5/bicUOigSfjVT4NPEIknXfRzg

STRIPE_API_KEY=sk_test_51Os2yFSHilnUfNJQoptOdhysSHmug3Pu5wwRA1aM4A6vjelqEgPbzGQr2mwNv1auMBK3C3NIHVFnytfI7Jws61d2003Qy3M0pu
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_WEBHOOK_SECRET=whsec_2569db505e54a80d6a0c357eecefdbbf0e26f2222ac15db9adfd989ac3862960

NEXT_PUBLIC_TEACHER_ID=user_2dPEC5KmxzXdPPuJDly08bMhoGB
```

### Setup Prisma

Add MySQL Database (I used PlanetScale)

```shell
npx prisma generate
npx prisma db push

```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
