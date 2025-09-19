"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ConnectionManager } from "./ConnectionManager";
import ConnectionState from "./ConnectionState";
import { socket } from "./socket";

export default function Websocket() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      console.log(value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onFooEvent);
    };
  }, []);

  const handleSendMessage = () => {
    console.log("Ping!");
    socket.emit("message", "Bonjour");
  };

  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      <ConnectionManager />
      <Button className="cursor-pointer" onClick={handleSendMessage}>
        Send Message
      </Button>
    </div>
  );
}
