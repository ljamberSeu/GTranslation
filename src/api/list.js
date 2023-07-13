
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
  const endpoint = `/data-api/rest/Translation`;
  const urlExtend = [];
  if (status !== null) {
    urlExtend.push(`status eq ${status}`);
  }
  if (startDate) {
    urlExtend.push(`timestamp ge ${startDate.$d.toISOString()}`);
  }
  if (project) {
    urlExtend.push(`project eq ${project}`);
  }
  if (locale) {
    urlExtend.push(`locale eq ${locale}`);
  }
  const response = await fetch(`${endpoint}?$filter=${urlExtend?.join(' and ')}${ after ? `&$after=${after}` : '' }`);
  const result = await response.json();
  return result;
});

export const updateSingleTranslation = async (row) => callFuctionWithErrorHandle(async () => {
  const id = row.id;
  const data = { ...row };
  delete data.id;

  const endpoint = '/data-api/rest/Translation/id';
  const response = await fetch(`${endpoint}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  return result.value;
});

export async function createDate() {
  const data = {
    id: "addressWithCategoryText2",
    reviewer: "danluo@nvidia.com",
    devComment: "text for risk address warning in send transaction on drawer. $1 stands for category, sample: It is webfishing address",
    gptTranslation: "这是 $1 地址。",
    original: "It's $1 address.",
    status: 0,
    stringOwner: "jili10@microsoft",
  };

  const endpoint = `/data-api/rest/Translation/`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  console.table(result.value);
}
