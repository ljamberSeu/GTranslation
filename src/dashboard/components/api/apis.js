export const maxItems = 3000;
const defaultFirst = 3000;
export const maxAPICallTimes = Math.ceil(maxItems / defaultFirst);

const callFuctionWithErrorHandle = async (apiCallFunction) => {
  try {
    const result = await apiCallFunction();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getDataFromDB = async () => callFuctionWithErrorHandle(async () => {
  const endpoint = "/data-api/rest/Translation";
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.value;
});

export const getDataFromDBStatus = async ({
  status,
  startDate,
  project,
  locale,
  after,
  first = defaultFirst,
  onlyPrimary = false,
  filter = {}
}) => callFuctionWithErrorHandle(async () => {
  if (status !== null) {
    filter.status = `{ eq: ${status} }`;
  }
  if (startDate) {
    filter.timestamp = `{gt: "${startDate.$d.toISOString()}"}`;
  }
  if (project) {
    filter.project = `{eq: "${project}"}`;
  }
  if (locale) {
    filter.locale = `{eq: "${locale}"}`;
  }

  const queryConditions = {};
  queryConditions.filter = `{${Object.entries(filter).map(([key, value]) => `${key}: ${value}`).join(", ")}}`;
  queryConditions.first = first;
  if (after) queryConditions.after = `"${after}"`;

  const query = `
    {
      translations(${Object.entries(queryConditions).map(([key, value]) => `${key}: ${value}`).join(", ")})
      {
        items {
          ${onlyPrimary
    ? "id"
    : `id
          status
          timestamp
          original
          gptTranslation
          finalTranslation
          reviewer
          devComment
          stringOwner
          project
          locale
          lasted_update`}
        }
        hasNextPage
        endCursor
      }
    }`;

  const endpoint = "/data-api/graphql";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });
  const result = await response.json();
  return result?.data?.translations;
});

export const updateSingleTranslation = async (row) => callFuctionWithErrorHandle(async () => {
  const gql = `
    mutation update($id: String!, $locale: String!, $item: UpdateTranslationInput!) {
      updateTranslation(id: $id, locale: $locale, item: $item) {
        id
        locale
        status
        project
        original
        reviewer
        finalTranslation
        lasted_update
      }
    }`;
  const lastedUpdate = new Date(row.lasted_update);

  const query = {
    query: gql,
    variables: {
      id: row.id,
      locale: row.locale,
      item: {
        status: row.status,
        project: row.project,
        original: row.original,
        reviewer: row.reviewer,
        finalTranslation: row.finalTranslation,
        lasted_update: lastedUpdate.toISOString().slice(0, 19).replace("T", " ")
      }
    }
  };

  const endpoint = "/data-api/graphql";
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query)
  });

  const result = await res.json();
  return result?.data?.updateTranslation;
});
