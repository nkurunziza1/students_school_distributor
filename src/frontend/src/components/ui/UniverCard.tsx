// import React from "react";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import React from "react";
import { Universities } from "../../types/types";

const UniverCard: React.FC<Universities> = ({
  name,
  departments,
  description,
  establishedYear,
  location,
}) => {
  return (
    // <Card
    //   className="shadow-md border border-gray-200 rounded-lg"
    // >
    //   <CardContent className="p-5">
    //     {/* University Name */}
    //     <h1
    //       className="font-bold text-xl text-gray-900 mb-3"
    //     >
    //       {name || "University Name"}
    //     </h1>

    //     {/* Description */}
    //     <h3 className="text-gray-700 mb-3">
    //       {description || "No description available."}
    //     </h3>

    //     {/* Established Year */}
    //     {establishedYear && (
    //       <p className="text-gray-500 mb-1">
    //         Established: {establishedYear}
    //       </p>
    //     )}

    //     {/* Location */}
    //     {location && (
    //       <p className="text-gray-500 mb-3">
    //         Location: {location}
    //       </p>
    //     )}

    //     {/* Departments */}
    //     {departments && departments.length > 0 && (
    //       <p className="text-gray-800">
    //         Departments: {departments.length}
    //         <ul className="list-disc list-inside pl-2">
    //           {departments.map((dept, index) => (
    //             <>
    //               <li key={index} className="text-gray-600">
    //                 {dept.name}
    //               </li>
    //             </>
    //           ))}
    //         </ul>
    //       </p>
    //     )}
    //   </CardContent>

    //   {/* Action Button */}
    //   <CardActions className="px-5">
    //     <Button size="small" className="text-blue-600 hover:text-blue-800">
    //       Learn More
    //     </Button>
    //   </CardActions>
    // </Card>
    <div></div>
  );
};

export default UniverCard;
