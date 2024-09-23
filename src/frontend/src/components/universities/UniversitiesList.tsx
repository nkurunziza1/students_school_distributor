import UniverCard from "../ui/UniverCard";
import { universities } from "../../constants";
import React, { useEffect, useState } from "react";
const UniversitiesList = () => {
  const [db, setDb] = useState<any>({});
  const [universities, setUniversities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUniversities();
  }, []);

  const getUniversities = async () => {

    setIsLoading(true);
    const response = await fetch(
      `${(import.meta as any).env.VITE_CANISTER_ORIGIN}/universities`
    );
    const responseJson = await response.json();
    console.log("responseJson", responseJson);
    setIsLoading(false)
    setUniversities(responseJson);

  };

  console.log("app", `${(import.meta as any).env.VITE_CANISTER_ORIGIN}`);

  const updateDb = async () => {


    const response = await fetch(
      `${(import.meta as any).env.VITE_CANISTER_ORIGIN}/db/update`,
      {
        method: "POST",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify({
          hello: "world",
        }),
      }
    );
    const responseJson = await response.json();
    setIsLoading(false)
    setUniversities(responseJson);
  };
  return (
    <div>
      <h1 style={{ color: "red" }}>Universities</h1>

      <br />

      <div >
        {isLoading ? <p>Loading...</p> : null}
        {universities.map((university) => (
          <div key={university.id}>
            <h2 className="text-green-500">{university.name}</h2>
            <p>Location: {university.location}</p>
            <p>Programs: {university.programs.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>)
};

export default UniversitiesList;
