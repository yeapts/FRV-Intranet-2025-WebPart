import * as React from "react";

interface Props {
    usermobile: string | undefined;
    namemobile: string;
  }
  
  const UserMobile = ({ usermobile, namemobile }: Props): JSX.Element => {
    if (usermobile !== null) {
      return (
        <span>
          {usermobile}
        </span>
      );
    } else {
      return (
        <span>
          {namemobile}
        </span>
      );
    }
  };
  
  export default UserMobile;