import Link from "next/link";
import { ChevronRight, Globe, Code, Calculator, GraduationCap, Microscope, ShieldCheck, Music } from "lucide-react";

const courseCategories = [
  {
    id: "k12-adult",
    title: "K-12 & Adult Classes",
    description: "Personalized learning for school students and professionals looking to level up.",
    icon: <GraduationCap size={28} />,
    color: "bg-primary",
    slug: "k12-adult",
  },
  {
    id: "languages",
    title: "Language Classes",
    description: "Master Yoruba, Igbo, and Hausa with native-speaking experts from anywhere in the world.",
    icon: <Globe size={28} />,
    color: "bg-blue-600",
    slug: "languages",
  },
  {
    id: "coding-tech",
    title: "Coding & Tech",
    description: "Equip yourself with digital skills: Python, Web Development, and Tech Literacies.",
    icon: <Code size={28} />,
    color: "bg-accent",
    slug: "coding-tech",
  },
  {
    id: "music",
    title: "Music Classes",
    description: "Learn instruments and theory with professional musicians in private sessions.",
    icon: <Music size={28} />, 
    color: "bg-purple-600",
    slug: "music",
  },
  {
    id: "exam-prep",
    title: "Global Exam Prep",
    description: "Intensive 1-on-1 coaching for international certifications and entrance exams.",
    icon: <ShieldCheck size={28} />, // Lucide 'ShieldCheck' exists but maybe others. Graduation cap used above.
    color: "bg-slate-800 dark:bg-slate-600",
    slug: "exam-prep",
  },
];

export default function CoursesPage() {
  return (
    <div className="pt-28 pb-20 px-4 md:px-6">
      <div className="container mx-auto ">
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-4 animate-fade-in-up mx-auto ">
          <p className="text-sm font-bold text-center text-primary uppercase tracking-[0.2em]">Explore Programs</p>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-center">
            Our Most <span className="text-primary italic">Popular</span> Courses
          </h1>
          <p className="text-lg text-muted leading-relaxed text-center" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Let&apos;s join our famous class. The knowledge provided will definitely be useful for you.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseCategories.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="premium-card bg-card p-7 group relative overflow-hidden flex flex-col h-full"
            >
              <div className={`w-14 h-14 ${course.color} text-white rounded-2xl flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                {course.icon}
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Lora', serif" }}>{course.title}</h3>
              <p className="text-muted leading-relaxed mb-6 flex-1 text-sm">{course.description}</p>
              <div className="flex items-center gap-2 font-bold text-sm text-primary group-hover:gap-3 transition-all duration-300">
                Learn More <ChevronRight size={16} />
              </div>
              
              <div className={`absolute top-0 right-0 w-24 h-24 ${course.color} opacity-[0.04] rounded-bl-full -mr-8 -mt-8`} />
            </Link>
          ))}
        </div>

        {/* Custom Request */}
        <div className="mt-20 relative overflow-hidden rounded-2xl bg-primary p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "20px 20px"
          }} />
          <div className="relative z-10 space-y-3 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold">Don&apos;t see what you&apos;re looking for?</h2>
            <p className="text-white/80 leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>We offer custom tutoring packages for many more subjects. Tell us your needs.</p>
          </div>
          <Link
            href="/contact"
            className="relative z-10 px-8 py-4 bg-white text-primary rounded-xl font-bold hover:shadow-xl transition-all duration-300 whitespace-nowrap"
          >
            Custom Request
          </Link>
        </div>
      </div>
    </div>
  );
}
