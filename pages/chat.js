import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default function ChatPage() {
  const [message, setMessage] = React.useState("");
  const [chatList, setChatList] = React.useState([]);

  React.useEffect(() => {
    supabaseClient
      .from("Messages")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        setChatList(data);
      });
  }, []);

  function handleNewMessage(newMessage) {
    const message = {
      from: "levxyca",
      text: newMessage,
    };

    supabaseClient
      .from("Messages")
      .insert([message])
      .then(({ data }) => {
        setChatList([data[0], ...chatList]);
      });

    setMessage("");
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "hsla(260, 8%, 15%, 1)",
        background:
          "linear-gradient(90deg, hsla(260, 8%, 15%, 1) 0%, hsla(251, 12%, 26%, 1) 100%)",
        background:
          "-moz-linear-gradient(90deg, hsla(260, 8%, 15%, 1) 0%, hsla(251, 12%, 26%, 1) 100%)",
        background:
          "-webkit-linear-gradient(90deg, hsla(260, 8%, 15%, 1) 0%, hsla(251, 12%, 26%, 1) 100%)",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "5px 5px 0em #454153",
          border: "1px solid #454153",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />

        <MessageList mensagens={chatList} />

        <Box
          as="form"
          styleSheet={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            value={message}
            onChange={(event) => {
              const value = event.target.value;
              setMessage(value);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleNewMessage(message);
              }
            }}
            placeholder="Digite aqui..."
            type="textarea"
            styleSheet={{
              width: "100%",
              border: "0",
              resize: "none",
              padding: "6px 8px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              marginRight: "12px",
              color: appConfig.theme.colors.neutrals[200],
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          variant="heading5"
          styleSheet={{
            fontSize: "38px",
            textTransform: "lowercase",
            letterSpacing: ".1em",
          }}
        >
          Chat
        </Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
          styleSheet={{
            fontSize: "38px",
            textTransform: "lowercase",
            letterSpacing: ".1em",
            backgroundColor: appConfig.theme.colors.neutrals[800],
          }}
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        overflowY: "scroll",
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((message) => {
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${message.from}.png`}
              />
              <Text
                styleSheet={{
                  fontSize: "12px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {message.text}
          </Text>
        );
      })}
    </Box>
  );
}
