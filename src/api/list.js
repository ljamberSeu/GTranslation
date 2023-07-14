export const maxItems = 3000;
const first = 3000;
export const maxAPICallTimes = Math.ceil(maxItems/first);

const callFuctionWithErrorHandle = async (apiCallFunction) => {
  try {
    return await apiCallFunction();
  } catch (error) {
    console.log(error);
  }
};

export const getDataFromDB = async () => callFuctionWithErrorHandle(async () => {
  let endpoint = '/data-api/rest/Translation';
  let response = await fetch(endpoint);
  let data = await response.json();
  return data.value;
});

export const getDataFromDBStatus = async ({
  status,
  startDate,
  project,
  locale,
  after,
}) => callFuctionWithErrorHandle(async () => {
  const filter = {};
  if (status !== null) {
    filter['status'] = `{ eq: ${status} }`;
  }
  if (startDate) {
    filter['timestamp'] = `{gt: "${startDate.$d.toISOString()}"}`;
  }
  if (project) {
    filter['project'] = `{eq: "${project}"}`;
  }
  if (locale) {
    filter['locale'] = `{eq: "${locale}"}`;
  }

  const queryConditions = {};
  queryConditions['filter'] = `{${Object.entries(filter).map(([key, value]) => `${key}: ${value}`).join(', ')}}`;
  queryConditions['first'] = first;
  if (after) queryConditions['after'] = `"${after}"`;

  const query = `
    {
      translations(${Object.entries(queryConditions).map(([key, value]) => `${key}: ${value}`).join(', ')})
      {
        items {
          id
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
        }
        hasNextPage
        endCursor
      }
    }`;

  const endpoint = "/data-api/graphql";
  const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query })
  });
  const result = await response.json();
  return result.data.translations;
});

export const updateSingleTranslation = async (row) => callFuctionWithErrorHandle(async () => {
  const gql = `
    mutation update($id: String!, $locale: String!, $item: UpdateTranslationInput!) {
      updateTranslation(id: $id, locale: $locale, item: $item) {
        id
        status
        locale
        project
        original
        timestamp
        reviewer
        finalTranslation
      }
    }`;

  const query = {
    query: gql,
    variables: {
      id: row.id,
      locale: row.locale,
      item: {
        status: row.status,
        project: row.project,
        original: row.original,
        timestamp: row.timestamp,
        reviewer: row.reviewer,
        finalTranslation: row.finalTranslation,
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
  return result.updateTranslation;
});