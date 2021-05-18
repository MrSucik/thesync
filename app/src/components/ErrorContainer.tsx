import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Icon,
  Typography,
} from "@material-ui/core";
import React from "react";
import { firestore } from "../utils/fire";

const defaultTimeout = 15;

export default class ErrorContainer extends React.Component<
  {},
  { hasError: boolean; errorInfo: any; timeout: number }
> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false, errorInfo: null, timeout: defaultTimeout };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, errorInfo: error, timeout: defaultTimeout };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
    firestore.collection("logs").add({
      error: JSON.stringify({ error, errorInfo }),
      location: window.location.pathname,
    });
    const interval = setInterval(() => {
      if (this.state.timeout < 1) {
        window.location.reload();
        clearInterval(interval);
      } else {
        this.setState({ timeout: this.state.timeout - 1 });
      }
    }, 1000);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          style={{
            background: "url('./error-background-blurry.jpg')",
            height: "100vh",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            variant="outlined"
            style={{ minWidth: 250, maxWidth: 500, background: "#7a2b2b" }}
          >
            <CardHeader title="Nastala chyba" />
            <Divider />
            <CardContent>
              <Typography variant="body1">
                Tato chyba se automaticky zaznamenala do našeho systému a
                vyřešíme ji co nejdříve to bude možné. Zatím můžete zkusit akci
                opakovat. <br /> Stack: {this.state.errorInfo.toString()}
              </Typography>
            </CardContent>
            <CardActions style={{ flexDirection: "row-reverse" }}>
              <Button
                startIcon={<Icon>reload</Icon>}
                style={{ textTransform: "none" }}
              >
                OBNOVIT STRÁNKU (AUTOMATICKY ZA {this.state.timeout}s)
              </Button>
            </CardActions>
          </Card>
        </Box>
      );
    }

    return this.props.children;
  }
}
