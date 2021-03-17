import {
  Container,
  Content,
  ContentModal,
  DescriptionModal,
  PlatformModal,
  Footer,
  FooterContent,
  FooterInfo,
  Header,
  Logo,
  PriceModal,
  ProductActionArea,
  ProductCard,
  ProductImage,
  ShopsModal,
  ShopMap,
} from "./styles";
import QRCode from "qrcode";
import imageLogo from "../../assets/hustle.png";
import {
  Button,
  CardContent,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Modal from "../../components/Modal";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";
import { gameIn } from "../../services/security";

function Home() {
  const [games, setGames] = useState([]);

  const [shops, setShops] = useState([]);

  const [gameModal, setGameModal] = useState([]);

  const [qrCode, setQrCode] = useState("");

  const [openModalGame, setOpenModalGame] = useState(false);

  const [mapModal, setMapModal] = useState([]);

  const [openModalMap, setOpenModalMap] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [reload, setReload] = useState(0);

  const generateQrCode = async (gameId) => {
    try {
      const response = await QRCode.toDataURL(`/games/${gameId}`);

      setQrCode(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOrder = async (price, gameId) => {
    setOpenModalGame(false);

    setIsLoading(true);

    try {
      await api.post("/order", {
        price: price,
        gameId: gameId,
      });

      setTimeout(() => {
        setIsLoading(false);
        setOpenAlert(true);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReload = () => {
    setReload(Math.random());
  };

  const handleModalGame = async (id) => {
    setIsLoading(true);

    setTimeout(() => {
      setOpenModalGame(true);

      setIsLoading(false);
    }, 1000);

    const response = await api.get(`/games/${id}`);

    setGameModal(response.data);

    gameIn(response.data);
  };

  const handleModalMaps = async (id) => {
    setOpenModalGame(false);

    setOpenModalMap(true);

    try {
      const response = await api.get(`/shops/${id}`);

      setMapModal(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    const loadGames = async () => {
      const response = await api.get("/games");

      setGames(response.data);
    };

    const loadShops = async () => {
      const response = await api.get("/shops");

      setShops(response.data);
    };

    loadGames();

    loadShops();

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [reload]);

  return (
    <>
      {isLoading && <Loading />}
      {openAlert && (
        <Alert
          message={{
            title: "Parabéns",
            description: "Sua compra foi efetuada com sucesso!",
          }}
          handleClose={() => setOpenAlert(false)}
        />
      )}
      {openModalMap && (
        <Modal title={mapModal.name} handleClose={() => setOpenModalMap(false)}>
          <ShopMap src={mapModal.map_link} />
        </Modal>
      )}
      {openModalGame && (
        <Modal
          title={gameModal.name}
          handleClose={() => setOpenModalGame(false)}
        >
          <ContentModal>
            <img src={gameModal.image} alt="Imagem do jogo"></img>
            <DescriptionModal>
              <Typography gutterBottom variant="h4" component="h1">
                Descrição
              </Typography>
              <Typography gutterBottom variant="body2" component="h3">
                {gameModal.description}
              </Typography>
            </DescriptionModal>
            <ShopsModal>
              {gameModal.Shops && (
                <>
                  <Typography gutterBottom variant="h4" component="h1">
                    Lojas Disponíveis
                  </Typography>
                  {gameModal.Shops.map((s) => (
                    <Typography
                      gutterBottom
                      variant="body1"
                      component="h3"
                      onClick={() => {
                        handleModalMaps(s.id);
                      }}
                    >
                      - {s.name}
                    </Typography>
                  ))}
                </>
              )}
            </ShopsModal>
            <PlatformModal>
              {gameModal.Platforms && (
                <>
                  <Typography gutterBottom variant="h4" component="h1">
                    Plataformas
                  </Typography>
                  {gameModal.Platforms.map((p) => (
                    <Typography gutterBottom variant="body1" component="h3">
                      - {p.name}
                    </Typography>
                  ))}
                </>
              )}
            </PlatformModal>
            <PriceModal>
              <img src={qrCode} alt="QRcode Desconto" />
              <Button
                variant="contained"
                onClick={() => handleOrder(gameModal.price, gameModal.id)}
              >
                Comprar
              </Button>
              <Typography variant="body2" component="h1">
                {gameModal.price.toLocaleString("pt-br", {
                  minimumFractionDigits: 2,
                  style: "currency",
                  currency: "BRL",
                })}
              </Typography>
            </PriceModal>
          </ContentModal>
        </Modal>
      )}
      <Container>
        <Header>
          <Logo src={imageLogo} onClick={() => handleReload()} />
        </Header>
        <Content>
          {games.map((g) => (
            <ProductCard>
              <ProductActionArea
                onClick={() => {
                  handleModalGame(g.id);
                  generateQrCode(g.id);
                }}
              >
                <ProductImage image={g.image} alt="jogo" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {g.name}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="h3">
                    Preço:{" "}
                    {g.price.toLocaleString("pt-br", {
                      minimumFractionDigits: 2,
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Typography>
                </CardContent>
              </ProductActionArea>
            </ProductCard>
          ))}
        </Content>
        <Footer>
          <FooterContent>
            <FooterInfo>
              <Typography gutterBottom variant="h5" component="h2">
                Telefone
              </Typography>
              <Typography gutterBottom variant="body1" component="h3">
                (11) 0800-1010
              </Typography>
              <Typography gutterBottom variant="body1" component="h3">
                (11) 4002-8922
              </Typography>
            </FooterInfo>
            <FooterInfo>
              <Typography gutterBottom variant="h5" component="h2">
                E-mail
              </Typography>
              <Typography gutterBottom variant="body1" component="h3">
                contato@smartgames.com.br
              </Typography>
            </FooterInfo>
            <FooterInfo>
              <Typography gutterBottom variant="h5" component="h2">
                Lojas
              </Typography>
              {shops.map((s) => (
                <Typography gutterBottom variant="body1" component="h3">
                  {s.name}
                </Typography>
              ))}
            </FooterInfo>
          </FooterContent>
        </Footer>
      </Container>
    </>
  );
}

export default Home;
