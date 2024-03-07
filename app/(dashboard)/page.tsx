import SearchBar from "@/components/custom/searchBar";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
    return (
        <>
            <div className="overflow-x-auto h-screen">
                <div className="flex flex-row gap-4">
                    <UserButton />
                    <SearchBar contents={searchContents} />
                </div>
                <div className="font-semibold text-2xl">Explore</div>
                <div className="flex flex-row flex-grow gap-5">
                    {exploreItems.map((item) => (
                        <button className={"btn btn-primary " + item.color}>{item.title}</button>
                    ))}
                </div>
            </div>
            <div className="font-bold">Most Popular Certificates</div>
            <div className="font-bold">Top Rated Courses</div>
        </>
    )
}


const exploreItems = [
    { title: "Computer Science and Technology", color: "bg-teal-500" },
    { title: "Electrical and Electronics Engineering", color: "bg-emerald-500" },
    { title: "Mechanical Engineering", color: "bg-blue-500" },
    { title: "Civil Engineering", color: "bg-red-500" },
    { title: "Chemical Engineering", color: "bg-yellow-500" },
    { title: "Aerospace Engineering", color: "bg-indigo-500" },
    { title: "Biotechnology", color: "bg-pink-500" },
    { title: "Agricultural Engineering", color: "bg-green-500" },
    { title: "Petroleum Engineering", color: "bg-purple-500" },
    { title: "Environmental Engineering", color: "bg-orange-500" },
    { title: "Marine Engineering", color: "bg-cyan-500" },
    { title: "Mining Engineering", color: "bg-lime-500" },
    { title: "Geological Engineering", color: "bg-rose-500" },
];

const searchContents = [
    { title: 'Algorithm' },
    { title: 'Data Structure' },
    { title: 'React' },
    { title: 'Vue' },
    { title: 'Angular' },
    { title: 'Next.js' },
    { title: 'Nest.js' },
    { title: 'Express' },
    { title: 'Django' },
    { title: 'Flask' },
    { title: 'FastAPI' },
    { title: 'TypeScript' },
    { title: 'JavaScript' },
    { title: 'Python' },
    { title: 'Java' },
    { title: 'C++' },
    { title: 'C#' },
    { title: 'Go' },
    { title: 'Rust' },
    { title: 'Swift' },
    { title: 'Kotlin' },
    { title: 'Dart' },
    { title: 'Ruby' },
    { title: 'Rust' },
    { title: 'Scala' },
    { title: 'Haskell' },
    { title: 'Rust' },
    { title: 'Perl' },
];