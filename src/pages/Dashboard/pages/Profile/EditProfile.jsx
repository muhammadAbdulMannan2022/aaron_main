import React, { useState, useEffect } from "react";
import { ArrowLeft, Upload, ChevronDown } from "lucide-react";
import {
  useGetProfileDataQuery,
  useUpdateProfileMutation,
} from "../../../../../redux/api/api";
import { useNavigate } from "react-router";

function EditPrifile() {
  const navigate = useNavigate();
  const { data: profileData, isLoading: isProfileDataLoading } =
    useGetProfileDataQuery();
  const [update, { isLoading: isupdateLoading }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    profession: "",
    dateOfBirth: {
      date: "",
      month: "",
      year: "",
    },
    phone: "",
    location: "",
    personalEmail: "",
    aboutYourself: "",
    professionalBackground: "",
    companyName: "", // ← NEW: Company Name
  });

  const [profileImage, setProfileImage] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);

  // Populate form data when profileData is fetched
  useEffect(() => {
    if (profileData) {
      // Parse date_of_birth if it exists (format: YYYY-MM-DD)
      let date = "";
      let month = "";
      let year = "";
      if (profileData.date_of_birth) {
        const [parsedYear, parsedMonth, parsedDate] =
          profileData.date_of_birth.split("-");
        date = parsedDate;
        month = parsedMonth;
        year = parsedYear;
      }

      setFormData({
        firstName: profileData.first_name || "",
        lastName: profileData.last_name || "",
        gender: profileData.gender || "",
        profession: profileData.profession || "",
        dateOfBirth: {
          date,
          month,
          year,
        },
        phone: profileData.phone_number || "",
        location: profileData.location || "",
        personalEmail: profileData.email || "",
        aboutYourself: profileData.about_yourself || "",
        professionalBackground: profileData.professional_background || "",
        companyName: profileData?.company_name || "", // ← NEW: Populate from API
      });
    }
  }, [profileData]);

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleCompanyLogoChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setCompanyLogo(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formDataToSend = new FormData();

    // Append text fields to FormData (excluding email)
    formDataToSend.append("first_name", formData.firstName || "");
    formDataToSend.append("last_name", formData.lastName || "");
    formDataToSend.append("gender", formData.gender || "");
    formDataToSend.append("profession", formData.profession || "");
    formDataToSend.append("phone_number", formData.phone || "");
    formDataToSend.append("location", formData.location || "");
    formDataToSend.append("about_yourself", formData.aboutYourself || "");
    formDataToSend.append(
      "professional_background",
      formData.professionalBackground || ""
    );
    formDataToSend.append("company_name", formData.companyName || ""); // ← NEW: Send to backend

    // Construct date_of_birth in the format expected by the backend (e.g., "YYYY-MM-DD")
    const { date, month, year } = formData.dateOfBirth;
    if (year && month && date) {
      const formattedDate = `${year}-${month.padStart(2, "0")}-${date.padStart(
        2,
        "0"
      )}`;
      formDataToSend.append("date_of_birth", formattedDate);
    }

    // Append file fields if they exist
    if (profileImage) {
      formDataToSend.append("profile_picture", profileImage);
    }
    if (companyLogo) {
      formDataToSend.append("upload_logo", companyLogo);
    }

    try {
      // Call the update mutation
      await update(formDataToSend).unwrap();
      console.log("Profile updated successfully!");
      navigate("/dashboard/profile/");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  if (isProfileDataLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="relative z-10 container mx-auto md:px-6 md:py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <button
            className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors duration-200 hover:cursor-pointer"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>

        <div className="max-w-4xl mt-10 mx-auto overflow-y-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-[#574bff]">
            Edit Profile Details
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8 px-2">
            {/* Basic Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#ACC0D8" }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter here"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#ACC0D8" }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter here"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#ACC0D8" }}
                >
                  Gender
                </label>
                <input
                  type="text"
                  placeholder="Enter here"
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#ACC0D8" }}
                >
                  Profession
                </label>
                <input
                  type="text"
                  placeholder="Enter here"
                  value={formData.profession}
                  onChange={(e) =>
                    handleInputChange("profession", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Date of Birth and Profile Picture */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#ACC0D8" }}
                >
                  Date of Birth
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="relative">
                    <select
                      value={formData.dateOfBirth.date}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth.date", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-slate-800">
                        Date
                      </option>
                      {dates.map((date) => (
                        <option
                          key={date}
                          value={date}
                          className="bg-slate-800"
                        >
                          {date}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={16}
                    />
                  </div>

                  <div className="relative">
                    <select
                      value={formData.dateOfBirth.month}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth.month", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-slate-800">
                        Month
                      </option>
                      {months.map((month, index) => (
                        <option
                          key={month}
                          value={index + 1}
                          className="bg-slate-800"
                        >
                          {month}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={16}
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Year"
                      value={formData.dateOfBirth.year}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 4) {
                          handleInputChange("dateOfBirth.year", value);
                        }
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#ACC0D8" }}
                >
                  Upload profile picture
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="profile-upload"
                  />
                  <label
                    htmlFor="profile-upload"
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white cursor-pointer hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <Upload size={16} style={{ color: "#ACC0D8" }} />
                      <span className="text-sm">Choose file</span>
                    </div>
                    <span className="text-sm text-gray-400 line-clamp-1">
                      {profileImage ? profileImage.name : "No file is selected"}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#ACC0D8" }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="Enter here"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#ACC0D8" }}
                >
                  Personal Email
                </label>
                <input
                  type="email"
                  placeholder="Enter here"
                  value={formData.personalEmail}
                  disabled
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-gray-400 placeholder-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Company Logo, Company Name, and Location */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#ACC0D8" }}
                >
                  Upload Company logo
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCompanyLogoChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="company-logo-upload"
                  />
                  <label
                    htmlFor="company-logo-upload"
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white cursor-pointer hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <Upload size={16} style={{ color: "#ACC0D8" }} />
                      <span className="text-sm">Choose file</span>
                    </div>
                    <span className="text-sm text-gray-400 line-clamp-1">
                      {companyLogo ? companyLogo.name : "No file is selected"}
                    </span>
                  </label>
                </div>
              </div>

              {/* NEW: Company Name Field */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#ACC0D8" }}
                >
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Enter here"
                  value={formData.companyName}
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#ACC0D8" }}
                >
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter here"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Text Areas */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#ACC0D8" }}
                >
                  About yourself
                </label>
                <textarea
                  placeholder="Enter here"
                  value={formData.aboutYourself}
                  onChange={(e) =>
                    handleInputChange("aboutYourself", e.target.value)
                  }
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#ACC0D8" }}
                >
                  Professional Background
                </label>
                <textarea
                  placeholder="Enter here"
                  value={formData.professionalBackground}
                  onChange={(e) =>
                    handleInputChange("professionalBackground", e.target.value)
                  }
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6 sm:pt-8">
              <button
                type="submit"
                disabled={isupdateLoading}
                className={`w-full sm:w-auto bg-[#574bff] hover:cursor-pointer px-8 sm:px-12 py-3 rounded-lg font-medium text-white transition-all duration-200 shadow-lg hover:shadow-xl ${
                  isupdateLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isupdateLoading ? "Updating..." : "Done"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPrifile;
