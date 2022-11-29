import duke from "../img/dukeNukem.png";
import meatBoy from "../img/meatBoy.png";
import tommy from "../img/tommy.png";
export default function Game() {
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
    </main>
  );
}
