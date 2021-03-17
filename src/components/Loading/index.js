import { Container } from "./styles";

import { CircularProgress } from "@material-ui/core";

function Loading() {
  return (
    <Container>
      <CircularProgress style={{ width: "100px", height: "100px" }} />
    </Container>
  );
}

export default Loading;
