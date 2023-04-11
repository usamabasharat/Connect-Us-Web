export const GetData = async (route) => {
  const response = await fetch(`${process.env.REACT_APP_BASEURL}${route}`);
  if (response) {
    const data = await response.json();
    return data;
  }
  return null;
};
export const GetDataByID = (route, id) => fetch(`${process.env.REACT_APP_BASEURL}${route}/${id}`);
export const GetDataByEmail = (route, email) => fetch(`${process.env.REACT_APP_BASEURL}${route}/${email}`);
export const GetDataByType = (route, type) => fetch(`${process.env.REACT_APP_BASEURL}${route}/${type}`);

export const PostData = (route, values) => fetch(
  `${process.env.REACT_APP_BASEURL}${route}`,
  {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  }
);

export const LoginUser = (route, values) => fetch(
  `${process.env.REACT_APP_BASEURL}${route}`,
  {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  }
);
export const ForgotPasswordApi = (route, values) => fetch(
  `${process.env.REACT_APP_BASEURL}${route}`,
  {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  }
);

export const PutData = (route, values) => fetch(
  `${process.env.REACT_APP_BASEURL}${route}`,
  {
    method: 'PUT',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  }
);
