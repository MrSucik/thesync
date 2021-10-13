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
} from "@mui/material";
import React, { ErrorInfo } from "react";
import firebase from "firebase/app";
import { firestore } from "../utils/fire";

const defaultTimeout = 15;

interface Props {}

export interface ErrorDetails {
  message: string;
  source: string;
  created: string;
}

interface State {
  hasError: boolean;
  errorInfo: ErrorDetails | undefined;
  timeout: number;
}

export default class ErrorContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: undefined,
      timeout: defaultTimeout,
    };
  }

  static getDerivedStateFromError(error: ErrorDetails) {
    return { hasError: true, errorInfo: error, timeout: defaultTimeout };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
    firestore.collection("logs").add({
      error: JSON.stringify({ error, errorInfo }),
      location: window.location.pathname,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
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
                opakovat. <br /> Stack: {this.state.errorInfo?.toString()}
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
