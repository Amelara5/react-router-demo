import { defer } from "react-router-dom";
import apiService from "../services/api";

//  Destructure the "params" object from the request object ('params.author')
export const loadThoughts = ({ params }) => {
  const { author } = params;
  const thoughts = author
    ? apiService.showThoughts(author)
    : apiService.indexThoughts();

  return defer({ thoughts });
};
