# monetary-transactions-manager
API to manage users monetary accounts and transactions between them.

# Running the app
`npm i`

`npm run start`

# Technologies used
- **NodeJS**
- **ExpressJS** as framework
- **Axios** to make HTTP requests
- **Typescript** as language
- **Sequelize** as ORM
- **PostgreSQL** as relational database
- **AWS** for database hosting
- **Fixer API** for exchange rate data

# Future potential improvements
- _Caching system for Fixer API calls._ These API calls have a cost, and as such, implementing a cache can significantly reduce the amount of times the API is called. This cache could be implemented session-wise or user-wise. Another option could be to run a scheduled job, say, daily, that would fetch the exchange rates, and keep the information in the system for use until the job runs again. This would severely reduce the number of calls performed to the API, at the expense of less accurate exchange rate data.

- Split the logic for the `transfer` function in `transaction.service.ts` into the corresponding services.

- Implement User identification and restrict operations over entities to its respective owners

- Add additional interfaces and typings

- Set up CI/CD through GitHub Actions and deployment in AWS

- Add testing