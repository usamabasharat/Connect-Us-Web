const GetData = (route) => fetch(`${process.env.REACT_APP_BASEURL}${route}`);

export default GetData;
