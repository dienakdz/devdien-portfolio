import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Experience = () => {
    const { t, lang } = useLanguage();

    const experiences = [
        {
            company: 'TMA Solutions',
            role: 'Backend Developer',
            period: lang === 'vi' ? '08/2025 - Hiện tại' : 'Aug 2025 - Present',
            location: 'Quy Nhơn, Bình Định, VN',
            description: lang === 'vi'
                ? 'Phát triển các dịch vụ backend hiệu năng cao sử dụng Python và framework FastAPI. Tham gia thiết kế và tối ưu hóa cơ sở dữ liệu.'
                : 'Developing high-performance backend services using Python and FastAPI framework. Participating in database design and optimization.'
        },
        {
            company: 'EFE Technology',
            role: 'Junior PHP Developer',
            period: '04/2024 - 08/2025',
            location: 'Đà Nẵng, VN',
            description: lang === 'vi'
                ? 'Bảo trì và phát triển website khách hàng bằng PHP core và WordPress. Sửa lỗi, xây dựng tính năng mới và tối ưu hóa hiệu suất trang web.'
                : 'Maintained and developed client websites using core PHP and WordPress. Fixed bugs, built new features, and optimized site performance.'
        },
        {
            company: 'Nova Square',
            role: 'Intern AI',
            period: '11/2023 - 01/2024',
            location: 'Đà Nẵng, VN',
            description: lang === 'vi'
                ? 'Tìm hiểu và ứng dụng OpenAI API vào việc tích hợp Fanpage Messenger. Huấn luyện mô hình cơ bản để dự đoán dữ liệu.'
                : 'Learned and applied OpenAI API for Messenger Fanpage integration. Trained basic models to predict data.'
        },
        {
            company: 'Fastworld Tech',
            role: 'Intern PHP WordPress',
            period: '06/2023 - 11/2023',
            location: 'Đà Nẵng, VN',
            description: lang === 'vi'
                ? 'Tìm hiểu quy trình vận hành của WordPress CMS. Thực hành sử dụng hooks và actions trong WordPress.'
                : 'Learned the operation process of WordPress CMS. Practiced using WordPress hooks and actions.'
        },
        {
            company: 'VKU University',
            role: lang === 'vi' ? 'Sinh viên CN-TT' : 'IT Student',
            period: '2020 - 2025',
            location: 'Đà Nẵng, VN',
            description: lang === 'vi'
                ? 'Tốt nghiệp loại Giỏi chuyên ngành Kỹ thuật Phần mềm. GPA 3.55/4.0'
                : 'Graduated Distinction in Software Engineering. GPA 3.55/4.0'
        }
    ];

    return (
        <section id="experience" className="section-padding">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-extrabold mb-4"
                    >
                        <span className="text-glitch" data-text={t.experience.title1}>{t.experience.title1}</span> <span className="text-gradient">{t.experience.title2}</span>
                    </motion.h2>
                    <p className="text-muted-foreground text-lg">{t.experience.description}</p>
                </div>

                <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                        >
                            {/* Dot */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -translate-x-1/2">
                                <Briefcase size={16} className="text-primary-500" />
                            </div>

                            {/* Card */}
                            <div className="w-[calc(100%-4rem)] md:w-[45%] p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-xl">{exp.role}</h3>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-primary-600 font-semibold mb-4">
                                    <div className="flex items-center gap-1"><Calendar size={14} /> {exp.period}</div>
                                    <div className="flex items-center gap-1 text-muted-foreground font-normal"><MapPin size={14} /> {exp.location}</div>
                                </div>
                                <div className="text-muted-foreground mb-4">
                                    <span className="text-foreground font-bold block mb-2">{exp.company}</span>
                                    {exp.description}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
