import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6 md:px-8 border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold hover:text-gray-600 transition-colors">
          LZ
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            About
          </Link>
          <Link href="/resume" className="hover:text-gray-600 transition-colors">
            Resume
          </Link>
          <Link href="/bookshelf" className="hover:text-gray-600 transition-colors">
            Bookshelf
          </Link>
          <Link href="/interests" className="hover:text-gray-600 transition-colors">
            Interests
          </Link>
          <Link href="/oral-history" className="hover:text-gray-600 transition-colors">
            Oral History
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 