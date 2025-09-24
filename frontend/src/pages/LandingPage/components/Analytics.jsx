import { motion } from 'framer-motion';
import { TrendingUp, Users, Briefcase, Target } from 'lucide-react';

const Analytics = () => {
    const stats = [
        {
            icon: Users,
            title: "Active Users",
            value: "2.4M+",
            growth: "+15%",
        },
        {
            icon: Briefcase,
            title: "Jobs Posted",
            value: "150K+",
            growth: "+22%",
        },
        {
            icon: Target,
            title: "Successful Hires",
            value: "89K+",
            growth: "+18%",
        },
        {
            icon: TrendingUp,
            title: "Match Rate",
            value: "94%",
            growth: "+8%",
        },
    ];

  return (
    <section className="py-20 relative overflow-hidden min-h-screen bg-primary-content">
        <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y:30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
             >
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-bl from-primary to-secondary bg-clip-text text-transparent mb-6">
                    Platform Analytics
                </h2>
                <p className="text-xl text-primary max-w-3xl mx-auto">
                    Real-time insights and data-driven results that showcase the power of our platform in connrcting talent with opportunities.
                </p>
            </motion.div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0}}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="bg-blue-50 p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                     >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center`}>
                                <stat.icon className={`w-6 h-6 text-white`} />
                            </div>
                            <span className="text-green-500 text-sm font-semibold bg-green-50 px-2 py-1 rounded-full">
                                {stat.growth}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-secondary mb-2">{stat.value}</h3>
                        <p className="text-secondary">{stat.title}</p>
                     </motion.div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Analytics