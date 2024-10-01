# AI-Driven student distributor

- [Installation](#installation)
- [Deployment](#deployment)
- [Manually Test](#test)

AI and Blockchain Powered Student-School Allocation System, is an innovative Ed-Tech solution designed to match students to schools based on their grades, preferences, and available school capacity. By leveraging cutting-edge AI, it ensures fair and efficient placements, while also considering the status of each school. The system fills schools optimally without overcrowding and adjusts in real-time as new data comes in.

To enhance trust and transparency, this Ed-Tech system integrates blockchain technology. Every decision in the student placement process is securely recorded and cannot be altered, offering a clear and reliable way for students, parents, and schools to understand how decisions are made, ensuring fairness for everyone involved.

## Installation

```bash
git clone <repo>

npm install

```

```bash
cd src/frontend

npm install

run ./deploy-local-identity.sh
```

## Deployment

In a root terminal `students_school_distributor` directory:

```bash
dfx start --clean --host 127.0.0.1:8000
```

In a separate terminal in the `students_school_distributor` directory:

```bash
dfx deploy
```

Check If you have all environment variables

```bash
.Env
VITE_IDENTITY_CANISTER_ID=bd3sg-teaaa-aaaaa-qaaba-cai
VITE_OPENAI_API_KEY=KsOdw0sxTnTchrOfPLtHH3MAzAp0E4opUSl48Phl
```

View your frontend in a web browser at `http://[canisterId].localhost:8000`.

To obtain your application's [canisterId]:

```bash
dfx canister id backend
```

## Manually Test

### `Login with internet Identity`

### Navigate to the `Dashboard page`

### Navigate to `student`

Create students for purpose of having student data to be distributed.

### Navigate to `school`

Create school for purpose of having school data.

### Navigate to `distribution page `

`Click` on `distributing students` where our AI distribute students to the schools based on the marks, preference, available slots to given school.

`Click ` on `Save Distribution` for saving data to our database

### Navigate to `Home`

`Click` on View result.Then search student distribution according the registration number and level
