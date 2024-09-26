import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LinearProgress } from "@mui/material";
import ViewDetailsPage from "./ViewDetailsPage";
import GradingModal from "./GradingModal";
import { getHackathonSubscriptions } from "../../api/hackathons/hackathons";
import { setCurrentSubscriptionDetail } from "../../features/subscription/subscriptionSlice";
import CustomDataGrid from "../common/utils/CustomDataGrid";
const OrgSubmissionsTable = ({ hackathonId }) => {
  const [loading, setLoading] = useState(true);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const openModal = () => setOpenSignUpModal(true);
  const closeModal = () => setOpenSignUpModal(false);
  const dispatch = useDispatch();
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [subscriptionsData, setSubscriptionsData] = useState([]);
  const fetchHackathons = () => {
    getHackathonSubscriptions(hackathonId)
      .then((res) => {
        if (res.status === 200) {
          setSubscriptionsData(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchHackathons();
  }, []);
  const showDetails = (params) => {
    setDetailsVisible(true);
    dispatch(
      setCurrentSubscriptionDetail({ currentSubscriptionDetail: params.row })
    );
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
      block: "start",
    });
  };

  const columns = [
    {
      field: "blog",
      headerName: "Blog",
      width: 115,
      renderCell: (params) => (
        <a
          href={params.row.blog}
          target="_blank"
          className="text-custom-blue underline"
          rel="noopener noreferrer"
        >
          {params.row.blog}
        </a>
      ),
    },
    { field: "title", headerName: "Project name", width: 155 },
    {
      field: "gh_link",
      headerName: "Github",
      width: 150,
      renderCell: (params) => (
        <a
          href={params.row.gh_link}
          target="_blank"
          className="text-custom-blue underline"
          rel="noopener noreferrer"
        >
          {params.row.gh_link}
        </a>
      ),
    },
    {
      field: "demo_link",
      headerName: "Demo link",
      width: 155,
      renderCell: (params) => (
        <a
          href={params.row.demo_url}
          target="_blank"
          className="text-custom-blue underline"
          rel="noopener noreferrer"
        >
          {params.row.demo_link}
        </a>
      ),
    },
    {
      field: "live_url",
      headerName: "Live link",
      width: 155,
      renderCell: (params) => (
        <a
          href={params.row.live_url}
          target="_blank"
          className="text-custom-blue underline"
          rel="noopener noreferrer"
        >
          {params.row.live_url}
        </a>
      ),
    },
    {
      field: "grade",
      headerName: "Grade",
      width: 100,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 110,
      renderCell: (params) => (
        <button
          onClick={() => showDetails(params)}
          className="bg-custom-blue text-white rounded-md text-xs font-semibold px-3 py-2 hover:bg-white hover:text-custom-blue hover:border hover:border-custom-blue"
        >
          View details
        </button>
      ),
    },
  ];

  return (
    <div className=" flex flex-col min-w-full ">
      <div style={{ height: 400, width: "100%" }}>
        {loading && <LinearProgress />}
        {!loading && (
          <CustomDataGrid
            sx={{ mt: 3 }}
            rows={subscriptionsData}
            columns={columns}
          />
        )}
      </div>
      <div className={detailsVisible ? "block" : "hidden"}>
        {" "}
        <ViewDetailsPage openModal={openModal} />{" "}
        <GradingModal openModal={openSignUpModal} handleClose={closeModal} />
      </div>
    </div>
  );
};

export default OrgSubmissionsTable;
