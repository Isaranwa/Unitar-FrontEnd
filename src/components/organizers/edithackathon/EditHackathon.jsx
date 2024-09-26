import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button, Stack, Grid, Typography, Box } from "@mui/material";
import TagSelector from "../createhackathon/TagSelector";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DatePicker from "../../common/utils/DatePicker";
import moment from "moment";
import { selectOrganizerCode } from "../../../features/organizer/organizerSlice";
import {
  getHackathonDetails,
  resubmitHackathon,
} from "../../../api/hackathons/hackathons";
import OrgProfile from "../profile/OrgProfile";
import {
  selectSelectedHackathonDetail,
  setCurrentHackathonDetail,
} from "../../../features/hackathon/hackathonSlice";

const EditHackathon = ({ match }) => {
  const [tags, setTags] = useState([]);
  const [values, setValues] = useState({
    title: "",
    highlight: "",
    location: "",
    description: "",
    deliverables: "",
    goals: "",
    prize: "",
  });
  const [timelineItems, setTimelineItems] = useState([
    { period_name: "", start_date: "" },
  ]);

  const readCategories = (categoriesArray) => {
    setTags(categoriesArray);
  };

  const org_code = useSelector(selectOrganizerCode);
  const dispatch = useDispatch();
  const hackathon = useSelector(selectSelectedHackathonDetail);
  const hackathon_code = hackathon.id;

  const fetchHackathonDetails = async () => {
    try {
      const response = await getHackathonDetails(hackathon_code);

      if (response.status === 200) {
        const hackathonDetails = response.data;
        setValues({
          title: hackathonDetails.title,
          highlight: hackathonDetails.highlight,
          location: hackathonDetails.location,
          description: hackathonDetails.description,
          deliverables: hackathonDetails.deliverables,
          goals: hackathonDetails.goals,
          prize: hackathonDetails.prize,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHackathonDetails();
  }, []);
  const handleAddTimelineItems = () => {
    const values = [...timelineItems];
    values.push({
      period_name: "",
      start_date: "",
    });
    setTimelineItems(values);
  };

  const handleRemoveTimelineItems = (index) => {
    const values = [...timelineItems];
    values.splice(index, 1);
    setTimelineItems(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...timelineItems];
    const updatedValue = event.target.name;
    values[index][updatedValue] = event.target.value;
    setTimelineItems(values);
  };

  const handleCompletionDateChange = (date, index) => {
    let utcDate = moment.utc(date.$d, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)");
    const values = [...timelineItems];
    values[index]["start_date"] = utcDate.toISOString();
    setTimelineItems(values);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleEditHackathon = (e) => {
    e.preventDefault();
    let hackathonObj = {
      title: values.title,
      highlight: values.highlight,
      location: values.location,
      description: values.description,
      deliverables: values.deliverables,
      goals: values.goals,
      prize: values.prize,
      timelines: timelineItems,
      tags: tags,
      organizer_id: org_code,
    };

    resubmitHackathon(hackathonObj, hackathon_code)
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            setCurrentHackathonDetail({ currentHackathonDetail: res.data })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-white p-8 right-side min-h-screen min-w-full">
      <div className="ml-60">
        <div className="flex justify-between">
          <h1 className="text-gray-600 font-bold text-[24px]">Hackathons</h1>
          <OrgProfile />
        </div>
        <p className="text-xs text-gray-500 flex flex-row">
          <span>Hackathons</span>
          <img
            src="/assets/chevron-right-solid.svg"
            className="w-2 h-2 mt-[4px] m-1"
            alt="chevron"
          />
          <span>Edit Hackathon</span>
          <img
            src="/assets/chevron-right-solid.svg"
            className="w-2 h-2 mt-[4px] m-1"
            alt="chevron"
          />
          <span>Basic details</span>
        </p>

        <div className=" flex">
          <div>
            <ValidatorForm
              onSubmit={(e) => handleEditHackathon(e)}
              className="flex gap-[80px]"
            >
              <div className="flex flex-col ">
                <label
                  className="font-semibold mt-5 mb-2 text-xs "
                  name="projectName"
                >
                  Hackathon title
                </label>
                <input
                  type="text"
                  className="w-[400px] px-3 py-2 border border-gray-400 rounded text-xs
                  focus:outline-none focus:border-custom-blue "
                  placeholder="Stack a Stake Competition"
                  onChange={handleChange("title")}
                  name="title"
                  value={values.title}
                />

                <label
                  className="mt-5 mb-2 text-xs font-semibold"
                  name="projectName"
                >
                  Hackathon highlight Phrase
                </label>
                <input
                  type="text"
                  className="w-[400px] px-3 py-2 border border-gray-400 rounded text-xs
                  focus:outline-none focus:border-custom-blue "
                  placeholder="Building for the future"
                  onChange={handleChange("highlight")}
                  name="highlight"
                  value={values.highlight}
                />
                <label
                  className="mt-5 mb-2 text-xs font-semibold"
                  name="projectName"
                >
                  Location
                </label>
                <input
                  type="text"
                  className="w-[400px] px-3 py-2 border border-gray-400 rounded text-xs
        focus:outline-none focus:border-custom-blue "
                  placeholder="virtual, hybrid, onsite, etc"
                  onChange={handleChange("location")}
                  name="location"
                  value={values.location}
                />
                <label
                  className="font-semibold mt-5 mb-2 text-xs"
                  name="projectDescription"
                >
                  Description
                </label>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  onChange={handleChange("description")}
                  name="description"
                  value={values.description}
                  inputProps={{ maxLength: 100 }}
                />

                <label
                  className="font-semibold mt-5 mb-4 text-xs  "
                  name="projectName"
                >
                  Hackathon Sub-Thematic Concerns
                </label>
                <div className="flex flex-row border-gray-200 rounded p-2 border gap-2 mb-5 ">
                  <TagSelector func={readCategories} />
                </div>
                <div className="flex flex-row gap-5">
                  <Grid>
                    {timelineItems.length > 0 &&
                      timelineItems.map((field, index) => {
                        return (
                          <Stack key={index}>
                            <Grid
                              container
                              component="fieldset"
                              sx={{
                                border: "solid 3px #295FAB",
                                borderRadius: "15px",
                                padding: (theme) => theme.spacing(2),
                              }}
                            >
                              <legend>
                                <Typography>Hackathon Timeline</Typography>
                              </legend>
                              <Grid sx={{ m: 1 }}>
                                <Box>
                                  <Typography sx={{ fontWeight: "500" }}>
                                    Event Name
                                  </Typography>
                                  <TextValidator
                                    placeholder="project ideation"
                                    fullWidth
                                    value={field.period_name}
                                    onChange={(event) =>
                                      handleInputChange(index, event)
                                    }
                                    type="text"
                                    name="period_name"
                                    validators={["required"]}
                                    errorMessages={["This Field is Required"]}
                                  />
                                </Box>
                                <Box>
                                  <Typography sx={{ fontWeight: "500" }}>
                                    Date Due
                                  </Typography>
                                  {/* put a date field here */}
                                  <DatePicker
                                    handleDateChange={
                                      handleCompletionDateChange
                                    }
                                    idx={index}
                                  />
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                  <Button
                                    sx={{
                                      color: "error.main",
                                      borderColor: "error.main",
                                    }}
                                    variant="outlined"
                                    onClick={() =>
                                      handleRemoveTimelineItems(index)
                                    }
                                  >
                                    Remove Entry
                                  </Button>
                                </Box>
                              </Grid>
                            </Grid>
                          </Stack>
                        );
                      })}
                    <Grid>
                      <Box>
                        <Stack direction="row">
                          {" "}
                          <Button
                            variant="outlined"
                            onClick={() => handleAddTimelineItems()}
                            sx={{ mt: 1, borderRadius: 2 }}
                          >
                            Add timeline entry
                          </Button>
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  className="font-semibold mt-5 mb-2 text-xs "
                  name="projectName"
                >
                  Hackathon project deliverables
                </label>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  sx={{ width: "400px" }}
                  onChange={handleChange("deliverables")}
                  name="deliverables"
                  value={values.deliverables}
                />
                <label
                  className="font-semibold mt-5 mb-2 text-xs "
                  name="projectName"
                >
                  Hackathon project Goals
                </label>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  onChange={handleChange("goals")}
                  name="goals"
                  value={values.goals}
                />
                <label
                  className="font-semibold mt-5 mb-2 text-xs "
                  name="projectName"
                >
                  Hackathon prizes
                </label>
                <TextField
                  id="outlined-multiline-static"
                  label=""
                  multiline
                  rows={4}
                  onChange={handleChange("prize")}
                  name="prize"
                  value={values.prize}
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="  text-white  text-xs font-semibold bg-custom-blue  rounded-md p-2 w-[150px] mt-[20px]  hover:bg-white hover:text-custom-blue hover:border hover:border-custom-blue"
                  >
                    Edit Hackathon details
                  </button>
                </div>
              </div>
            </ValidatorForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHackathon;
