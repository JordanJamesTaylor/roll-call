import { UserGroupIcon } from "@heroicons/react/solid";
import Member from "./Member";
import Tabs from "./Tabs";
import { useState } from "react";
import RollCallsGroup from "./RollCallsGroup";
import Members from "./Members";
import Settings from "./Settings";
import GroupChat from "./GroupChat";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const tabs = [
  { name: "Roll Cals", nav: 0 },
  { name: "Members", nav: 1 },
  { name: "Chat", nav: 2 },
  { name: "Settings", nav: 3 },
];

export default function GroupFocus() {
  let { groupId } = useParams();
  const [pageNav, setPageNav] = useState(0);
  const [group, setGroup] = useState({});

  useEffect(() => {
    fetch("/groups/" + groupId)
      .then((res) => res.json())
      .then((data) => setGroup(data));
  }, []);

  function shownPage() {
    if (pageNav === 0) {
      return <RollCallsGroup />;
    } else if (pageNav === 1) {
      return <Members group={group} />;
    } else if (pageNav === 2) {
      return <GroupChat />;
    } else if (pageNav === 3) {
      return <Settings />;
    }
  }

  return (
    <div className="p-2">
      <Tabs tabs={tabs} pageNav={pageNav} setPageNav={setPageNav} />

      {shownPage()}

      {/* <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {people.map((person) => (
          <Member person={person} />
        ))}
      </ul> */}
    </div>
  );
}
