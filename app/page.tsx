"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, type MouseEvent, type FormEvent, type ChangeEvent } from "react";
import { 
  Briefcase, BarChart3, Globe, Clock, Settings, ShieldCheck, 
  Mail, MapPin, Menu, X, ChevronRight, Phone, Users, Target, Zap,
  ArrowRight, CheckCircle, Star, Award, Rocket, Building2
} from "lucide-react";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // Terms modal
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false); // Privacy modal
  // const [scrolled, setScrolled] = useState(false);
  

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (isModalOpen || isPrivacyOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen, isPrivacyOpen]);

  // Set current year only on client side to avoid hydration mismatch
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Terms", href: "#", onClick: () => setIsModalOpen(true) },
    { label: "Privacy", href: "#", onClick: () => setIsPrivacyOpen(true) },
    { label: "Contact", href: "#contact" },
  ];
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };
  

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 font-sans overflow-hidden">
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 w-full z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-0 flex items-center justify-between">
          <Link href="/" className="group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <Image
                src="/logo.png"
                alt="Sarv6 Solutions Logo"
                width={210}
                height={85}
                priority
                className="relative h-12 sm:h-14 md:h-16 lg:h-18 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                  if (isModalOpen || isPrivacyOpen) {
                    e.preventDefault();
                    return;
                  }
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className="relative text-sm font-semibold text-gray-700 hover:text-emerald-600 uppercase tracking-wider transition-all duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link
              href="#contact"
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300 hover:scale-105"
            >
              Get Quote
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-gray-800 hover:text-emerald-600 transition-colors p-3 active:scale-95 touch-manipulation" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white/95 backdrop-blur-lg border-t border-gray-100 px-4 py-4 space-y-1 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                  if (isModalOpen || isPrivacyOpen) {
                    e.preventDefault();
                    return;
                  }
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                  setMenuOpen(false);
                }}
                className="block text-gray-700 font-semibold hover:text-emerald-600 active:bg-emerald-50 transition-colors py-4 px-4 rounded-lg touch-manipulation text-base border-b border-gray-100 last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="block text-center mt-4 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-full hover:shadow-lg active:scale-95 transition-all touch-manipulation"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </header>

      {/* ================= TERMS MODAL (blocking) ================= */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-[92%] md:w-[85%] lg:w-[70%] max-w-4xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div className="h-14 bg-gradient-to-r from-emerald-500 to-green-600" />
              <button
                className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow hover:bg-white"
                aria-label="Close"
                onClick={() => setIsModalOpen(false)}
              >
                <span className="sr-only">Close</span>✕
              </button>
            </div>
            <div className="px-6 md:px-8 py-6">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">Terms and Conditions</h2>
              <div className="mt-1 text-xs md:text-sm text-gray-500">Home ▸ Terms and Conditions</div>
              <div className="mt-6 max-h-[70vh] overflow-y-auto text-[15px] leading-relaxed text-gray-700">
                <p className="mb-4">
                  The content of this website www.sarv6solutions.com (the "Site"), is the property of Sarv6 Solutions Pvt. Ltd., with its principal office at Building No 13 katha No 116 Thota Vaari Veedhi Street, Parappana Agrahara, Electronic City, Bengaluru 560100, Karnataka, India.
                  Your access to and use of the Site is governed by these Terms of Use that include any notices and consent given in connection with the Site (together, the "Agreement"). As used in this Agreement, "Sarv6 Solutions" "We", "Us" or "Our" refers to Sarv6 Solutions. "You" or "Your" refers to you, the user of this Site and the services provided by Sarv6 Solutions.
                </p>
                <p className="mb-4 font-semibold">BY USING THE SITE, YOU AGREE AS FOLLOWS.</p>
                <h3 className="mt-6 mb-2 text-xl font-bold text-gray-900">1. Agreement to Deal Electronically</h3>
                <p className="mb-4">You use this site electronically and hence you agree that Sarv6 Solutions Pvt. Ltd. can communicate with you electronically for all aspects of your use of the site which includes sending of electronic notices. If you do not wish to receive the notice or deal electronically then please do not use this site. For any information regarding the site, or delivery of electronic notices, you can contact Sarv6 Solutions Pvt. Ltd.</p>
                <h3 className="mt-6 mb-2 text-xl font-bold text-gray-900">2. Changes to this Agreement</h3>
                <p className="mb-4">You are bound by the version of Agreement that is in effect on the date of your visit. Changes made to the agreement will be updated in this website regularly. Please view these Terms and Conditions as and when you visit the site.</p>
                <h3 className="mt-6 mb-2 text-xl font-bold text-gray-900">3. User Conduct</h3>
                <ul className="list-disc ml-6 space-y-2 mb-4">
                  <li>You shall not use this website for any illegal purpose other than as prescribed by applicable laws.</li>
                  <li>You shall not upload any kind of viruses, worms, Trojan horse or anything that is designed to interfere with operating system computer.</li>
                  <li>You shall not transmit any materials that is defaming in nature or offending or obscene or menacing character.</li>
                  <li>You shall not use this website that causes interruption or damages or which had rendered less efficient or may impair the effectiveness or functionality of this website.</li>
                  <li>You will not use the website to violate another person's rights.</li>
                </ul>
                <h3 className="mt-6 mb-2 text-xl font-bold text-gray-900">4. Copyright</h3>
                <p className="mb-4">This website, including but not limited to the design, text, graphics, and software compilation and underlying source code, is the property of Sarv6 Solutions Pvt. Ltd. and is protected by copyright. Permission is given only to make electronic copies and to print in hard copy, portions of this web site for the sole purpose of researching or using the services of Sarv6 Solutions. 
                  Using any content, other than what has been already permitted, without the consent of Sarv6 Solutions, is strictly prohibited. This prohibition includes but is not limited to modification, copying, distributing, transmitting, displaying, publishing, selling, creating derivative works or using any materials available on or through this web site for commercial or public purposes.</p>
                <h3 className="mt-6 mb-2 text-xl font-bold text-gray-900">5. Trade Marks</h3>
                <p className="mb-4">The trade marks, logos and service marks displayed on this website (marks) (excluding those included in client data records) are the property of Sarv6 Solutions. Users and visitors of this website are prohibited from using any marks for any purpose without the express written permission of Sarv6 Solutions. This will include but not limited to prohibition from using the marks as metatags on other pages or websites. The site 'look and feel' or layout of this Site are protected by law, such as trade dress, trademark, unfair competition, and other laws, and may not be copied or imitated in any manner.</p>
                <h3 className="mt-6 mb-2 text-xl font-bold text-gray-900">6. Rules Relating to Services</h3>
                <p className="mb-2">You will be liable for communications posted by you or through your account for the services used by you. You hereby agree that violating any of the conditions mentioned below will constitute material breach of this Agreement.</p>
                <ul className="list-disc ml-6 space-y-2 mb-4">
                  <li>If you use the services provided by Sarv6 Solutions for any purpose that violates the local, state, national or international laws.</li>
                  <li>If you provide any information that is false or pretending to be a person that you are not.</li>
                  <li>If you post any material that results in infringement of intellectual property rights of others or on the privacy or publicity rights of others.</li>
                  <li>If you post or transmit any information, text, files, software, chat, communication or any other materials that are illegal or harmful to others or threaten or abuse another person's privacy or considered hateful or slander by Sarv6 Solutions in its discretion.</li>
                  <li>If you post any unsanctioned advertising, promotional materials, or any other forms of illegal solicitation including but not limited to junk mail, spam, chain letters.</li>
                  <li>If you post improper questions or answers that are not related to the particular topic; Stalking, harassing, or otherwise harming others.</li>
                  <li>You should not distribute any viruses or corrupted files or any other similar software that could damage other person's computer operation.</li>
                  <li>You should not collect or store this Site's users' personal data. You should not Induce, entice, solicit or recruit or lure users or Experts to another web site which, in Sarv6 Solutions determination, is its competitor.</li>
                  <li>You should not engage in any kind of behavior on the Site, which is unacceptable to Sarv6 Solutions. Sarv6 Solutions is not obligated to notify you in case it changes the content for any reason or terminate your access to the site.</li>
                </ul>
                <h3 className="mt-6 mb-2 text-xl font-bold text-gray-900">7. Representation & Warranties</h3>
                <p className="mb-4">You represent and warrant that (a) you are above the age of 18 years. (b) You have the right and ability to enter into and make representations and warranties contained in this Agreement. (c) All the information submitted by you is true and accurate to the best of your knowledge (d) You will be responsible for maintaining your account, even if the account used without your permission by a third party (e) You will not use the site for any illegal purpose or for any purpose that is barred by this Agreement (f) All submission are owned by you and Sarv6 Solutions. Use of these submissions does not infringe or violate any intellectual property rights of any third parties.</p>
                <h3 className="mt-6 mb-2 text-xl font-bold text-gray-900">8. Copyright Infringement</h3>
                <p className="mb-4">Sarv6 Solutions relies on users of the site to bring to its notice any violation with regard to Copyright or any infringing materials on the site. The users can notify Sarv6 Solutions by contacting us.</p>
                <h3 className="mt-6 mb-2 text-xl font-bold text-gray-900">9. Breach of Agreement</h3>
                <p className="mb-4">If you breach any of the Terms of this Agreement or if we are not able to verify or authenticate the information provided by you, then Sarv6 Solutions will immediately issue a notice intimating you of the breach and not to repeat the same, or to cure the breach.</p>
                <h3 className="mt-6 mb-2 text-xl font-bold text-gray-900">10. Indemnity</h3>
                <p className="mb-4">You agree to defend, indemnify and hold harmless Sarv6 Solutions, its members, officers, directors, employees, agents, from and against all claims, actions or demands, liabilities, and settlements, including, without limitation, reasonable legal and accounting fees, arising in connection with your use of the Site or resulting from, or alleged to result from, your use of the Site or your violation of this Agreement.</p>
                <h3 className="mt-6 mb-2 text-xl font-bold text-gray-900">11. Limitation of Liability</h3>
                <p className="mb-4">IN NO EVENT WILL Sarv6 Solutions BE HELD LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL DAMAGES, OR ANY AND ALL OTHER DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF BUSINESS PROFITS, BUSINESS INTERRUPTION, LOSS OF DATA, PERSONAL INJURY, FAILURE TO MEET ANY DUTY INCLUDING ACTS OF GOOD FAITH OR OF REASONABLE CARE, AND FOR ANY OTHER PECUNIARY OR OTHER LOSS WHATSOEVER) ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OR PERFORMANCE OF THIS SITE. THE DELAY OR INABILITY TO USE THIS SITE, OR THIS AGREEMENT, EVEN IN THE EVENT OF FAULT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, BREACH OF CONTRACT, OR BREACH OF WARRANTY OF Sarv6 Solutions, THESE LIMITATIONS AND EXCLUSIONS REGARDING DAMAGES WILL APPLY EVEN IF ANY REMEDY FAILS. IF, HOWEVER, A COURT OF COMPETENT JURISDICTION DETERMINES THAT YOU ARE ENTITLED TO DIRECT DAMAGES PURSUANT TO APPLICABLE LAW YOU AGREE THAT Sarv6 Solutions LIABILITY WILL NOT EXCEED THE AMOUNT OF Rs. 100.00 (Rs One hundred, Indian rupees). YOU ACKNOWLEDGE THAT THIS PROVISION IS FAIR.</p>
                <h3 className="mt-6 mb-2 text-xl font-bold text-gray-900">12. Disclaimer</h3>
                <p className="mb-4">ALL INFORMATION CONTAINED WITHIN THIS WEBSITE IS PROVIDED FOR GENERAL INFORMATION PURPOSES ONLY AND ON THE UNDERSTANDING THAT NONE OF THE CONTENT HEREIN CONSTITUTES LEGAL OR OTHER PROFESSIONAL ADVICE. THE APPLICATION AND IMPACT OF LAWS CAN VARY WIDELY DEPENDING ON THE SPECIFIC FACTS INVOLVED. Sarv6 Solutions HAS ATTEMPTED TO MAKE SURE THAT ALL INFORMATION CONTAINED WITHIN THIS WEBSITE HAS BEEN OBTAINED FROM DEPENDABLE SOURCES, BUT ALL SUCH INFORMATION IS PROVIDED "AS IS", WITH NO GUARANTEE OF COMPLETENESS OR ACCURACY. Sarv6 Solutions PROVIDES NO WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, AS REGARDS THE INFORMATION HEREIN, AND DISCLAIMS ALL LIABILITY AND RESPONSIBILITY FOR ANY LOSS THAT MAY ARISE FROM RELIANCE ON INFORMATION CONTAINED WITHIN THIS WEBSITE.</p>
                <h3 className="mt-6 mb-2 text-xl font-bold text-gray-900">13. Force Majeure</h3>
                <p className="mb-2">This Site will not be held liable or considered to be in default of its service agreements, implied or express when the delay of performance is caused by circumstances beyond our control and that occurred due to no fault or negligence of us. The below mentioned are the circumstances:</p>
                <ul className="list-disc ml-6 space-y-2 mb-4">
                  <li>If any problems occurs with regard to accessing the on-line information.</li>
                  <li>If any problems occur with phone lines, internet access service, websites hosting service or failure of servers, Software glitches, disputes with copyright owners, virus problems, natural disasters, wars, riots.</li>
                </ul>
                <h3 className="mt-6 mb-2 text-xl font-bold text-gray-900">14. Jurisdiction</h3>
                <p className="mb-4">The jurisdiction and the governing law for this agreement shall be Laws of India. Any dispute relating to this Agreement shall be exclusively dealt with by the courts located at AP, India.</p>
                <h3 className="mt-6 mb-2 text-xl font-bold text-gray-900">15. Miscellaneous</h3>
                <p className="mb-4">The Agreement constitutes the entire agreement between you and Sarv6 Solutions with respect to the Site and your use of the Site, and supersedes all other prior communications whether electronic, oral, or written. If any part of this Agreement is determined to be illegal, void, invalid or unenforceable, then the invalid or unenforceable provision will be deemed superseded by valid, enforceable language that most closely matches the intent and allocation of risk in the original provision and the rest of the Agreement will continue in full force and effect.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= PRIVACY POLICY MODAL (blocking) ================= */}
      {isPrivacyOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsPrivacyOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-[92%] md:w-[85%] lg:w-[70%] max-w-4xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div className="h-14 bg-gradient-to-r from-emerald-500 to-green-600" />
              <button
                className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow hover:bg-white"
                aria-label="Close"
                onClick={() => setIsPrivacyOpen(false)}
              >
                <span className="sr-only">Close</span>✕
              </button>
            </div>
            <div className="px-6 md:px-8 py-6">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">Privacy Policy</h2>
              <div className="mt-1 text-xs md:text-sm text-gray-500">Home ▸ Privacy Policy</div>
              <div className="mt-6 max-h-[70vh] overflow-y-auto text-[15px] leading-relaxed text-gray-700 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Our Privacy Policy</h3>
                  <p className="mb-4">We are committed to protecting your privacy and take appropriate measures to maintain the confidentiality and privacy of data shared with us</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">We Respect Your Privacy</h3>
                  <ul className="list-disc ml-6 space-y-3 mb-4">
                    <li>The information you provide on the website inquiry forms is securely and confidentially stored and processed.</li>
                    <li>Your personal details (such as your name, telephone, fax number, and e-mail address), will be used only for communicating with you about our products and services.</li>
                    <li>Your personal information will never be shared, leased, sold, or distributed to any third-party entities for marketing purposes without your prior consent.</li>
                    <li>We employ appropriate technologies and processes to prevent unauthorized access, use, and/or disclosure of your personal information.</li>
                    <li>In order to provide you with our products and services we may need to, at times, share your personal information with 
                      <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Business partners</li>
                        <li>Affiliates</li>
                        <li>Authorized service vendors and contractors</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Your Information is Leveraged to Serve You Better (Cookies)</h3>
                  <ul className="list-disc ml-6 space-y-3 mb-4">
                    <li>Cookies are used on our websites to provide you with more personalized and effective user experience.</li>
                    <li>We analyze the cookie-captured information only to help us improve our service offerings and website features.</li>
                    <li>These cookies do not grant us remote access to your systems or to any confidential information you have not shared with us.</li>
                    <li>We will never make any data related to your location or any other customer-centric information public.</li>
                    <li>Cookies are stored and restricted to your browser or system memory. They can be disabled by changing your browser’s settings. But turning off cookies may prevent you from obtaining the full benefits of using our website.</li>
                    <li>To understand more about cookies and how they are used, visit allaboutcookies.org.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Changes to Our Privacy Policy</h3>
                  <p className="mb-4">Sarv6 Solutions Pvt. Ltd. will review, change or update our privacy policy as and when required. We will ensure that our updated privacy policy is made available on our website. We are in good compliance and enforce our privacy policy strictly. Contact us if you have any questions about our privacy policy or email us at the following: hr@sarv6solutions.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= HERO SECTION ================= */}
      <section id="intro" className="relative pt-24 pb-16 sm:pt-28 md:pt-36 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-40 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-emerald-100/30 via-transparent to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-gray-900 z-10 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full border border-emerald-100">
              <Zap size={14} className="text-emerald-600 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-semibold text-emerald-700">Trusted by Fortune 1000 Companies</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Global Offshore
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 mt-1 sm:mt-2">
                Solutions Redefined
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
              Scalable, efficient, and reliable offshore expertise that transforms your business operations and accelerates growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link 
                href="#contact" 
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-4 text-base bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:shadow-emerald-200 active:scale-95 transition-all duration-300 transform hover:scale-105 overflow-hidden touch-manipulation"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Journey
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link 
                href="#services" 
                className="group inline-flex items-center justify-center px-6 sm:px-8 py-4 text-base border-2 border-emerald-500 text-emerald-700 font-bold rounded-full hover:bg-emerald-50 active:scale-95 transition-all duration-300 transform hover:scale-105 touch-manipulation"
              >
                <Rocket className="mr-2" size={18} />
                Explore Services
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 pt-6 sm:pt-8">
              {[
                { value: "99.9%", label: "Accuracy Rate" },
                { value: "24/7", label: "Support" },
                { value: "1000+", label: "Happy Clients" }
              ].map((stat, i) => (
                <div key={i} className="text-center bg-white/50 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="relative z-10">
              <Image
                src="/all_people.png"
                alt="Offshore Illustration"
                width={800}
                height={800}
                priority
                className="w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto animate-float"
              />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl rotate-12 opacity-20 blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-3xl -rotate-12 opacity-20 blur-xl"></div>
          </div>
        </div>
        
        
      </section>

      {/* ================= ABOUT SECTION ================= */}

      <section id="about" className="scroll-mt-16 py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              <Award size={14} className="sm:w-4 sm:h-4" />
              ABOUT OUR COMPANY
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
              Precision Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Innovation</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4">
              We combine cutting-edge technology with expert human insight to deliver payroll solutions that exceed expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/people1.png"
                  alt="Team Collaboration"
                  width={600}
                  height={600}
                  className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Experience badge */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 rounded-2xl shadow-2xl">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm font-semibold">Years Experience</div>
              </div>
            </div>

            <div className="space-y-8">
              {[
                {
                  icon: <Target className="text-emerald-600" size={24} />,
                  title: "Mission Driven",
                  description: "To provide innovative, reliable, and cost-effective offshore solutions that empower businesses worldwide."
                },
                {
                  icon: <Users className="text-emerald-600" size={24} />,
                  title: "Expert Team",
                  description: "Our team comprises industry veterans with decades of experience in payroll processing and offshore services."
                },
                {
                  icon: <CheckCircle className="text-emerald-600" size={24} />,
                  title: "Quality Assurance",
                  description: "Rigorous quality checks and continuous improvement processes ensure 99.9% accuracy in all operations."
                }
              ].map((item, index) => (
                <div key={index} className="group flex gap-5 p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-white hover:from-emerald-50 hover:to-white border border-gray-100 hover:border-emerald-200 transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-emerald-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {[
              {
                title: "Cutting-edge Technology",
                description: "Leveraging AI-powered tools and custom software for unparalleled efficiency.",
                icon: "💻"
              },
              {
                title: "Global Compliance",
                description: "Expertise in international regulations and compliance standards.",
                icon: "🌍"
              },
              {
                title: "Scalable Solutions",
                description: "Flexible services that grow with your business needs.",
                icon: "📈"
              }
            ].map((feature, index) => (
              <div key={index} className="group p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
           <section id="services" className="scroll-mt-16 py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              <Briefcase size={14} className="sm:w-4 sm:h-4" />
              OUR SERVICES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
              Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Solutions</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base md:text-lg px-4">
              Tailored services designed to optimize your business operations and drive growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { 
                title: "Payroll Processing", 
                icon: <BarChart3 />, 
                desc: "End-to-end payroll management with 99.9% accuracy and timely processing.",
                gradient: "from-blue-500 to-cyan-500"
              },
              { 
                title: "Global Expansion", 
                icon: <Globe />, 
                desc: "Assistance with international business setup and compliance across borders.",
                gradient: "from-emerald-500 to-teal-500"
              },
              { 
                title: "IT Staffing", 
                icon: <Users />, 
                desc: "Specialized recruitment for local and international IT talent acquisition.",
                gradient: "from-purple-500 to-pink-500"
              },
              { 
                title: "Immigration Services", 
                icon: <ShieldCheck />, 
                desc: "Expert guidance on US visas including H1B, L1, and immigration processes.",
                gradient: "from-orange-500 to-red-500"
              },
              { 
                title: "Business Consulting", 
                icon: <Building2 />, 
                desc: "Strategic consulting for optimal offshore operations and efficiency.",
                gradient: "from-indigo-500 to-purple-500"
              },
              { 
                title: "24/7 Support", 
                icon: <Clock />, 
                desc: "Round-the-clock technical and operational support for seamless operations.",
                gradient: "from-teal-500 to-emerald-500"
              }
            ].map((service, i) => (
              <div 
                key={i} 
                className="group relative overflow-hidden bg-white p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl active:scale-[0.98] transition-all duration-500 border border-gray-100 touch-manipulation"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient}`}></div>
                <div className={`inline-flex p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br ${service.gradient} text-white mb-4 sm:mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-emerald-700 transition-colors">
                  {service.title}
                </h4>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
                
              </div>
            ))}
          </div>
        </div>
      </section>
  

      {/* ================= CONTACT SECTION ================= */}
       <section id="contact" className="scroll-mt-16 py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              <Mail size={14} className="sm:w-4 sm:h-4" />
              GET IN TOUCH
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Connect</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-3xl border border-emerald-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Offices</h3>
                
                <div className="space-y-6">
                  

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-emerald-100 rounded-xl group-hover:scale-110 transition-transform">
                      <MapPin className="text-emerald-600" size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-800 text-lg mb-1">India Office</h5>
                      <p className="text-gray-600">No 13 katha No 116 Thota Vaari Veedhi Street, Parappana Agrahara, Bengaluru 560100, Karnataka, India</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Phone size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-500">+91 9344368897</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-emerald-100 rounded-xl group-hover:scale-110 transition-transform">
                      <Mail className="text-emerald-600" size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-800 text-lg mb-1">Email Us</h5>
                      <p className="text-gray-600">hr@sarv6solutions.com</p>
                      <p className="text-sm text-gray-500 mt-1">Typically replies within 2 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "24/7", label: "Support" },
                  { value: "< 2h", label: "Response Time" },
                  { value: "99.9%", label: "Satisfaction" },
                  { value: "50+", label: "Countries" }
                ].map((stat, i) => (
                  <div key={i} className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl border border-gray-100 text-center">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100">
              <form action="https://api.web3forms.com/submit" method="POST" className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <input type="hidden" name="access_key" value="4192a39d-afab-438a-9d30-076b6c6ab2cc"></input>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 sm:p-4 text-sm sm:text-base bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all touch-manipulation" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 sm:p-4 text-sm sm:text-base bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all touch-manipulation" 
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 sm:p-4 text-sm sm:text-base bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all touch-manipulation" 
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Message</label>
                  <textarea 
                    name="message"
                    placeholder="Tell us about your project or inquiry..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 sm:p-4 text-sm sm:text-base bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none touch-manipulation" 
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="group relative w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 px-6 sm:px-8 text-sm sm:text-base rounded-lg sm:rounded-xl hover:shadow-xl hover:shadow-emerald-200 active:scale-[0.98] transition-all duration-300 transform hover:scale-[1.02] overflow-hidden touch-manipulation"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Send Message
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      {/* ================= FOOTER ================= */}
<footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-gray-300">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12 pb-8 sm:pb-10 md:pb-12 border-b border-gray-700">
      {/* Company Info with Logo */}
      <div>
        <div className="mb-6">
          <Image
            src="/logo.png"
            alt="Sarv6 Solutions Logo"
            width={180}
            height={60}
            className="h-14 w-auto brightness-200"
          />
        </div>
        <p className="text-sm leading-relaxed text-gray-400 mb-6">
          Transforming businesses with innovative offshore solutions and unparalleled payroll expertise since 2013. We offer end-to-end payroll processing services to Fortune 1000 companies as well as mid-sized companies.
        </p>
        <div className="flex gap-3">
          {[
            { icon: "🐦", label: "Twitter" },
            { icon: "💼", label: "LinkedIn" },
            { icon: "📘", label: "Facebook" },
            { icon: "📸", label: "Instagram" }
          ].map((social) => (
            <a
              key={social.label}
              href="#"
              className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg group"
              aria-label={social.label}
            >
              <span className="text-lg group-hover:text-emerald-400 transition-colors">
                {social.icon}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
          <ChevronRight size={18} />
          Quick Links
        </h4>
        <ul className="space-y-3 text-sm">
          {navLinks.map(l => (
            <li key={l.label}>
              <Link 
                href={l.href} 
                className="hover:text-emerald-400 transition-colors flex items-center gap-2 group py-2"
                onClick={(e) => {
                  if (l.onClick) {
                    e.preventDefault();
                    l.onClick();
                  }
                }}
              >
                <div className="w-0 group-hover:w-3 h-0.5 bg-emerald-500 transition-all duration-300 rounded-full"></div>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>


      {/* India Office & Newsletter */}
      <div className="space-y-8">
        <div>
          <h4 className="text-white font-bold mb-6 text-lg flex items-center gap-2">
            <MapPin size={18} />
            India Office
          </h4>
          <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 hover:border-emerald-500/30 transition-all duration-300">
            <p className="text-sm text-gray-300 mb-2 font-semibold">SARV6 SOLUTIONS Ltd</p>
            <p className="text-sm text-gray-400">No 13 katha No 116 Thota Vaari Veedhi Street<br/>Parappana Agrahara<br/>Bengaluru 560100, Karnataka, India</p>
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-700">
              <Mail size={14} className="text-emerald-400" />
              <a href="mailto:hr@sarv6solutions.com" className="text-sm text-gray-300 hover:text-emerald-400 transition-colors">
                hr@sarv6solutions.com
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-4 text-lg flex items-center gap-2">
            <Mail size={18} />
            Newsletter
          </h4>
          <p className="text-sm text-gray-400 mb-4">Subscribe for updates and insights</p>
          <form className="space-y-3">
            <input 
              type="email" 
              placeholder="Your email"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 text-white placeholder-gray-500 transition-all"
              required
            />
            <button 
              type="submit"
              className="w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-900/30 transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
            >
              Subscribe
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
      <div className="text-center md:text-left">
        <p className="text-xs sm:text-sm text-gray-400 tracking-wide">
          © {currentYear || new Date().getFullYear()} <span className="text-white font-semibold">SARV6 SOLUTIONS</span>. ALL RIGHTS RESERVED.
        </p>
        <p className="text-xs text-gray-500 mt-1 sm:mt-2">
          Building global partnerships since 2013
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-6 text-xs sm:text-sm">
        <Link 
          href="#" 
          className="text-gray-400 hover:text-white active:bg-gray-700 transition-colors px-2.5 sm:px-3 py-2 rounded-full hover:bg-gray-800 touch-manipulation"
          onClick={() => setIsPrivacyOpen(true)}
        >
          Privacy Policy
        </Link>
        <Link 
          href="#" 
          className="text-gray-400 hover:text-white active:bg-gray-700 transition-colors px-2.5 sm:px-3 py-2 rounded-full hover:bg-gray-800 touch-manipulation"
          onClick={() => setIsModalOpen(true)}
        >
          Terms of Service
        </Link>
        <Link 
          href="#" 
          className="text-gray-400 hover:text-white active:bg-gray-700 transition-colors px-2.5 sm:px-3 py-2 rounded-full hover:bg-gray-800 touch-manipulation"
        >
          Cookies Policy
        </Link>
        <Link 
          href="#contact" 
          className="text-emerald-400 hover:text-white active:bg-emerald-500/20 transition-colors px-3 sm:px-4 py-2 rounded-full border border-emerald-500/30 hover:bg-emerald-500/10 touch-manipulation"
        >
          Contact Support
        </Link>
      </div>
    </div>
  </div>
</footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1, transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
        html {
  scroll-behavior: smooth;
}

        .animate-fade-in {
          animation: fade-in 1.2s ease-out;
        }
      `}</style>
    </div>
  );
}