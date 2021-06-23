import { Button } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import React from "react";

const MySnackbarProvider = ({ children }: { children: any }) => {
  const notistackRef = React.createRef() as any;
  const onClickDismiss = (key: any) => () => {
    notistackRef.current.closeSnackbar(key);
  };
  return (
    <SnackbarProvider
      maxSnack={4}
      preventDuplicate
      ref={notistackRef}
      action={(key) => (
        <Button onClick={onClickDismiss(key)} style={{ color: "#FFF" }}>
          关闭
        </Button>
      )}
    >
      {children}
    </SnackbarProvider>
  );
};

export default MySnackbarProvider;
