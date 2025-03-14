import Image from 'next/image';

const Bio = () => {
  return (
    <section className="max-w-4xl mx-auto py-16 px-6 md:px-8">
      <div className="grid md:grid-cols-[2fr_3fr] gap-8 items-start">
        <div className="relative aspect-square w-full max-w-[300px] mx-auto">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/images/profile-photo.jpg"
              alt="Lior Zippel"
              width={600}
              height={600}
              priority
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Lior Zippel</h1>
          <div className="prose prose-lg">
            <p>
              {/* Replace with your actual bio */}
              Welcome! I'm Lior, and this is my personal corner of the internet. Here you'll find my thoughts,
              experiences, and the various projects I'm working on.
            </p>
            <p>
              I'm passionate about [your interests/field], and I love to [what you do]. Through this website,
              I share my journey, including my professional experience, the books that shape my thinking,
              and the stories I collect through my oral history project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bio; 