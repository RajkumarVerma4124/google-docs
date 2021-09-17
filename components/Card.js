import Image from "next/image";

function Card({ image, title }) {

  return (
    <div className="">
      <div
        className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700 hover:shadow-2xl transition-colors duration-300"
      >
        <Image src={image} layout="fill" />
      </div>
      <p className="ml-2 mt-2 font-semibold text-sm text-gray-600">{title}</p>
    </div>
  );
}

export default Card;
