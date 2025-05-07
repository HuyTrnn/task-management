import React from "react";
import FocusCard from "../components/FocusCard/FocusCard";
import Lists from "../components/Lists/Lists";
import { Button } from "antd";
export default function MainPage() {
  return (
    <div className="h-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between">
        <div className="flex flex-col items-start justify-start">
          <p>My Days</p>
          <span>Thurs day, May 8</span>
        </div>
        <div>
          <Button>New</Button>
        </div>
      </div>
      {/* <div className=''>
          <FocusCard />
      </div> */}
      <div>
        <Lists />
      </div>
    </div>
  );
}
