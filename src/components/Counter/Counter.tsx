import * as React from "react";
import { connect } from "react-redux";
import {
  increase,
  decrease,
  increaseBy
} from "../../store/counter/counter.store";

interface StateProps {
  number: number;
}

interface DispatchProps {
  increase: () => void;
  decrease: () => void;
  increaseBy: (number: number) => void;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

const Counter: React.FC<Props> = ({
  number,
  increase,
  decrease,
  increaseBy
}) => {
  return (
    <div>
      <span>number:{number}</span>
      <button onClick={() => increase()}>+1</button>
      <button onClick={() => decrease()}>-1</button>
      <button onClick={() => increaseBy(5)} className="five-button">
        +5
      </button>
    </div>
  );
};

export default React.memo(
  connect(
    ({ counter }: { counter: any }) => ({
      number: counter.number
    }),
    {
      increase,
      decrease,
      increaseBy
    }
  )(Counter)
);
