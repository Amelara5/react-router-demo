import ky from "ky";
export default {
  indexThoughts() {
    return ky.get("http://localhost:3001/thoughts").json();
  },
};
