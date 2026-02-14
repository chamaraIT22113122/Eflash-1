import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import './FAQ.css'

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      question: 'What services does E Flash provide?',
      answer: 'We provide comprehensive digital services including Graphic Design, Web Development, UI/UX Design, Digital Marketing, Brand Strategy, Content Creation, Print Design, and E-commerce Solutions.'
    },
    {
      question: 'How long does it take to complete a project?',
      answer: 'Project timelines vary based on scope and complexity. A simple website takes 2-3 weeks, while complex applications may take 2-3 months. We provide detailed timelines during the initial consultation.'
    },
    {
      question: 'What is your pricing structure?',
      answer: 'Our pricing is project-based and depends on requirements, scope, and complexity. We offer competitive rates and provide detailed quotes after understanding your needs. Contact us for a free consultation and quote.'
    },
    {
      question: 'Do you provide ongoing support and maintenance?',
      answer: 'Yes! We offer 24/7 support and maintenance packages for all our projects. This includes updates, bug fixes, security patches, and technical assistance to ensure your digital assets run smoothly.'
    },
    {
      question: 'Can you redesign my existing website?',
      answer: 'Absolutely! We specialize in website redesigns and modernization. We can improve your site\'s design, performance, SEO, and user experience while maintaining your brand identity and existing content.'
    },
    {
      question: 'Do you work with international clients?',
      answer: 'Yes, we work with clients worldwide. We use modern communication tools and project management systems to ensure smooth collaboration regardless of location and time zone.'
    },
    {
      question: 'What technologies do you use?',
      answer: 'We use cutting-edge technologies including React, Next.js, Node.js, Vue.js, Angular, MongoDB, PostgreSQL, AWS, and more. We choose the best tech stack for each project\'s specific needs.'
    },
    {
      question: 'How do I get started with a project?',
      answer: 'Simply contact us through our contact form, phone, or WhatsApp. We\'ll schedule a free consultation to discuss your requirements, provide recommendations, and create a project proposal.'
    }
  ]

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="faq-section section">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">
          Find answers to common questions about our services
        </p>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h3>{faq.question}</h3>
                <span className="faq-icon">
                  {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="faq-answer"
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
