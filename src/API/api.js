export const GetData = async (route) => {
  const response = await fetch(`${process.env.REACT_APP_BASEURL}${route}`);
  const data = await response.json();
  return data;
};

export const GetDataByEmail = (route, email) => fetch(`${process.env.REACT_APP_BASEURL}${route}/${email}`);
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
