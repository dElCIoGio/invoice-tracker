import { Link } from "react-router";
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight} from "lucide-react"
import { FadeIn, FadeInUp, FadeInLeft, FadeInRight, ScaleIn } from "@/components/scroll-animation"
import { StaggeredChildren } from "@/components/staggered-children"
import { CountUp } from "@/components/count-up"
import { Parallax } from "@/components/parallax"



export default function Landing() {
    return (
      <div className="flex-1">

        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
          <div className="container-custom px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <FadeInUp>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    A Revolutionary and Reliable Solution for
                    <span className="text-gray-500"> Invoice Management</span>
                  </h1>
                </FadeInUp>
                <FadeInUp delay={0.1}>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Streamline your invoicing process with automated reminders and tracking solutions throughout the
                    world.
                  </p>
                </FadeInUp>
                <FadeInUp delay={0.2}>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button className="bg-teal-600 hover:bg-teal-700">Book a Demo</Button>
                    <Button variant="outline">Learn More</Button>
                  </div>
                </FadeInUp>
                <FadeInUp delay={0.3}>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gray-200" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="font-bold">★★★★★</span>
                      <span className="text-gray-500">5.0 (2k+ reviews)</span>
                    </div>
                  </div>
                </FadeInUp>
              </div>
              <FadeIn delay={0.4}>
                <div className="flex justify-center lg:justify-end">
                  <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
                    <img
                      src="/placeholder.svg?height=500&width=500"
                      alt="Person using Virelle on mobile"
                      width={500}
                      height={500}
                      className="object-contain"
                    />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="w-full border-y py-12 ">
          <div className="px-4 md:px-6 container-custom">
            <FadeIn>
              <p className="text-center text-sm font-medium text-gray-500 mb-8">
                Industry leaders trust Virelle to grow their revenue
              </p>
            </FadeIn>
            <StaggeredChildren className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center">
              {["Acme Co", "Globex", "Initech", "Umbrella Co", "Massive Dynamic"].map((company) => (
                <div key={company} className="flex justify-center">
                  <div className="text-xl font-bold text-gray-400">{company}</div>
                </div>
              ))}
            </StaggeredChildren>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 overflow-hidden">
          <div className="container-custom px-4 md:px-6">
            <FadeInUp>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">One Customer Platform</h2>
                <p className="text-gray-500 md:text-xl">Everyone's Business</p>
              </div>
            </FadeInUp>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              {/* Feature 1 */}
              <FadeInUp delay={0.1}>
                <div className="rounded-lg border bg-card p-6 transition-all duration-300 hover:shadow-lg">
                  <div className="h-[150px] w-full bg-gray-100 rounded-md mb-6 flex items-center justify-center overflow-hidden">
                    <Parallax speed={0.2}>
                      <img
                        src="/placeholder.svg?height=150&width=250"
                        alt="Invoice tracking dashboard"
                        width={250}
                        height={150}
                        className="object-contain"
                      />
                    </Parallax>
                  </div>
                  <h3 className="text-xl font-bold">Accounts receivable & invoice tracking</h3>
                  <p className="mt-2 text-gray-500">
                    Automatically track all your invoices and get notified when payments are due or overdue.
                  </p>
                  <Link to="#" className="mt-4 inline-block text-sm font-medium text-teal-600">
                    Learn more
                  </Link>
                </div>
              </FadeInUp>

              {/* Feature 2 */}
              <FadeInUp delay={0.2}>
                <div className="rounded-lg border bg-card p-6 transition-all duration-300 hover:shadow-lg">
                  <div className="h-[150px] w-full bg-gray-100 rounded-md mb-6 flex items-center justify-center overflow-hidden">
                    <Parallax speed={0.2}>
                      <img
                        src="/placeholder.svg?height=150&width=250"
                        alt="All-in-one platform"
                        width={250}
                        height={150}
                        className="object-contain"
                      />
                    </Parallax>
                  </div>
                  <h3 className="text-xl font-bold">All your invoices. One platform</h3>
                  <p className="mt-2 text-gray-500">
                    Manage all your invoices in one place with powerful analytics, reporting, and automation.
                  </p>
                  <Link to="#" className="mt-4 inline-block text-sm font-medium text-teal-600">
                    Learn more
                  </Link>
                </div>
              </FadeInUp>

              {/* Feature 3 */}
              <FadeInUp delay={0.3}>
                <div className="rounded-lg border bg-card p-6 transition-all duration-300 hover:shadow-lg">
                  <div className="h-[150px] w-full bg-gray-100 rounded-md mb-6 flex items-center justify-center overflow-hidden">
                    <Parallax speed={0.2}>
                      <img
                        src="/placeholder.svg?height=150&width=250"
                        alt="Multi-currency support"
                        width={250}
                        height={150}
                        className="object-contain"
                      />
                    </Parallax>
                  </div>
                  <h3 className="text-xl font-bold">Dedicated in multiple currencies</h3>
                  <p className="mt-2 text-gray-500">
                    Send and receive invoices in multiple currencies with automatic exchange rate calculations.
                  </p>
                  <Link to="#" className="mt-4 inline-block text-sm font-medium text-teal-600">
                    Learn more
                  </Link>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 bg-gray-50">
          <div className="container-custom px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <CountUp end={98} suffix="%" className="text-4xl font-bold text-teal-600" />
                <p className="text-sm text-gray-500">Customer satisfaction</p>
              </div>
              <div className="space-y-2">
                <CountUp end={10000} suffix="+" className="text-4xl font-bold text-teal-600" />
                <p className="text-sm text-gray-500">Active users</p>
              </div>
              <div className="space-y-2">
                <CountUp end={5} suffix="M+" className="text-4xl font-bold text-teal-600" />
                <p className="text-sm text-gray-500">Invoices processed</p>
              </div>
              <div className="space-y-2">
                <CountUp end={99.9} suffix="%" decimals={1} className="text-4xl font-bold text-teal-600" />
                <p className="text-sm text-gray-500">Uptime reliability</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="w-full bg-gray-900 py-12 md:py-24 text-white overflow-hidden">
          <div className="container-custom px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <FadeInLeft>
                <div className="flex justify-center">
                  <div className="relative h-[300px] w-[300px] overflow-hidden rounded-lg">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Customer testimonial"
                      width={300}
                      height={300}
                      className="object-cover"
                    />
                  </div>
                </div>
              </FadeInLeft>
              <FadeInRight>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter">
                    Designed Based on
                    <br />
                    Our Customers' Needs
                  </h2>
                  <blockquote className="border-l-4 border-teal-500 pl-4 italic">
                    "I have been using Virelle Solution for my business, and I must say, it has been a game-changer. The
                    automated reminders have saved me countless hours chasing payments. I'm impressed about the insight
                    and data-driven approach of this platform. It has helped me."
                  </blockquote>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">— Sarah Johnson, CEO at TechFlow Inc.</p>
                  </div>
                </div>
              </FadeInRight>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full py-12 md:py-24 overflow-hidden">
          <div className="container-custom px-4 md:px-6">
            <FadeInUp>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything You Need to Manage
                  <br />
                  and Control Invoice Payments
                </h2>
              </div>
            </FadeInUp>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-12">
              {/* Pricing Tier 1 */}
              <ScaleIn delay={0.1}>
                <div className="rounded-lg border bg-card p-6 transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-xl font-bold">Starter</h3>
                  <p className="mt-2 text-sm text-gray-500">Perfect for small businesses just getting started</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$19</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <Button className="mt-6 w-full bg-gray-900 hover:bg-gray-800">Get started free</Button>
                  <ul className="mt-6 space-y-2 text-sm">
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-teal-500" />
                      <span>Up to 50 invoices/month</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-teal-500" />
                      <span>Email reminders</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-teal-500" />
                      <span>Basic reporting</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-teal-500" />
                      <span>Single user access</span>
                    </li>
                  </ul>
                </div>
              </ScaleIn>

              {/* Pricing Tier 2 */}
              <ScaleIn delay={0.2}>
                <div className="rounded-lg border-2 border-teal-500 bg-card p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
                  <h3 className="text-xl font-bold">All-In-One</h3>
                  <p className="mt-2 text-sm text-gray-500">Complete solution for growing businesses</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$39</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <Button className="mt-6 w-full bg-teal-600 hover:bg-teal-700">Get started free</Button>
                  <ul className="mt-6 space-y-2 text-sm">
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-teal-500" />
                      <span>Unlimited invoices</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-teal-500" />
                      <span>Email & SMS reminders</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-teal-500" />
                      <span>Advanced reporting & analytics</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-teal-500" />
                      <span>Team collaboration (up to 5 users)</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-teal-500" />
                      <span>Custom reminder sequences</span>
                    </li>
                  </ul>
                </div>
              </ScaleIn>

              {/* Pricing Tier 3 */}
              <ScaleIn delay={0.3}>
                <div className="rounded-lg border bg-card p-6 transition-all duration-300 hover:shadow-lg">
                  <h3 className="text-xl font-bold">Enterprise</h3>
                  <p className="mt-2 text-sm text-gray-500">Advanced features for large businesses</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">$69</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <Button className="mt-6 w-full bg-gray-900 hover:bg-gray-800">Get started free</Button>
                  <ul className="mt-6 space-y-2 text-sm">
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-teal-500" />
                      <span>Everything in All-In-One</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-teal-500" />
                      <span>Unlimited users</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-teal-500" />
                      <span>API access</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-teal-500" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-teal-500" />
                      <span>Custom integrations</span>
                    </li>
                  </ul>
                </div>
              </ScaleIn>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container-custom px-4 md:px-6">
            <FadeInUp>
              <div className="mx-auto max-w-3xl space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter text-center">FAQs</h2>
                <p className="text-center text-gray-500">
                  Find out the most common questions, and hopefully, you need to build your next project with ease.
                </p>
              </div>
            </FadeInUp>
            <StaggeredChildren className="mx-auto max-w-3xl mt-8 space-y-4">
              {[
                {
                  question: "What is Virelle Invoice Solution?",
                  answer:
                    "Virelle is a comprehensive invoice management solution designed for businesses of all sizes. It helps you track, remind, and manage all your invoices in one place with powerful automation features.",
                },
                {
                  question: "How can I save money by using Virelle?",
                  answer:
                    "Virelle helps you get paid faster with automated reminders, reducing late payments and improving cash flow. Our analytics also help you identify payment trends and optimize your invoicing process.",
                },
                {
                  question: "What is Virelle's API?",
                  answer:
                    "Virelle's API allows you to integrate our invoice management system with your existing software stack, enabling seamless data flow and automation across your business tools.",
                },
                {
                  question: "Does Virelle integrate with accounting systems?",
                  answer:
                    "Yes, Virelle integrates with popular accounting systems like QuickBooks, Xero, and FreshBooks, allowing for seamless data synchronization and workflow automation.",
                },
                {
                  question: "How much does it cost?",
                  answer:
                    "Virelle offers flexible pricing plans starting at $19/month for small businesses, with options for growing companies and enterprises. All plans come with a free trial period.",
                },
              ].map((faq, index) => (
                <div key={index} className="rounded-lg border p-4 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{faq.question}</h3>
                    <ChevronDown className="h-5 w-5" />
                  </div>
                  <div className="mt-2 text-sm text-gray-500">{faq.answer}</div>
                </div>
              ))}
            </StaggeredChildren>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="w-full py-12 md:py-24 overflow-hidden">
          <div className="container-custom px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <FadeInLeft>
                <div className="rounded-lg bg-gray-100 p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:bg-gray-50">
                  <h3 className="text-xl font-bold mb-2">Direct Payment Integration</h3>
                  <p className="text-gray-500 mb-4">Get paid faster with integrated payment options</p>
                  <Button variant="outline" className="mt-auto">
                    Learn More
                  </Button>
                </div>
              </FadeInLeft>
              <FadeInRight>
                <div className="rounded-lg bg-gray-100 p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:bg-gray-50">
                  <h3 className="text-xl font-bold mb-2">Scalable Client Platform</h3>
                  <p className="text-gray-500 mb-4">Grow your business without growing your workload</p>
                  <Button variant="outline" className="mt-auto">
                    Learn More
                  </Button>
                </div>
              </FadeInRight>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="w-full bg-gray-900 py-12 md:py-24 text-white overflow-hidden">
          <div className="container-custom px-4 md:px-6 text-center">
            <FadeInUp>
              <h2 className="text-3xl font-bold tracking-tighter mb-4">
                Access Financial Technology With
                <br />
                <span className="text-gray-400">Maximum Security From Your Hands</span>
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-400 mb-8">
                Everything you need to manage your invoices is secure, robust, and compliant with industry standards.
              </p>
              <Button

                className="border-white transition-all duration-300"
              >
                Get Started Now →
              </Button>
            </FadeInUp>
          </div>
        </section>
      </div>
    );
} 