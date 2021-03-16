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
  Menu,
  PriceModal,
  ProductActionArea,
  ProductCard,
  ProductImage,
  ShopsModal,
} from "./styles";
import imageLogo from "../../assets/hustle.png";
import { Button, CardContent, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { api, mapApi } from "../../services/api";
import Modal from "../../components/Modal";
import qrCode from "../../assets/frame.png";
import { gameIn } from "../../services/security";

function Home() {
  const [games, setGames] = useState([]);

  const [shops, setShops] = useState([]);

  const [gameModal, setGameModal] = useState([]);

  const [openModalGame, setOpenModalGame] = useState(false);

  const [mapModal, setMapModal] = useState([]);

  const [openModalMap, setOpenModalMap] = useState(false);

  const handleOrder = async (price, gameId) => {
    setOpenModalGame(false);

    try {
      const response = await api.post("/order", {
        price: price,
        gameId: gameId,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalGame = async (id) => {
    setOpenModalGame(true);

    try {
      const response = await api.get(`/games/${id}`);

      setGameModal(response.data);
      gameIn(response.data);
    } catch (error) {
      console.error(error);
    }
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
    const loadGames = async () => {
      try {
        const response = await api.get("/games");

        setGames(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadGames();

    const loadShops = async () => {
      try {
        const response = await api.get("/shops");

        setShops(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadShops();
  }, []);

  return (
    <>
      {openModalMap && (
        <Modal
          title={mapModal.name}
          handleClose={() => setOpenModalMap(false)}
        ></Modal>
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
                R$ {gameModal.price},00
              </Typography>
            </PriceModal>
          </ContentModal>
        </Modal>
      )}
      <Container>
        <Header>
          <Logo src={imageLogo} />
          <Menu>
            <div>
              <h1>Jogos</h1>
            </div>
            <div>
              <h1>Lojas</h1>
            </div>
          </Menu>
        </Header>
        <Content>
          {games.map((g) => (
            <ProductCard>
              <ProductActionArea onClick={() => handleModalGame(g.id)}>
                <ProductImage image={g.image} alt="jogo" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {g.name}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="h3">
                    Preço: R${g.price},00
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
                (11) 97605-7989
              </Typography>
              <Typography gutterBottom variant="body1" component="h3">
                (11) 4321-2438
              </Typography>
            </FooterInfo>
            <FooterInfo>
              <Typography gutterBottom variant="h5" component="h2">
                E-mail
              </Typography>
              <Typography gutterBottom variant="body1" component="h3">
                pedrohenrique_silvasantos@yahoo.com
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
