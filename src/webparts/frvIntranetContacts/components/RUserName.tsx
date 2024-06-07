import * as React from "react";

interface Props {
    username: string | undefined;
    nametitle: string;
  }
  
  const UserName = ({ username, nametitle }: Props): JSX.Element => {
    if (username !== null) {
      return (
        <span>
          {username}
        </span>
      );
    } else {
      return (
        <span>
          {nametitle}
        </span>
      );
    }
  };
  
  export default UserName;