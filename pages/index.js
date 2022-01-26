import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import React from "react";
import { useRouter } from "next/router";
import appConfig from "../config.json";

function Title(props) {
  const Tag = props.tag || "h1";
  return (
    // Elemento fantasma que possibilita agrupar as informações aqui <>
    <>
      <Tag>{props.children}</Tag>
      <style jsx>
        {`
          ${Tag} {
            color: ${appConfig.theme.colors.neutrals[200]};
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 0.1em;
          }
        `}
      </style>
    </>
  );
}

export default function PaginaInicial() {
  const [username, setUsername] = React.useState("levxyca");
  const [ImgDefault, setImgDefault] = React.useState("https://github.com/levxyca.png");
  const router = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[500],
          background: "hsla(260, 8%, 15%, 1)",
          background:
            "linear-gradient(90deg, hsla(260, 8%, 15%, 1) 0%, hsla(251, 12%, 26%, 1) 100%)",
          background:
            "-moz-linear-gradient(90deg, hsla(260, 8%, 15%, 1) 0%, hsla(251, 12%, 26%, 1) 100%)",
          background:
            "-webkit-linear-gradient(90deg, hsla(260, 8%, 15%, 1) 0%, hsla(251, 12%, 26%, 1) 100%)",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            padding: "32px",
            margin: "16px",
            boxShadow: "5px 5px 0em #454153",
            border: "1px solid #454153",
            backgroundColor: appConfig.theme.colors.neutrals[700],
            opacity: "0.9",
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (event) {
              event.preventDefault();
              router.push("/chat");
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Title tag="h2">Boas vindas!</Title>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={function handler(event) {
                // Onde o valor está?
                const value = event.target.value;
                // Trocando o valor da variável através do React
                setUsername(value);
                if (value.length > 2) {
                  setImgDefault(`https://github.com/${value}.png`);
                } else {
                  setImgDefault("https://github.com/levxyca.png");
                }
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                marginBottom: "16px",
              }}
              src={ImgDefault}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[700],
                padding: "3px 10px",
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
