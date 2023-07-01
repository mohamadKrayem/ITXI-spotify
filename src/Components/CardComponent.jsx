import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Card({ imageSrc, name, followers, popularity, id }) {
   const navigate = useNavigate();
  const stars = [
    <BsStar className="text-gray-800 text-xl" />,
    <BsStarHalf className="text-gray-800 text-xl" />,
    <BsStarFill className="text-gray-800 text-xl" />,
  ];

  return (
    <div className="flex flex-col border-2 border-gray-500 justify-start items-start w-6/6 sm2:w-64 cursor-pointer" onClick={()=>{
      navigate(`/artist/${id}`)
    }}>
      <img
        className="sm2:h-64 sm2:w-64 w-56 h-56 border-b-2 border-gray-500"
        src={
          imageSrc
            ? imageSrc
            : "https://th.bing.com/th/id/OIP.1LRUIB2OXVePxD5hQm4fqwHaHa?pid=ImgDet&rs=1"
        }
        alt={name}
      />
      <div className="p-2 flex flex-col gap-y-7 justify-between">
        <div>
          <p className="text-2xl">{name}</p>
          <p className="text-sm">Followers: {followers ? followers : 0}</p>
        </div>
        <div className="flex flex-row justify-start items-center">
          {Array.from({ length: 5 }).map((_, i) => {
            let percentage = Math.round(popularity * 2) / 2;
            if (i < percentage) {
              if (percentage - i === 0.5) {
                return stars[1];
              }
              return stars[2];
            }
            return stars[0];
          })}
        </div>
      </div>
    </div>
  );
}

export default Card;
