import * as React from "react";

interface Props {
    usertitle: string | undefined;
    nametitle: string;
  }
  
  const UserTitle = ({ usertitle, nametitle }: Props): JSX.Element => {
    if (usertitle !== null) {
      return (
        <span>
          {usertitle}
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
  
  export default UserTitle;