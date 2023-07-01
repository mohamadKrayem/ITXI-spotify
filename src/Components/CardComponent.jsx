import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";

function Card({ imageSrc, name, followers }) {
  const stars = [
    <BsStar className="text-gray-800 text-xl" />,
    <BsStarHalf className="text-gray-800 text-xl" />,
    <BsStarFill className="text-gray-800 text-xl" />,
  ];

  return (
    <div className="flex flex-col border-2 border-gray-500 justify-start items-start w-60">
      <img
        className="h-full w-full border-b-2 border-gray-500"
        src={
          imageSrc
            ? imageSrc
            : "https://th.bing.com/th/id/OIP.1LRUIB2OXVePxD5hQm4fqwHaHa?pid=ImgDet&rs=1"
        }
        alt={name}
      />
      <div className="p-2 flex flex-col justify-between">
        <div>
          <p className="text-2xl">{name}</p>
          <p className="text-sm">Followers: {followers ? followers : 0}</p>
        </div>
        <div className="flex flex-row justify-start items-center">
          <BsStarFill className="text-gray-800 text-xl" />
          <BsStarFill className="text-gray-800 text-xl" />
          <BsStarHalf className="text-gray-800 text-xl" />
          <BsStar className="text-gray-800 text-xl" />
          <BsStar className="text-gray-800 text-xl" />
        </div>
      </div>
    </div>
  );
}

export default Card;
