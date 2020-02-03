import * as React from "react";
import { NextPage } from "next";
import { connect } from "react-redux";
import Counter from "../components/Counter/Counter";
import { loadData } from "../store/placeholder/Placeholder.store";
import { increase, increaseBy } from "../store/counter/counter.store";
import { firebaseCloudMessaging } from "../../utils/webPush";

import Placeholder from "../components/Placeholder/Placeholder";
import withApollo from "../lib/withApollo";
import UserList from "../components/UserList/UserList";
interface StateProps {
  data?: any;
}

interface DispatchProps {
  loadData: () => void;
  increase: () => void;
}

type Props = StateProps & DispatchProps;

const IndexPage: NextPage<Props> = ({ data, loadData, increase }) => {
  React.useEffect(() => {
    increase();
    firebaseCloudMessaging.init();

    return () => {};
  }, []);
  return (
    <div>
      <Counter />
    </div>
  );
};

export default withApollo(
  connect(
    ({ placeholder }: { placeholder: any }) => ({
      data: placeholder.data
    }),
    {
      loadData,
      increase
    }
  )(IndexPage)
);
