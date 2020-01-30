import * as React from "react";
import { connect } from "react-redux";
import { loadData } from "../../store/placeholder/Placeholder.saga";

interface StateProps {
  data?: any;
  error?: any;
}

type Props = StateProps;

const Placeholder: React.FC<Props> = ({ data, error }) => {
  return (
    <div>
      <h1>
        JSON:
        {!!data && (
          <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        )}
      </h1>
    </div>
  );
};

export default connect(({ placeholder }: { placeholder: any }) => ({
  error: placeholder.error
}))(Placeholder);
