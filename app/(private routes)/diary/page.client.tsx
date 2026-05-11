import css from "./page.client.module.css";

import GreetingBlock from "@/components/DashBoardPage/DashboardPage_main/GreetingBlock/GreetingBlock";
import DiaryList from "@/components/DiaryList/DiaryList";

const DiariesClient = () => {
  return (
    <div className={css.container}>
      <div className={css.listSection}>
        <DiaryList />
      </div>
    </div>
  );
};

export default DiariesClient;