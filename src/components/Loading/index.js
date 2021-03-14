import { Container } from "./styles";

import spinner from "../../assets/iconfinder__refresh_load_loading_sync_arrow_reload_restart_4213447.png";

function Loading() {
  return (
    <Container>
      <img src={spinner}></img>
      Carregando...
    </Container>
  );
}

export default Loading;
