function Album({ name, artist, image, date, tracks, url }) {
  return (
    <div className="flex flex-col border-2 border-gray-500 justify-start items-start w-6/6 sm2:w-56">
      <img
        className="sm2:h-48 sm2:w-56 w-48 h-40 border-b-2 border-gray-500"
        src={
          image
            ? image
            : "https://th.bing.com/th/id/OIP.1LRUIB2OXVePxD5hQm4fqwHaHa?pid=ImgDet&rs=1"
        }
        alt={name}
      />
      <div className="flex flex-col gap-y-3 h-full justify-between">
        <div className="p-2">
          <p className="text-md">{name}</p>
          <p className="text-xs">{artist}</p>
        </div>
        <div className="mb-0">
          <p className="px-2 text-xs">{date}</p>
          <p className="px-2 pb-2 text-xs">{tracks} tracks</p>
          <a
            type="button"
            href={url}
            target="_blank"
            className="sm2:w-[220px] border-t-2 border-gray-500 py-1 cursor-pointer text-base text-center"
            >Perview on Spotify</a>
        </div>
      </div>
    </div>
  );
}

export default Album;
