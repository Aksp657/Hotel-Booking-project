import { useState } from "react";

function ActiveHotel() {
  return <div>🏨 Active Hotel List</div>;
}

function InactiveHotel() {
  return <div>🚫 Inactive Hotel List</div>;
}

function AllHotels() {
  return <div>📋 All Hotels</div>;
}

// Separate Content Component
function Content({ children }) {
  return <div className="content">{children}</div>;
}

export default function Selected() {
  const [selectedTab, setSelectedTab] = useState("active");

  let SelectedComponent;
  if (selectedTab === "active") SelectedComponent = <ActiveHotel />;
  else if (selectedTab === "inactive") SelectedComponent = <InactiveHotel />;
  else SelectedComponent = <AllHotels />;

  return (
    <div>
      <ul>
        <li onClick={() => setSelectedTab("active")}>Active Hotel List</li>
        <li onClick={() => setSelectedTab("inactive")}>Inactive Hotel List</li>
        <li onClick={() => setSelectedTab("all")}>All Hotels</li>
      </ul>

      {/* Content is now handled in a separate component */}
      <Content>{SelectedComponent}</Content>
    </div>
  );
}