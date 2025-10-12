import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ReactNode } from 'react'
import Image from 'next/image'

export default function Features() {
    const features = [
        {
            image: "/exam.png",
            title: "Smart Course Generation",
            description: "Create comprehensive courses tailored to your learning goals with our advanced technology."
        },
        {
            image: "/quiz.png", 
            title: "Interactive Quizzes",
            description: "Test your knowledge with adaptive quizzes that help reinforce your learning effectively."
        },
        {
            image: "/flashcard.png",
            title: "Smart Flashcards", 
            description: "Master concepts with intelligent flashcards designed for optimal memory retention."
        },
        {
            image: "/notes.png",
            title: "Detailed Study Notes",
            description: "Get comprehensive, well-structured notes automatically generated from any topic."
        },
        {
            image: "/practice.png",
            title: "Practice Materials",
            description: "Access extensive practice materials to strengthen your understanding and skills."
        },
        {
            image: "/qa.png",
            title: "Q&A Sessions",
            description: "Engage with detailed question-answer sessions for deeper topic comprehension."
        }
    ]

    return (
        <section className="bg-zinc-50 py-16 md:py-24 dark:bg-slate-900">
            <div className="@container mx-auto max-w-6xl px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-4 font-outfit">
                        <img src="/logo.svg" alt="PrepSphere AI" className="w-4 h-4 dark:hidden" />
                        <img src="/logo-dark.svg" alt="PrepSphere AI" className="w-4 h-4 hidden dark:block" />
                        Powerful Features
                    </div>
                    <h2 className="text-balance text-3xl md:text-5xl font-semibold lg:text-5xl text-gray-900 dark:text-white mb-6 font-outfit">
                        Everything You Need to{' '}
                        <span className="bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                            Excel in Learning
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-outfit">
                        Our platform provides comprehensive tools to enhance your learning experience
                        and achieve better results faster than traditional methods.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="group shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-full">
                            <CardHeader className="pb-3 text-center">
                                <CardDecorator>
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        width={24}
                                        height={24}
                                        className="w-6 h-6 object-contain"
                                    />
                                </CardDecorator>

                                <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors font-outfit">
                                    {feature.title}
                                </h3>
                            </CardHeader>

                            <CardContent>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-outfit">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
        />

        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)
