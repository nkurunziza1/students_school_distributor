import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
// import Button from "@mui/material/Button";


const userProfile = {
  name: "John Doe",
  bio: "A passionate student of technology and science.",
  email: "johndoe@email.com",
  phone: "123-456-7890",
  location: "San Francisco, CA",
  profilePic:
    "https://via.placeholder.com/150",
  university: "Stanford University",
  department: "Computer Science",
};

const ProfileTemplate: React.FC = () => {
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

          <div>
              {isLoading ? <p>Loading...</p> : null}
              {universities.map((university) => (
                  <div key={university.id}>
                      <h2>{university.name}</h2>
                      <p>Location: {university.location}</p>
                      <p>Programs: {university.programs.join(", ")}</p>
                  </div>
              ))}
          </div>
      </div>
  );
  
};

export default ProfileTemplate;
