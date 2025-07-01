import Input from "../ui/input";
import Label from "../ui/label";
import Select from "../ui/Select";
import Button from "../ui/button";

export default function AuctionForm({
  inventoryItems,
  selectedItemId,
  setSelectedItemId,
  auctionType,
  setAuctionType,
  quantity,
  setQuantity,
  startingPrice,
  setStartingPrice,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  handleAuctionSubmit,
}) {
  return (
    <form className="d-flex flex-column gap-3">
      <div>
        <Label>Select Inventory Item</Label>
        <Select
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
          options={inventoryItems}
          getLabel={(item) => `${item.item_name} (Qty: ${item.quantity})`}
          getValue={(item) => item.item_id}
        />
      </div>

      <div>
        <Label>Auction Type</Label>
        <Select
          value={auctionType}
          onChange={(e) => setAuctionType(e.target.value)}
          options={["HIGHEST", "LOWEST"]}
          getLabel={(item) => item}
          getValue={(item) => item}
        />
      </div>

      <div>
        <Label>Quantity</Label>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
        />
      </div>

      <div>
        <Label>Starting Price</Label>
        <Input
          type="number"
          value={startingPrice}
          onChange={(e) => setStartingPrice(e.target.value)}
          placeholder="Enter starting price"
        />
      </div>

      <div>
        <Label>Auction Start Time</Label>
        <Input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>

      <div>
        <Label>Auction End Time</Label>
        <Input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      <Button onClick={handleAuctionSubmit}>List Auction</Button>
    </form>
  );
}
