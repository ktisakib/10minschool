
import Link from "next/link"
export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-svh">
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold max-w-2xs">Click the link to go to the course page use the search bar to go to any course page  </h1>
                <Link href="/product/ielts-course" className="px-4 py-2 text-2xl bg-primary  text-background rounded-lg hover:bg-primary/80" >IELTS Course</Link>
            </div>
        </div>
    )
}
