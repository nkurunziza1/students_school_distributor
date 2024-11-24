# AI-Driven student distributor

- [Installation](#installation)
- [Deployment](#deployment)
- [Manually Test](#test)

AI and Blockchain Powered Student-School Allocation System, is an innovative Ed-Tech solution designed to match students to schools based on their grades, preferences, and available school capacity. By leveraging cutting-edge AI, it ensures fair and efficient placements, while also considering the status of each school. The system fills schools optimally without overcrowding and adjusts in real-time as new data comes in.

To enhance trust and transparency, this Ed-Tech system integrates blockchain technology. Every decision in the student placement process is securely recorded and cannot be altered, offering a clear and reliable way for students, parents, and schools to understand how decisions are made, ensuring fairness for everyone involved.

## Installation

## Requirements

```bash
dfx Version: 0.23.0
```

## Get started and installation

Clone the [students_school_distributor](https://github.com/nkurunziza1/students_school_distributor/) repository:

1. Clone the repository:

```bash
git clone https://github.com/nkurunziza1/students_school_distributor/
cd students_school_distributor
npm install

```

2. Start server

In a root terminal `students_school_distributor` directory:

```bash
dfx start --clean --host 127.0.0.1:8000
```

Open another terminal in the `students_school_distributor` directory:

```bash
cd src/frontend
Create env file  `touch .env`
npm install
run ./deploy-local-identity.sh
add openai api key
VITE_OPENAI_API_KEY=KsOdw0sxTnTchrOfPLtHH3MAzAp0E4opUSl48Phl
```

Now You have finished to generate the internet identity canister. Check it in the env file

Check If you have all environment variables

```bash
.Env
VITE_IDENTITY_CANISTER_ID=bd3sg-teaaa-aaaaa-qaaba-cai
VITE_OPENAI_API_KEY=KsOdw0sxTnTchrOfPLtHH3MAzAp0E4opUSl48Phl
```

## Deployment

In a separate terminal in the `students_school_distributor` directory:

```bash
dfx deploy
```

View your frontend in a web browser at `http://[canisterId].localhost:8000`.



## Test

What we are going to do here is test the functionalities of our application. First, we will create student and school data, and then we will distribute students to schools, assisted by our AI.

## Manually Testing of Functionalities

### `1.Login with internet Identity`

### 2. Navigate to the `Dashboard page`

### 3. Navigate to `student`

Create students for purpose of having student data to be distributed.

### 4. Navigate to `school`

Create school for purpose of having school data.

### 5. Navigate to `distribution page `

`Click` on `distributing students` where our AI distribute students to the schools based on the marks, preference, available slots to given school.

`Click ` on `Save Distribution` for saving data to our database

### 6. Navigate to `Home`

`Click` on View result.Then search student distribution according the registration number and level
