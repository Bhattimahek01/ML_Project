import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Activity, User, Ruler, Weight, CloudRain, Flame, CheckCircle, AlertTriangle, ArrowRight, Menu, X, Stethoscope, Info } from 'lucide-react';
import './index.css';

const KathakTheme = {
  primary: '#b91d47', // Deep Red (Alta)
  secondary: '#ff9800', // Saffron
  bg: '#fff5f0', // Cream
  text: '#2c1810', // Dark Brown
};

const Inputs = [
  { name: 'age', label: 'Age (Years)', icon: User, type: 'number', min: 10, max: 100, def: 30 },
  { name: 'gender', label: 'Gender', icon: User, type: 'select', options: [{ val: 1, txt: 'Male' }, { val: 2, txt: 'Female' }], def: 1 },
  { name: 'height', label: 'Height (cm)', icon: Ruler, type: 'number', min: 100, max: 250, def: 170 },
  { name: 'weight', label: 'Weight (kg)', icon: Weight, type: 'number', min: 30, max: 200, def: 70 },
  { name: 'ap_hi', label: 'Systolic BP', icon: Activity, type: 'number', min: 60, max: 240, def: 120 },
  { name: 'ap_lo', label: 'Diastolic BP', icon: Activity, type: 'number', min: 40, max: 180, def: 80 },
  { name: 'cholesterol', label: 'Cholesterol', icon: Activity, type: 'select', options: [{ val: 1, txt: 'Normal' }, { val: 2, txt: 'Above Normal' }, { val: 3, txt: 'High' }], def: 1 },
  { name: 'gluc', label: 'Glucose', icon: Activity, type: 'select', options: [{ val: 1, txt: 'Normal' }, { val: 2, txt: 'Above Normal' }, { val: 3, txt: 'High' }], def: 1 },
  { name: 'smoke', label: 'Smoking', icon: CloudRain, type: 'select', options: [{ val: 0, txt: 'No' }, { val: 1, txt: 'Yes' }], def: 0 },
  { name: 'alco', label: 'Alcohol', icon: User, type: 'select', options: [{ val: 0, txt: 'No' }, { val: 1, txt: 'Yes' }], def: 0 },
  { name: 'active', label: 'Active Lifestyle', icon: Flame, type: 'select', options: [{ val: 1, txt: 'Yes' }, { val: 0, txt: 'No' }], def: 1 },
];

function App() {
  const [formData, setFormData] = useState(Inputs.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.def }), {}));
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setTimeout(() => { setResult(data); setLoading(false); }, 1500);
    } catch {
      setLoading(false);
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen text-[#2c1810] w-full overflow-x-hidden" style={{ backgroundColor: KathakTheme.bg }}>

      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 h-1 bg-[#b91d47] z-50" style={{ scaleX: scrollYProgress, transformOrigin: "0%" }} />

      {/* Navbar */}
      <nav className="fixed w-full z-40 bg-white/80 backdrop-blur-md shadow-sm border-b border-orange-100 p-4 top-0 left-0">
        <div className="max-w-6xl mx-auto flex justify-between items-center w-full">
          <div className="flex items-center gap-2 font-bold text-2xl text-[#b91d47]">
            <Heart className="fill-current" /> Hriday
          </div>
          <div className="hidden md:flex gap-8 font-medium">
            <a href="#hero" className="hover:text-[#ff9800] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#ff9800] transition-colors">Philosophy</a>
            <a href="#how" className="hover:text-[#ff9800] transition-colors">How it Works</a>
          </div>
          <button onClick={scrollToForm} className="bg-[#b91d47] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#a0183d] transition-colors">
            Try AI
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
        {/* Background Spinning Element */}
        <motion.div
          style={{ rotate }}
          className="absolute -right-60 top-20 w-[600px] h-[600px] border-[40px] border-[#ff9800]/10 rounded-full border-dashed z-0 pointer-events-none"
        />

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-[#ff9800] font-bold text-sm mb-4">
              AI Powered Health Analysis
            </span>
            <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6" style={{ color: KathakTheme.primary }}>
              The Rhythm of <br /> Your Heart.
            </h1>
            <p className="text-xl opacity-80 mb-8 leading-relaxed max-w-lg">
              Just as Kathak demands precision and rhythm, your heart requires balance.
              Our AI analyzes your vitals to predict cardiovascular health with grace and accuracy.
            </p>
            <div className="flex gap-4">
              <button onClick={scrollToForm} className="bg-[#b91d47] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2">
                Start Analysis <ArrowRight size={20} />
              </button>
              <a href="#about" className="px-8 py-4 rounded-full border-2 border-[#b91d47] text-[#b91d47] font-bold hover:bg-[#b91d47] hover:text-white transition-all">
                Learn More
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Abstract Symbolic Image Placeholder using CSS/SVG */}
            <div className="w-full aspect-square bg-gradient-to-br from-[#b91d47] to-[#ff9800] rounded-[2rem] shadow-2xl flex items-center justify-center p-12 text-white relative overflow-hidden">
              <Activity size={200} className="opacity-20 absolute -right-10 -bottom-10" />
              <div className="text-center z-10">
                <Heart size={80} className="mx-auto mb-6 fill-white animate-pulse" />
                <h3 className="text-3xl font-bold">95% Accuracy</h3>
                <p className="opacity-90">Machine Learning Model</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="w-12 h-12 text-[#b91d47] mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6 text-[#2c1810]">Philosophy of Hriday</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              "Hriday" means Heart in Sanskrit. We believe technology should feel natural and calm.
              By combining advanced Logistic Regression algorithms with a design inspired by Indian aesthetics,
              we make health monitoring less intimidating and more accessible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="how" className="py-24 bg-[#fff5f0]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#b91d47]">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: User, title: "Enter Details", desc: "Input your basic physical attributes like Age, Gender, and BMI factors." },
              { icon: Activity, title: "Add Vitals", desc: "Provide Blood Pressure, Cholesterol, and Glucose levels." },
              { icon: Flame, title: "Get Analysis", desc: "Our AI processes your data instantly to provide a health risk assessment." }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#ff9800] hover:-translate-y-2 transition-transform"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-[#ff9800] mb-6">
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prediction Section */}
      <section id="predict" ref={formRef} className="py-24 bg-[#b91d47] text-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Start Your Analysis</h2>
            <p className="opacity-80 text-lg">Enter your details accurately for the best results.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white text-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            {!result ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Inputs.map((field) => (
                    <div key={field.name} className={field.name === 'active' ? "sm:col-span-2 lg:col-span-1" : ""}>
                      <label className="block text-sm font-bold text-gray-500 mb-2 flex items-center gap-2">
                        <field.icon size={16} className="text-[#ff9800]" /> {field.label}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#b91d47] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                        >
                          {field.options.map(opt => <option key={opt.val} value={opt.val}>{opt.txt}</option>)}
                        </select>
                      ) : (
                        <input
                          type="number"
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#b91d47] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex justify-center">
                  <button type="submit" disabled={loading} className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-[#b91d47] to-[#ff9800] text-white rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                    {loading ? "Analyzing..." : "Calculate Risk"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-10">
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${result.prediction === 1 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}
                >
                  {result.prediction === 1 ? <AlertTriangle size={48} /> : <CheckCircle size={48} />}
                </motion.div>
                <h2 className={`text-4xl font-bold mb-2 ${result.prediction === 1 ? 'text-red-700' : 'text-green-700'}`}>
                  {result.prediction === 1 ? "Attention Needed" : "Low Risk Detected"}
                </h2>
                <p className="text-gray-500 mb-8">Cardiovascular Disease Probability</p>
                <div className="text-8xl font-black text-[#2c1810] mb-8">
                  {Math.round(result.probability * 100)}<span className="text-4xl">%</span>
                </div>
                <button onClick={() => setResult(null)} className="px-8 py-3 bg-gray-100 rounded-full font-bold hover:bg-gray-200 transition-colors">
                  Check Another Patient
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2c1810] text-white py-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Heart className="w-8 h-8 mx-auto mb-4 text-[#ff9800]" />
          <p className="opacity-60 mb-8">
            Disclaimer: This is an AI prediction model for educational purposes only.
            Always consult a certified medical professional for diagnosis.
          </p>
          <div className="text-sm opacity-40">
            &copy; 2026 Hriday Health AI. Design inspired by Indian Classical Arts.
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
