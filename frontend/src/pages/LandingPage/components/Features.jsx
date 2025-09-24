import { employerFeatures, jobSeekerFeatures } from '../../../utils/data.js';

const Features = () => {
  return (
    <section className="py-20 bg-primary-content relative overflow-hidden min-h-screen">
        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-bl from-primary to-secondary bg-clip-text text-transparent mb-6">
                    Everything You Need to
                    <span className="block bg-clip-text text-transparent">
                        Succeed
                    </span>
                </h2>
                <p className="text-xl text-secondary max-w-3xl mx-auto">
                    Whether you're looking for your next opportunity or the perfect candidate, we have the tools and features to make it happen.
                </p>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            {/* Job seeker section */}
            <div>
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-primary mb-4">
                        For Job Seekers
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
                </div>

                <div className="space-y-8 mx-6">
                    {jobSeekerFeatures.map((feature, index) => (
                        <div
                          key={index}
                          className="group flex items-start space-x-4 p-6 rounded-2xl hover:bg-blue-50 transition-all duration-300 cursor-pointer"
                         >
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mb-2">
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-primary mb-2">
                                    {feature.title}
                                </h4>
                                <p className="text-secondary text-base leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Employers section */}
            <div>
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-primary mb-4">
                        For Employers
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
                </div>

                <div className="space-y-8 mx-6">
                    {employerFeatures.map((feature, index) => (
                        <div
                         key={index}
                         className="group flex items-start space-x-4 p-6 rounded-2xl hover:bg-blue-50 transition-all duration-300 cursor-pointer"
                         >
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mb-2">
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold text-primary mb-2">
                                    {feature.title}
                                </h4>
                                <p className="text-secondary text-base leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                         </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  )
}

export default Features