import Image from "next/image";

interface FacultyCardProps {
    name: string;
    designation: string;
    source: string;
}

const FacultyCard: React.FC<FacultyCardProps> = ({
    name,
    designation,
    source,
}) => {
    return (
        <div className="faculty-card p-3 bg-gray-100 rounded-2xl">
            <div className="relative w-full h-60">
                <Image
                    src={source}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                />
            </div>
            <p className="font-semibold gray-700">{name}</p>
            <p className="text-sm text-gray-600">{designation}</p>
        </div>
    );
};

export default FacultyCard;
