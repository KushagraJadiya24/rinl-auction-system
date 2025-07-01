export default function getAuctionStatus(startTime, endTime, isClosed) {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (isClosed) return "CLOSED";
  if (now < start) return "UPCOMING";
  if (now > end) return "CLOSED";
  return "ACTIVE";
}
