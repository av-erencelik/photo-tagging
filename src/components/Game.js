import duke from "../img/dukeNukem.png";
import meatBoy from "../img/meatBoy.png";
import tommy from "../img/tommy.png";
import main from "../img/main.jpg";
import target from "../img/target.png";
import { useRef, useState } from "react";

export default function Game() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedX, setClickledX] = useState(null);
  const [clickedY, setClickledY] = useState(null);
  const imgRef = useRef();
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
  return (
    <main className="main">
      <div className="characters">
        <div className="container">
          <img src={duke} alt="duke" id="duke"></img>
          <h3 className="description">Duke Nukem From Duke Nukem Forever</h3>
        </div>
        <div className="container">
          <img src={meatBoy} alt="meat boy" id="meat"></img>
          <h3 className="description">Meat Boy From Super Meat Boy</h3>
        </div>
        <div className="container">
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
              <button className="choice">Duke Nukem</button>
              <button className="choice">Meat Boy</button>
              <button className="choice">Tommy Vercetti</button>
            </div>
          </div>
        )}

        <img className="game" src={main} alt="main" ref={imgRef}></img>
      </div>
    </main>
  );
}
