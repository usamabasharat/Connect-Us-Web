export const GetData = (route) => fetch(`${process.env.REACT_APP_BASEURL}${route}`);

export const PostData = (route, values) => fetch(
  `${process.env.REACT_APP_SERVER_BASE_URL}${route}`,
  {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  }
);

export const PutData = (route, values) => fetch(
  `${process.env.REACT_APP_SERVER_BASE_URL}${route}`,
  {
    method: 'PUT',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  }
);
