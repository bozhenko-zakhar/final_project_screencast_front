import GreetingBlock from "./GreetingBlock/GreetingBlock";
import TasksReminderCard from "./TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "./FeelingCheckCard/FeelingCheckCard";
import StatusBlock from "./StatusBlock/StatusBlock";
import BabyTodayCard from "./BabyTodayCard/BabyTodayCard";
import MomTipCard from "./MomTipCard/MomTipCard";

import styles from "./DashboardPage_main.module.css";

type Props = {
	token: string
}

const DashboardPage = ({token}: Props) => {
	
  return (
    <section className={styles.dashboard}>
      <div className={styles.greetingWrapper}>
        <GreetingBlock />
      </div>

      <div className={styles.leftColumn}>
				<StatusBlock token={token}/>
				<BabyTodayCard token={token}/>
				<MomTipCard token={token}/>
      </div>

      <div className={styles.rightColumn}>
        <TasksReminderCard />
        <FeelingCheckCard />
      </div>
    </section>
  );
};

export default DashboardPage;