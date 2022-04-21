import './App.css';
import {AppLayout} from "./layouts/AppLayout";
import {useEffect} from "react";
import {RTC} from "./services/RTC";
import {useDispatch} from "react-redux";
import {setRtcConnectionStatus} from "./redux/slices/player.slice";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {Playlist} from "./routes/list";
import {AddSong} from "./routes/add";
import {Playing} from "./routes/playing";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Initialize RTC.");
    RTC.connect();
    RTC.addListener("connection-status-change", status => {
      if (status === 1) {
        dispatch(setRtcConnectionStatus(true))
      } else {
        dispatch(setRtcConnectionStatus(false));
      }
    })
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Playing />}>
            </Route>
            <Route path="/list" element={<Playlist />}>
            </Route>
            <Route path="/add" element={<AddSong/>}>
            </Route>
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
