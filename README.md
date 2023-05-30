>npx create-next-app@latest --typescript
don't select src folder

> cleane page.tsx file
> changed font from Inter to Nunito in layout.tsx file

### ZUSTAND
>npm i zustand

state management tool like redux which uses hooks to manage state


### axios
>npm i axios

Promise based HTTP client for the browser and node.js

## React-hook form
>npm i react-hook-form

## Toast messages
>npm i react-hot-toast

## PRISMA
> npm i -D prisma

then run command

> npx prisma init

creates folder prisma in root
with file schema.prisma


also install prisma extension in vscode for code highlighting

# create schema

> npx prisma db push

will push the schema to the mongodb and create all empty collections

## Install packages

> npm install next-auth @prisma/client @next-auth/prisma-adapter

>npm i bcrypt

since bcrypt does not come with types

> npm i -D @types/bcrypt

## Github Login

1. login to github
2. go to settings
3. go to developer settings
4. click on oauth apps
5. create a new oauth app
6. in URL and callbackURL fields add http://localhost:3000/

## Google login
1. go to https://console.cloud.google.com/
2. select credentials from left hand top menu
3. select nextjs-insta-clone project
4. select OAuth2.0 
4. select client_id and client_secret and place in .env files


## to parse query string
> npm install query-string


## npm package for all countries of the world
> npm i world-countries

## select dropdown
> npm i react-select

## For map functionality
>npm i leaflet
>npm i -D @types/leaflet
>npm i react-leaflet

## image upload with cloudinary
>npm i next-cloudinary

1. create an account on https://cloudinary.com/
2. sign up for free
3. click on dashboard
4. copy your cloud name
5. set in .env file NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
6. get upload preset from settings-> uploads
7. in upload presets click on add_upload _preset
note: siginin mode should be unsigned

## format date function

> npm i date-fns

## date range
> npm i react-date-range

also install type definitions

>npm i -D @types/react-date-range


## Loader
>npm i react-spinners

## If you deploy an application using Prisma to Vercel, you may run into the following error message on deployment:

Within the scripts section of your project's package.json file, if there is not already a script named postinstall, add one and add prisma generate to that script:

{
  ...
  "scripts" {
    "postinstall": "prisma generate"
  }
  ...
}