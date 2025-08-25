import { IconBooks, IconCalendarClock, IconCamera, IconCircleCheck, IconClockHour4, IconFolder, IconNotebook, IconPhoto, IconPresentation, IconProgress } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { getWorkshopResults } from "../../../../service/workshopResultService";
import WorkshopResultList from "../WorkshopResult/component/WorkshopResultList";
import ResultListTable from "./component/ResultListTable";
import { useWorkshop } from "../../../../context/WorkshopContext/WorkshopContext";
import { getJournal } from "../../../../service/journalService";
import Swal from "sweetalert2";
import { getAllPhotos } from "../../../../service/galleryService";

const Dashboard = () => {
  const [results, setResults] = useState([]);
  const [Total, setTotal] = useState([]);
  const [TotalLulus, setTotalLulus] = useState([]);
  const [TotalTidakLulus, setTotalTidakLulus] = useState([]);

  const [upcoming, setUpcoming] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);

  // journal State
  const [totalJournalItems,setTotalJournalItems] = useState([])
  const [Journals,setJournals] = useState([])

  // Gallery State
  const [photos,setPhotos] = useState([])

  const { workshop } = useWorkshop();
  console.log("Data Workshop From Dashboard", workshop);

  const categorizeWorkshops = (workshops) => {
    const today = new Date();

    const upcoming = workshops.filter((ws) => new Date(ws.start_date) > today);
    const ongoing = workshops.filter((ws) => new Date(ws.start_date) <= today && new Date(ws.end_date) >= today);
    const completed = workshops.filter((ws) => new Date(ws.end_date) < today);

    return { upcoming, ongoing, completed };
  };

  const getTotalPhotos = async() => {
    try {
          const data = await getAllPhotos();
          setPhotos(data);
        } catch (error) {
          Swal.fire("Error", "Gagal memuat semua foto.", "error");
        }
  }

  const totalAlbums = new Set(photos.map(item => item.album_id)).size;
  console.log(totalAlbums);


  // Fetch Journal
  const getDataJournal = async () => {
    try {
      const { data, count } = await getJournal("", 1, 100000);
      setJournals(data || []);
      setTotalJournalItems(count || 0);
    } catch (error) {
      Swal.fire("error", `Journal Gagal diload${error}`, "error");
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { results, total } = await getWorkshopResults(1, 5); // ambil banyak data
        setResults(results);
        setTotal(total);

        // hitung status langsung di sini
        const lulus = results.filter((r) => r.status === "lulus").length;
        const tidakLulus = results.filter((r) => r.status === "tidak_lulus").length;

        setTotalLulus(lulus);
        setTotalTidakLulus(tidakLulus);
      } catch (err) {
        console.error("Error fetching results:", err.message);
      }
    };
    if (workshop.length > 0) {
      const { upcoming, ongoing, completed } = categorizeWorkshops(workshop);
      setUpcoming(upcoming);
      setOngoing(ongoing);
      setCompleted(completed);
      console.log("Upcoming:", upcoming);
      console.log("Ongoing:", ongoing);
      console.log("Completed:", completed);
    }
    fetchResults();
    getDataJournal();
    getTotalPhotos();
  }, [workshop]);
  console.log("Photos From Dashboard",photos);
  return (
    <div className=" px-5">
      <h3 className="text-2xl font-bold text-gray-400 mb-4">Dashboard Overview</h3>
      <div className="flex justify-between">
        <div className="w-[24%] h-28 p-2 text-sm font-bold shadow rounded border ">
          <div className="flex justify-between">
            <h3>Total Workshop</h3>
            <IconBooks />
          </div>
          <p className="text-4xl text-center mt-2">{workshop.length}</p>
        </div>
        <div className="w-[24%] h-28 p-2 text-sm font-bold border shadow bg-blue-50 rounded">
          <div className="flex justify-between">
            <h3>Workshop Upcoming</h3>
            <IconCalendarClock />
          </div>
          <p className="text-4xl text-center mt-2">{upcoming.length}</p>
        </div>
        <div className="w-[24%] h-28 p-2 text-sm font-bold border shadow bg-purple-50 rounded">
          <div className="flex justify-between">
            <h3>Workshop Ongoing</h3>
            <IconClockHour4 />
          </div>
          <p className="text-4xl text-center mt-2">{ongoing.length}</p>
        </div>
        <div className="w-[24%] h-28 p-2 text-sm font-bold border shadow bg-red-50 rounded">
          <div className="flex justify-between">
            <h3>Workshop Completed</h3>
            <IconCircleCheck />
          </div>
          <p className="text-4xl text-center mt-2">{completed.length}</p>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <ResultListTable results={results} />
        <div className=" w-[24%] mt-10 flex flex-col space-y-2 pb-4">
          <div className=" h-24 p-2 text-sm font-bold shadow rounded border ">
            <div className="flex justify-between">
              <h3>Total Result</h3>
              <IconBooks />
            </div>
            <p className="text-4xl text-center mt-2">{Total}</p>
          </div>
          <div className=" h-24 p-2 text-sm font-bold shadow rounded border bg-green-300 ">
            <div className="flex justify-between">
              <h3>Total Participant Lulus</h3>
              <IconBooks />
            </div>
            <p className="text-4xl text-center mt-2">{TotalLulus}</p>
          </div>
          <div className=" h-24 p-2 text-sm font-bold shadow rounded border bg-red-300">
            <div className="flex justify-between">
              <h3>Total Participant Tidak Lulus</h3>
              <IconBooks />
            </div>
            <p className="text-4xl text-center mt-2">{TotalTidakLulus}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-[30%] h-28 p-2 text-sm font-bold shadow rounded border ">
          <div className="flex justify-between">
            <h3>Total Journal</h3>
            <IconNotebook />
          </div>
          <p className="text-4xl text-center mt-2">{Journals.length}</p>
        </div>
        <div className="w-[30%] h-28 p-2 text-sm font-bold border shadow  rounded">
          <div className="flex justify-between">
            <h3>Total Photos</h3>
            <IconPhoto />
          </div>
          <p className="text-4xl text-center mt-2">{photos.length}</p>
        </div>
        <div className="w-[30%] h-28 p-2 text-sm font-bold border shadow rounded">
          <div className="flex justify-between">
            <h3>Total Albums</h3>
            <IconFolder />
          </div>
          <p className="text-4xl text-center mt-2">{totalAlbums}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
