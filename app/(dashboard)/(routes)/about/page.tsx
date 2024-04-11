import Image from "next/image";

import FacultyCard from "./_components/faculty-card";

export default async function AboutPage() {

    const facultyList =
        [
            {
                name: "Mohammad Shahidur Rahman, PhD",
                designation: "Professor",
                source: "/faculty/shaheed.jpg"
            },
            {
                name: "Dr Mohammad Reza Selim",
                designation: "Professor",
                source: "/faculty/salim.jpg"
            },
            {
                name: "Md Masum",
                designation: "Professor & Head",
                source: "/faculty/masum.jpg",
            },
            {
                name: "Dr. Md Forhad Rabbi, SMIEEE",
                designation: "Professor",
                source: "/faculty/rabbi.png"
            }
        ];

    const aboutUsText = `SUST Open Courseware (SUST OCW) is a pioneering initiative from Shahjalal University of Science & Technology (SUST), designed to democratize access to high-quality education. It functions as a self-contained online platform, operating alongside the university's established academic programs. SUST OCW goes beyond traditional course delivery methods, providing an intuitive and user-friendly interface for various stakeholders. Explore a wide range of courses across diverse disciplines!`;

    return (
        <div className="p-6 grid grid-cols-1 gap-10">
            <div className="bg-sky-200 p-5 rounded-2xl">
                <p className="font-extrabold text-xl text-gray-700 mb-2">SUST Open Courseware: Empowering Learners Everywhere</p>
                <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-10">
                        <p className="text-md text-gray-600">{aboutUsText}</p>
                    </div>
                    <div className="col-span-2 flex justify-center">
                        <Image
                            height={150}
                            width={150}
                            alt="SUST OCW"
                            className="rounded-2xl"
                            src={"/sust_couseware_logo.jpeg"}
                        />
                    </div>
                </div>
            </div>
            <div>
                <p className="font-extrabold text-xl mb-2">Meet The Faculty</p>
                <p className="text-sm mb-4 text-gray-700">Introducing the Faces Behind the Knowledge</p>
                <div className="grid grid-cols-4 gap-2">
                    {
                        facultyList.map((faculty, index) => (
                            <FacultyCard
                                key={index}
                                name={faculty.name}
                                designation={faculty.designation}
                                source={faculty.source}
                            />
                        ))
                    }
                </div>
            </div>
        </div>);
}