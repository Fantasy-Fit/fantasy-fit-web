import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNotifications,
  setNotifications,
} from "../../store/notifications/notificationsSlice";

function Notifications() {
  const notifications = useSelector(selectNotifications);
  console.log(notifications)

  const dispatch = useDispatch();

  //Action cable has a websocket mounted at:
  // ws://localhost:3000/cable
  const socket_url = "ws://localhost:3000/cable";
  const socket = new WebSocket(socket_url);

  //When the socket is opened, we can send data to the server
  socket.onopen = function (e) {
    console.log("Connected to server");
    const msg = {
      command: "subscribe",
      identifier: JSON.stringify({
        id: 1,
        channel: "NotificationsChannel",
      }),
    };
    socket.send(JSON.stringify(msg));
  };

  socket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    if (data.type === "ping") {
      return;
    }
    if (data.message) {
      console.log(data.message);
      dispatch(setNotifications([...notifications, data.message]));
    }
  };

  socket.onclose = function (e) {
    console.log("Disconnected from server");
  };

  socket.onerror = function (error) {
    console.log("WebSocket error observed: ", error);
  };

  return (
    <div>
      <h1>Notifications</h1>
      {notifications}
    </div>
  );
}

export default Notifications;
