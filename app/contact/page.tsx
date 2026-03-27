'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Facebook } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="hero-section py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-100">
            Get in touch with Olympic Monaf Sport Academy
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>

              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Contact Information</h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <a href="mailto:olympicmonafsa280721@gmail.com" className="text-primary hover:underline">
                    olympicmonafsa280721@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">WhatsApp</h3>
                  <a href="tel:+237650937716" className="text-primary hover:underline">
                    +237 650 93 77 16
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Location</h3>
                  <p className="text-muted-dark">
                    Olembe<br />
                    Yaoundé<br />
                    Cameroon
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Facebook className="w-6 h-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Follow Us</h3>
                  <a href="https://facebook.com" target="_blank" className="text-primary hover:underline">
                    Olympic Monaf Sport Academy
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-12 bg-gray-300 h-96 rounded-lg overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8572385842857!2d11.477!3d3.848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNTAuOTInTiAxMcKwMjguNTInRQ!5e0!3m2!1sen!2scm!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
