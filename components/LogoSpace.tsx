import Image from "next/image";

export default function LogoSpace({ className = "" }: { className?: string }) {
  return (
    <span className={"logo-space relative inline-flex items-center justify-center " + className}>
      <Image
        src="/Main-Logo.png"
        alt="Dwarkadhish Paper Products"
        width={340}
        height={276}
        priority
        className="h-full w-full object-contain"
      />
    </span>
  );
}
