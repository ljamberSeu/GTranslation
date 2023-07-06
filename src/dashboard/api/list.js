
export async function getDataFromDB() {
  const query = `
      {
        translations {
          pending_translation {
            id,
            original,
            gptTranslation,
            devComment,
            stringOwner,
            reviewer,
            finalTranslation,
            status,
          }
        }
      }`;

  const endpoint = "/data-api/graphql";
  const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query })
  });
  const result = await response.json();
  console.table(result.data.people.items);
  return result.data.people.items;
};
