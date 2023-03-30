// const GetData = (route) => fetch(`${process.env.REACT_APP_BASEURL}${route}`);

const PostData = (route, userData) => fetch(`${process.env.REACT_APP_BASEURL}${route}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(userData),
});

export default PostData;
