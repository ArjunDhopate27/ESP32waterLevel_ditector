import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [espIp, setEspIp] = useState(localStorage.getItem("espIp") || "");
  const [espConnected, setEspConnected] = useState(false);
  const [gpioConnected, setGpioConnected] = useState(false);

  const audioRef = useRef(null);
  const lastGpioState = useRef(null);
  const failCount = useRef(0);

  const playSound = (src) => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.src = src;
    audioRef.current.play().catch((e) => console.log("Audio blocked:", e));
  };

  const connectESP32 = () => {
    if (!espIp.trim()) {
      alert("Pehle ESP32 ka IP daalo.");
      return;
    }
    localStorage.setItem("espIp", espIp.trim());

    // Button click pe audio unlock kar do
    audioRef.current.src = "/sounds/pani-pani-made-with-Voicemod.mp3";
    audioRef.current.play().then(() => audioRef.current.pause()).catch(() => {});

    failCount.current = 0;
    lastGpioState.current = null;
    setEspConnected(true);
  };

  // Jab espConnected true ho, har 300ms pe status poochho
  useEffect(() => {
    if (!espConnected) return;

    const timer = setInterval(async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1500);

      try {
        const res = await fetch(`http://${espIp.trim()}/status`, {
          signal: controller.signal,
        });
        const data = await res.json();
        failCount.current = 0;

        if (data.state === "CONNECTED") {
          setGpioConnected(true);
          if (lastGpioState.current !== "CONNECTED") {
            lastGpioState.current = "CONNECTED";
            playSound("/sounds/pani-pani-made-with-Voicemod.mp3");
          }
        } else {
          setGpioConnected(false);
          if (lastGpioState.current !== "NOT_CONNECTED") {
            lastGpioState.current = "NOT_CONNECTED";
            playSound("/sounds/mkb_amitabh_bachchan.mp3");
          }
        }
      } catch (err) {
        failCount.current += 1;
        if (failCount.current >= 5) {
          setEspConnected(false);
          setGpioConnected(false);
        }
      } finally {
        clearTimeout(timeout);
      }
    }, 300);

    return () => clearInterval(timer);
  }, [espConnected, espIp]);

  return (
    <div className="app">
      <div className="status">
        <span className={espConnected ? "dot connected" : "dot"}></span>
        {espConnected ? "ESP32 CONNECTED (WiFi)" : "ESP32 NOT CONNECTED"}
      </div>

      <div className="video-container">
        {!espConnected ? (
          <div className="connect-box">
            <input
              type="text"
              placeholder="ESP32 IP, jaise 192.168.1.50"
              value={espIp}
              onChange={(e) => setEspIp(e.target.value)}
            />
            <button className="connect-message" onClick={connectESP32}>
              ESP32 CONNECTION KARO
            </button>
          </div>
        ) : gpioConnected ? (
          <img className="video" src="/videos/paani_bhool_bhulaiyaa_meme.gif" alt="Connected meme" />
        ) : (
          <img className="video" src="/videos/mkb_aag.gif" alt="Not connected meme" />
        )}
      </div>

      <audio ref={audioRef} />
    </div>
  );
}

export default App;