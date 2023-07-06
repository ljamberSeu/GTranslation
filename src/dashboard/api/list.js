
export async function getDataFromDB() {
  const query = `
      {
        people {
          items {
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

  const endpoint = "/data-api/graphql/Person";
  const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json","X-MS-API-ROLE": "admin" },
      body: JSON.stringify({ query: query })
  });
  const result = await response.json();
  console.table(result?.data);
};
