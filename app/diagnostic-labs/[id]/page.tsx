import type { Metadata } from "next";
import axios from "axios";
import LabDetailsClient from "./LabDetailsClient"; // Import the new client component

async function getLabData(id: string) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/diagnostic-labs/${id}`);
    if (res.data.success) {
      return res.data.data;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch lab data for metadata", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const lab = await getLabData(params.id);

  if (!lab) {
    return {
      title: "Lab Not Found | Dental Tourism India",
      description: "The diagnostic lab you are looking for could not be found.",
    };
  }

  return {
    title: `${lab.name} | Dental Tourism India`,
    description: `Find details for ${lab.name}, a diagnostic lab in ${lab.location}, ${lab.state}. View services, ratings, and book appointments.`,
    keywords: [lab.name, "diagnostic lab", lab.location, lab.state, "dental tourism india"],
  };
}

interface LabDetailsPageProps {
  params: { id: string };
}

const LabDetailsPage: React.FC<LabDetailsPageProps> = ({ params }) => {
  return <LabDetailsClient />;
};

export default LabDetailsPage;
