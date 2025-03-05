<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/pkrucz00/graphql-practice">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Property GraphQL Server</h3>

  <p align="center">
    A small Graphql backend service for querying and mutating properties in US
    <br />
    <br />
    <a href="https://graphql-practice-e886.onrender.com">View Demo</a>
    &middot;
    <a href="https://github.com/pkrucz00/graphql-practice/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/pkrucz00/graphql-practice/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Screenshot of GraphQL Yoga Explorer][product-screenshot]](https://graphql-practice-e886.onrender.com/)

Property GraphQL Server is a backend service designed to manage and query property data in the US using GraphQL. This project leverages modern technologies such as Prisma for database management, Postgres for data storage, GraphQL Yoga for creating the GraphQL server, and Pothos for building the GraphQL schema. It also includes testing with Vitest and HTTP requests with Axios. The server is deployed using Railway and Render, ensuring a robust and scalable deployment process.

The main features of this project include querying property details, mutating property data, and providing a seamless API for property management. Moreover, it queries the weather in the location of the property on its creation.

The project is designed to be easily extendable and maintainable, making it a great starting point for anyone looking to build a GraphQL-based backend service.

Feel free to explore the demo, report any bugs, or request new features to help improve the project.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- ⟁ [Prisma](prisma.io)
- 🐘 [Postgres](https://www.postgresql.org/)
- 🧘 [Graphql Yoga](https://the-guild.dev/graphql/yoga-server)
- 🌱 [Pothos](https://pothos-graphql.dev/)
- ✅ [Vitest](https://vitest.dev/)
- 𝓐 [Axios](https://axios-http.com/docs/intro)
- 🧶 [Yarn v4](https://yarnpkg.com/blog/release/4.0)

### Deployed with

- 🚄 [Railway](https://railway.com/)
- 🔳 [Render](https://render.com/)

### Dev helpers

- ✍️ [EsLint](https://eslint.org/docs/latest/use/getting-started)
- ✨ [Prettier](https://prettier.io/)
- 🐶 [Husky](https://typicode.github.io/husky/get-started.html)
- 🙅💩 [lint-staged](https://github.com/lint-staged/lint-staged)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

For a TL;DR usage of this service you can see the GraphQL Explorer available on Render [here](https://graphql-practice-e886.onrender.com/).

If you rather use it yourself, follow the below instructions.

### Prerequisites

The service calls so get and prepare your access key.

```js
API_KEY = "YOUR API";
```

This is an example of how to list things you need to use the software and how to install them.

- yarn
  ```sh
  corepack enable
  ```

### Installation

1. Get a free API Key at [Weatherstack API ](https://weatherstack.com/quickstart)
2. Clone the repo
   ```sh
   git clone https://github.com/pkrucz00/graphql-practice.git
   ```
3. Install yarn packages
   ```sh
   yarn install
   ```
4. Create your `.env` file in the root folder, based on `.env.example`

   ```bash
   export WEATHER_API_KEY = ...
   export DATABASE_URL = ...
   ```

5. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin /graphql-practice
   git remote -v # confirm the changes
   ```
6. To host your own database, either use the `docker-compose.yml` file or create your own and set env variables accordingly
   ```sh
   docker compose up -d
   ```
7. Migrate and seed your database:

   ```sh
   prisma db push
   prisma db seed
   ```

8. Build and run the project locally
   ```sh
     yarn run build
     yarn run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Example query:

```graphql
query AllProperties {
  properties {
    city
    coordinates {
      id
      latitude
      longitude
    }
    createdAt
    id
    state
    street
    zip
    weatherData {
      cloudcover
      feelslike
      humidity
      id
      observationTime
      precip
      pressure
      temperature
      uvIndex
      visibility
      weatherCode
      windDegree
      weatherDescriptions
      windDir
      windSpeed
    }
  }
```

Example mutation:

```graphql
mutation addSmallProperty($property: PropertyInput!) {
  createProperty(property: $property) {
    id
    city
    state
    zip
    coordinates {
      latitude
      longitude
    }
    weatherData {
      observationTime
      windDir
    }
    createdAt
  }
}

Variables:
{
  "property": {
    "city": "Camdenton",
    "state": "MO",
    "street": "176 Hickory St",
    "zip": "65020"
  }
}
```

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Property CRUD
  - [x] Querying properties
    - [x] sorting by creation date
    - [x] filtering by city, zip code, state
  - [x] Querying one property
  - [x] Creating property (with a call to Weatherstack API -- prease use wisely as I have only 100 calls per month 🙏)
  - [x] Deleting property
  - [ ] Zip code validation
  - [ ] Better error handling
- Testability
  - [x] Unit tests
  - [x] Integration tests
  - [x] CI/CD using GH Actions
  - [ ] Contract testing
- Deployability
  - [x] Postgres image
  - [x] Railway database connection
  - [x] Render deploy
  - [ ] Dockerize service
  - [ ] Docker compose with profiles
  - [ ] Prisma Pulse

See the [open issues](https://github.com/pkrucz00/graphql-practice/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/pkrucz00/graphql-practice/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=pkrucz00/graphql-practice" alt="contrib.rocks image" />
</a>

<!-- LICENSE -->

## License

Distributed under the MIT. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Paweł Kruczkiewicz - [@pkrucz](https://www.linkedin.com/in/pkrucz/) - pawel.kruczkiewicz@gmail.com

Project Link: [https://github.com/pkrucz00/graphql-practice](https://github.com/pkrucz00/graphql-practice)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[stars-shield]: https://img.shields.io/github/stars/pkrucz00/graphql-practice.svg?style=for-the-badge
[stars-url]: https://github.com/pkrucz00/graphql-practice/stargazers
[issues-shield]: https://img.shields.io/github/issues/pkrucz00/graphql-practice.svg?style=for-the-badge
[issues-url]: https://github.com/pkrucz00/graphql-practice/issues
[license-shield]: https://img.shields.io/github/license/pkrucz00/graphql-practice.svg?style=for-the-badge
[license-url]: https://github.com/pkrucz00/graphql-practice/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/pkrucz
[product-screenshot]: images/screenshot.png
