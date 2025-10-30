"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useGetMyConsultationsQuery } from "@/services/consultationApi";
import { useGetMyFixMyTeethSubmissionsQuery } from "@/services/fixMyTeethApi";
import { useGetMyAppointmentQuery } from "@/services/appointmentApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface Appointment {
  _id: string;
  clinicName: string;
  clinicLocation: string;
  appointmentDate: string;
  timeSlot: string;
  clinicCharges: number;
  serviceType: string;
  clinicSpecialities: string[];
  status: string;
}

interface AppointmentApiResponse {
  data: Appointment[];
}

const PatientProfilePage = () => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    data: consultations,
    isLoading: isLoadingConsultations,
    isError: isErrorConsultations,
  } = useGetMyConsultationsQuery();
  const {
    data: fixMyTeethSubmissions,
    isLoading: isLoadingFixMyTeeth,
    isError: isErrorFixMyTeeth,
  } = useGetMyFixMyTeethSubmissionsQuery();
  const {
    data: appointments,
    isLoading: isLoadingAppointments,
    isError: isErrorAppointments,
  } = useGetMyAppointmentQuery();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="container p-4 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          {user && <p className="text-gray-600">Welcome, {user.name}!</p>}
        </div>
        <button
          onClick={handleLogout}
          className="px-6 py-2 font-semibold text-white transition bg-red-500 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
        >
          Logout
        </button>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="pb-2 mb-6 text-2xl font-semibold text-gray-700 border-b-2 border-gray-200">
          My Consultations
        </h2>
        {isLoadingConsultations && (
          <p className="text-gray-500">Loading consultations...</p>
        )}
        {isErrorConsultations && (
          <p className="text-red-500">
            Failed to load consultations. Please try again later.
          </p>
        )}
        {consultations && consultations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Dentist
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Time
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Fee
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {consultations.map((consultation) => (
                  <tr key={consultation._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {consultation.dentist?.user?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(consultation.selectedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {consultation.selectedSlot}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ₹{consultation.consultationFee || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          consultation.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : consultation.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {consultation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !isLoadingConsultations && (
            <p className="text-gray-500">You have no consultations booked.</p>
          )
        )}
      </div>

      <div className="p-6 mt-8 bg-white rounded-lg shadow-md">
        <h2 className="pb-2 mb-6 text-2xl font-semibold text-gray-700 border-b-2 border-gray-200">
          My Appointments
        </h2>
        {isLoadingAppointments && (
          <p className="text-gray-500">Loading appointments...</p>
        )}
        {isErrorAppointments && (
          <p className="text-red-500">
            Failed to load appointments. Please try again later.
          </p>
        )}
        {appointments &&
        (appointments as unknown as AppointmentApiResponse).data &&
        (appointments as unknown as AppointmentApiResponse).data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Clinic Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Location
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Time
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Charges
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Service Type
                  </th>

                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {(appointments as unknown as AppointmentApiResponse).data.map(
                  (appointment: Appointment) => (
                    <tr key={appointment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appointment.clinicName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appointment.clinicLocation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(
                          appointment.appointmentDate
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appointment.timeSlot}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ₹{appointment.clinicCharges}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {appointment.serviceType}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 text-sm font-semibold rounded-full ${
                            appointment.status === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : appointment.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          !isLoadingAppointments && (
            <p className="text-gray-500">You have no appointments booked.</p>
          )
        )}
      </div>

      <div className="p-6 mt-8 bg-white rounded-lg shadow-md">
        <h2 className="pb-2 mb-6 text-2xl font-semibold text-gray-700 border-b-2 border-gray-200">
          My Fix My Teeth Submissions
        </h2>
        {isLoadingFixMyTeeth && (
          <p className="text-gray-500">Loading submissions...</p>
        )}
        {isErrorFixMyTeeth && (
          <p className="text-red-500">
            Failed to load submissions. Please try again later.
          </p>
        )}
        {fixMyTeethSubmissions && fixMyTeethSubmissions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Problem
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Other Problem
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    State
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-600 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {fixMyTeethSubmissions.map((submission) => (
                  <tr key={submission._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {submission.selectedType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {(() => {
                        let parsedProblems = {};
                        try {
                          parsedProblems =
                            typeof submission.teethProblems === "string"
                              ? JSON.parse(submission.teethProblems)
                              : submission.teethProblems;
                        } catch (e) {
                          parsedProblems = {};
                        }

                        const problemsList = Object.entries(parsedProblems)
                          .map(([toothNumber, issues]) => {
                            if (!Array.isArray(issues) || issues.length === 0)
                              return null;
                            return (
                              <div key={toothNumber} className="mb-1">
                                <strong>Tooth {toothNumber}:</strong>{" "}
                                {issues.map((issue, i) => (
                                  <span
                                    key={i}
                                    className="inline-block px-2 py-1 mr-2 text-sm text-gray-700 bg-gray-100 rounded"
                                  >
                                    {issue.replace(/-/g, " ")}
                                  </span>
                                ))}
                              </div>
                            );
                          })
                          .filter(Boolean);

                        return problemsList.length > 0 ? (
                          <div>{problemsList}</div>
                        ) : (
                          <span className="text-gray-500">
                            No problems listed
                          </span>
                        );
                      })()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {submission.otherProblemText}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {submission.selectedState}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          submission.status === "Seen"
                            ? "bg-green-100 text-green-800"
                            : submission.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {submission.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !isLoadingFixMyTeeth && (
            <p className="text-gray-500">You have no submissions.</p>
          )
        )}
      </div>
    </div>
  );
};

export default PatientProfilePage;
