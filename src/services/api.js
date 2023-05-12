import ky from "ky";
export default {
  indexThoughts() {
    return ky.get("http://localhost:3001/thoughts").json();
  },

  async showThoughts(author) {
    const allThoughts = await this.indexThoughts();
    const thoughts4Author = allThoughts.filter(
      (thought) => thought.author === author
    );

    if (!thoughts4Author.length) {
      throw new Error("No thoughts found");
    }

    return thoughts4Author;
  },
};
