import { Button } from 'antd';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  selectCount,
} from '../redux/reducers/counterSlice';

function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <>
      <Button onClick={() => dispatch(increment())}> + </Button>
      <span>{count}</span>
      <Button onClick={() => dispatch(decrement())}> - </Button>
    </>
  );
}

export default Counter;
