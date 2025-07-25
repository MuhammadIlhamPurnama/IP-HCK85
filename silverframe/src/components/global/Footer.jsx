import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-black border-t-2 border-gray-500 text-gray-300 px-6 py-10 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-white">Silver Frame</h2>
          <p className="mt-2 text-sm text-gray-400">
            Your ultimate destination for movies. Explore, enjoy, and immerse yourself in the world of entertainment.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-3">Menu</h3>
          <ul className="space-y-2 text-sm">
            <li><NavLink to="/" className="hover:text-white">Home</NavLink></li>
            <li><NavLink to="/popular" className="hover:text-white">Popular</NavLink></li>
            <li><NavLink to="/newest" className="hover:text-white">Newest</NavLink></li>
            <li><NavLink to="/thread" className="hover:text-white">Thread</NavLink></li>
            <li><NavLink to="/ai-assistant" className="hover:text-white">AI Assistant</NavLink></li>
            <li><NavLink to="/infographic" className="hover:text-white">Infographic</NavLink></li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="text-white font-semibold mb-3">Informasi</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Tentang Kami</a></li>
            <li><a href="#" className="hover:text-white">Kebijakan Privasi</a></li>
            <li><a href="#" className="hover:text-white">Pusat Bantuan</a></li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <h3 className="text-white font-semibold mb-3">Ikuti Kami</h3>
          <div className="flex space-x-4 text-lg">
            <a href="#" className="hover:text-white"><i className="fab fa-facebook"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-white"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Silver Frame. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
