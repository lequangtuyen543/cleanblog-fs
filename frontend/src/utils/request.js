const api_domain = "http://localhost:3002/";
// const api_domain = "https://project-final-6.onrender.com/";

export const GET = async (path) => {
  const response = await fetch(api_domain + path)
  const result = await response.json();
  return result;
}

export const POST = async (path, data) => {
  const response = await fetch(api_domain + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  return result;
}

export const DELETE = async (path) => {
  const response = await fetch(api_domain + path, {
    method: "DELETE"
  })
  const result = await response.json();
  return result;
}

export const PATCH = async (path, data) => {
  const response = await fetch(api_domain + path, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  return result;
}