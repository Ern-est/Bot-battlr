import React, { useEffect, useState } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

function BotsPage() {
  const [bots, setBots] = useState([]);
  const [yourBots, setYourBots] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/bots")
      .then((response) => response.json())
      .then((data) => setBots(data))
      .catch((error) => console.log(error));
  }, []);

  function addBotToArmy(bot) {
    if (yourBots.includes(bot)) return;
    setYourBots([...yourBots, bot]);
  }

  function deleteBot(bot) {
    const updateYourBots = yourBots.filter((b) => b.id !== bot.id);
    const updateBots = bots.filter((b) => b.id !== bot.id);

    fetch(`http://localhost:3000/bots/${bot.id}`, {
      method: "DELETE",
    }).then(() => {
      setYourBots(updateYourBots)
      setBots(updateBots)})
  }

  return (
    <div>
      <YourBotArmy
        yourBots={yourBots}
        setYourBots={setYourBots}
        deleteBot={deleteBot}
      />
      <BotCollection
        bots={bots}
        addBotToArmy={addBotToArmy}
        deleteBot={deleteBot}
      />
    </div>
  );
}

export default BotsPage;
