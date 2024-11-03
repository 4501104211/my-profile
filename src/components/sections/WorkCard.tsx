import Image from 'next/image';
import Link from 'next/link';

interface WorkCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function WorkCard({ title, description, image, link }: WorkCardProps) {
  console.log(description);
  return (
    <Link 
      href={link}
      className="block group"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gray-800/50 transition-all duration-500 w-[240px] h-[128px]">
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            sizes="240px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-medium text-sm text-white group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
} 