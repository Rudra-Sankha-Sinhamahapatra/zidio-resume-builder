import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector, useDispatch } from "react-redux";
import { setGlobalIndex } from "../../redux/slices/globalIndexSlice";
import { setEducationDetails, setResume } from "../../redux/slices/resumeSlice";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function EducationDetails() {
  const { globalIndex } = useSelector((state) => state.globalIndex);
  const dispatch = useDispatch();
  const { resume } = useSelector((state) => state.resume);
  const [formdata, setFormdata] = useState({
    institutionName: "",
    course: "",
    educationCountry: "",
    educationState: "",
    educationStart: "",
    educationFinish: "",
  });

  const handleOnChange = (e) => {
    setFormdata((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };
  const handleOnsubmit = (e) => {
    console.log("submited");
    axios
      .patch(
        `${import.meta.env.VITE_BASE_URL}/resume/addSection/${resume._id}`,
        { educationDetails: formdata },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(setResume(res.data.resume));
        toast.success("Added education details successfully");
      });
    dispatch(setEducationDetails(formdata));
    dispatch(setGlobalIndex((globalIndex + 1) % 6));
  };
  return (
    <div className="p-6 h-full w-full bg-richblack-700 rounded-2xl shadow-lg text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-white">Education</h1>
        <button className="text-blue-300 font-medium">Add Info</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label htmlFor="institution" className="text-white mb-2">
            Institution Name
          </label>
          <input
            type="text"
            className="p-3 rounded border border-gray-300"
            id="institution"
            placeholder="Name of school"
            onChange={handleOnChange}
            name="institutionName"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="course" className="text-white mb-2">
            Course
          </label>
          <input
            type="text"
            className="p-3 rounded border border-gray-300"
            id="course"
            placeholder="Course studied"
            name="course"
            onChange={handleOnChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="country" className="text-white mb-2">
            Country
          </label>
          <input
            type="text"
            className="p-3 rounded border border-gray-300"
            id="country"
            placeholder="Country name"
            onChange={handleOnChange}
            name="educationCountry"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="state" className="text-white mb-2">
            State
          </label>
          <input
            type="text"
            className="p-3 rounded border border-gray-300"
            id="state"
            placeholder="State"
            onChange={handleOnChange}
            name="educationState"
          />
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-white font-medium mb-2">Time Period</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="start" className="text-white mb-2">
              Start
            </label>
            <input
              type="date"
              className="p-3 rounded border border-gray-300"
              id="start"
              placeholder="MM/YY"
              onChange={handleOnChange}
              name="educationStart"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="finish" className="text-white mb-2">
              Finish
            </label>
            <input
              type="date"
              className="p-3 rounded border border-gray-300"
              id="finish"
              placeholder="MM/YY"
              onChange={handleOnChange}
              name="educationFinish"
            />
            <div className="flex items-center mt-2">
              <input type="checkbox" className="mr-2" id="currently" />
              <label htmlFor="currently" className="text-white">
                Currently study here
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-10">
        <div
          onClick={() => dispatch(setGlobalIndex(globalIndex - 1))}
          className="cursor-pointer py-[0.7rem] px-3 text-gray-500 text-white hover:text-black hover:bg-richblack-500 rounded-full transition duration-300"
        >
          <ArrowBackIcon />
        </div>
        <button
          onClick={() => handleOnsubmit()}
          className="py-3 px-6 bg-blue-400 hover:bg-blue-500 text-white rounded-md transition duration-300"
        >
          Next session
        </button>
      </div>
    </div>
  );
}
