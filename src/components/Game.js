import duke from "../img/dukeNukem.png";
import meatBoy from "../img/meatBoy.png";
import tommy from "../img/tommy.png";
import main from "../img/main.jpg";
import target from "../img/target.png";
import { useEffect, useRef, useState } from "react";
import db from "./firebase";
import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query } from "firebase/firestore";

export default function Game() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedX, setClickledX] = useState(null);
  const [clickedY, setClickledY] = useState(null);
  const [isTommyFound, setIsTommyFound] = useState(false);
  const [isDukeFound, setIsDukeFound] = useState(false);
  const [isMeatFound, setIsMeatFound] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timer, setTimer] = useState(0);
  const [name, setName] = useState("");
  const [time, setTime] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const imgRef = useRef();
  useEffect(() => {
    if (isDukeFound && isTommyFound && isMeatFound) {
      setTime(timer);
      setIsGameOver(true);
    }
  }, [isDukeFound, isTommyFound, isMeatFound]);
  useEffect(() => {
    let interval;
    if (!isGameOver) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else if (isGameOver) {
      clearInterval(interval);
      setTimer(0);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isGameOver]);
  function onImageClicked(e) {
    if (isModalOpen) {
      setIsModalOpen(false);
      return;
    }
    const relX = e.nativeEvent.offsetX / imgRef.current.width;
    const relY = e.nativeEvent.offsetY / imgRef.current.height;
    setClickledX(relX);
    setClickledY(relY);
    setIsModalOpen(true);
  }
  async function sendLeaderboard() {
    const leaderboardRef = await addDoc(collection(db, "leaderboard"), {
      name: name,
      time: time,
    });
    const q = query(collection(db, "leaderboard"), orderBy("time"), limit(5));
    getDocs(q).then((qsnap) => {
      setLeaderboard(qsnap.docs.map((d) => ({ ...d.data() })));
    });
  }
  async function handleCharacterChoice(e) {
    try {
      if (e.target.innerHTML === "Meat Boy") {
        const coordsRef = doc(db, "characters", "meat");
        const coords = (await getDoc(coordsRef)).data();
        checkIfMeatBoyFound(coords);
      } else if (e.target.innerHTML === "Duke Nukem") {
        const coordsRef = doc(db, "characters", "duke");
        const coords = (await getDoc(coordsRef)).data();
        checkIfDukeFound(coords);
      } else if (e.target.innerHTML === "Tommy Vercetti") {
        const coordsRef = doc(db, "characters", "tommy");
        const coords = (await getDoc(coordsRef)).data();
        checkIfTommyFound(coords);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function checkIfMeatBoyFound(coords) {
    if (Math.abs(coords.x - clickedX) <= 0.05 && Math.abs(coords.y - clickedY) <= 0.05) {
      setIsMeatFound(true);
    }
  }
  function checkIfDukeFound(coords) {
    if (Math.abs(coords.x - clickedX) <= 0.04 && Math.abs(coords.y - clickedY) <= 0.04) {
      setIsDukeFound(true);
    }
  }
  function checkIfTommyFound(coords) {
    if (Math.abs(coords.x - clickedX) <= 0.05 && Math.abs(coords.y - clickedY) <= 0.1) {
      setIsTommyFound(true);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    sendLeaderboard();
    setIsGameOver(false);
    setIsDukeFound(false);
    setIsMeatFound(false);
    setIsTommyFound(false);
  }
  function onChangeName(e) {
    setName(e.target.value);
  }
  return (
    <main className="main">
      {isGameOver && (
        <form className="form" onSubmit={handleSubmit}>
          <label id="name">NAME:</label>
          <input className="name" type="text" id="name" onChange={onChangeName}></input>
          <button type="submit">Submit</button>
        </form>
      )}

      <div className="leaderboard">
        <h3 className="title">LEADERBOARD</h3>
        {leaderboard.map((data) => {
          return (
            <div key={leaderboard.indexOf(data)} className="person">
              <h3>{data.name}</h3>
              <h3>{new Date(data.time * 1000).toISOString().substr(11, 8)}</h3>
            </div>
          );
        })}
      </div>

      <div className="timer">{new Date(timer * 1000).toISOString().substr(11, 8)}</div>
      <div className="characters">
        <div className={isDukeFound ? "container found" : "container"}>
          <img src={duke} alt="duke" id="duke"></img>
          <h3 className="description">Duke Nukem From Duke Nukem Forever</h3>
        </div>
        <div className={isMeatFound ? "container found" : "container"}>
          <img src={meatBoy} alt="meat boy" id="meat"></img>
          <h3 className="description">Meat Boy From Super Meat Boy</h3>
        </div>
        <div className={isTommyFound ? "container found" : "container"}>
          <img src={tommy} alt="tommy" id="tommy"></img>
          <h3 className="description">Tommy Vercetti From GTA Vice City</h3>
        </div>
      </div>
      <div className="game-container" onClick={onImageClicked}>
        {isModalOpen && (
          <div
            className="onclick"
            style={{ top: `${Math.trunc(clickedY * 100)}%`, left: `${Math.trunc(clickedX * 100)}%` }}
          >
            <img src={target} alt="target"></img>
            <div className="modal">
              {!isDukeFound && (
                <button className="choice" onClick={handleCharacterChoice}>
                  Duke Nukem
                </button>
              )}

              {!isMeatFound && (
                <button className="choice" onClick={handleCharacterChoice}>
                  Meat Boy
                </button>
              )}
              {!isTommyFound && (
                <button className="choice" onClick={handleCharacterChoice}>
                  Tommy Vercetti
                </button>
              )}
            </div>
          </div>
        )}

        <img className="game" src={main} alt="main" ref={imgRef}></img>
      </div>
    </main>
  );
}
