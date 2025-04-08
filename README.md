# Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

## Environment Variables
The project requires a .env file to run, containing the following two variables:

- NUXT_API_KEY with the API key of the web application
- NUXT_API_BASE_URL with the URL of the API

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```
## Assets
- scss
    -main.scss: This file adds multiple utility CSS classes.
## Components
- Utils:
    - Footer
    - Navbar
    - Loader
    - ImgWithDefault: This component is responsible for checking if an image fails to load and replaces it with a default one.
- Media:
    - Card
    - Description: This component is used for movies and series, and it loads data by ID. It also stores the visited item in localStorage
    - Search: This component is used for movies and series. It includes a field where you can type what you want to search for, and it returns a grid with results. It also allows you to load more results with a "Load More" button.
- Contact:
    - Form

## Pages
- index
- contact
- movies
    - index
    - id
- series:
    - index
    - id

## Api
- server/api/getByID: It returns the information of a movie or series by ID.
- server/api/search: It returns the results from the API based on a search term and type.

## Local Storage Functionality
The local storage functionality is located in the Media/description.vue component. This component saves the most recently viewed items in localStorage under the key 'last-media-look', storing up to 10 items. If there are more than 10, the oldest item is removed. If an item is visited more than once, a viewed field inside the object in localStorage is updated and increments the visit count by 1.